import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonLoading, IonModal, IonAlert } from '@ionic/react';
import { add, arrowUndoCircleOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { GenericFilters } from '../components/GenericFilters';
import PostCard from '../components/PostCard';
import { WetlandForm } from '../components/WetlandForm';
import { bingMapPosition, marker } from '../interfaces/interfaces';
import { useAuth0 } from "@auth0/auth0-react";
import { postFilters } from '../enums/data';
import { API_KEY_BINGMAPS, POSTS_URL } from '../apiKeys';
import ReactBingmaps from "../components/BingMapsReact";
import { axiosInstance } from '../axiosConf';
import { PostReader } from '../components/PostReader';
import { reduceText, toCapitalizeCase } from '../utils/sharedFn';
import { Header } from '../components/Header';
import { categorias, ESTADO, post } from '../interfaces/posts.interface';
import { Enums } from '../interfaces/enum.interface';

const Map: React.FC = () => {
	const [ postsData, setPostData ] = useState<post[]>([]);
	const [ enumsData, setEnumsData ] = useState<Enums>();
	const [ mapCenter, setMapCenter ] = useState<{ latitude: number, longitude: number }>( { latitude: -32.4790999, longitude: -58.2339789 } )
	const [ markers, setMarkers ] = useState<marker[]>([]);
	const [ onClickPosition, setOnClickPosition ] = useState<bingMapPosition>()
	const [ zoom, setZoom ] = useState<number>(5);
	const [ colsSize, setColsSize ] = useState<{postCol: string, mapCol: string}>({postCol: '4', mapCol: '8'});
	const [ showFab, setShowFab ] = useState<{addFab: boolean, cancelFab: boolean}>({addFab: true, cancelFab: false});
	const [ showFormModal, setShowFormModal ] = useState<boolean>(false);
	const [ showAlert, setShowAlert ] =useState<boolean> (false);
	const [ loading, setLoading ] = useState<boolean>(false);
	const [ infoMarkerIndex, setInfoMarkerIndex ] = useState<number>(-1);
	const [ appliedFilters, setAppliedFilters ]	= useState<string[]>([]);
	const [ selectedPost, setSelectedPost ] = useState<post | undefined>(undefined);
	const [ showPostModal, setShowPostModal ] = useState<boolean>(false);
	const editModeActive = useRef<boolean>(false);
	const { user, isAuthenticated } = useAuth0();

	useEffect(()=>{
		const getData = async () =>{
			startLoading();
			try {
				const enums = await axiosInstance.get(`${POSTS_URL}/enums`);
				if (enums && enums.data && !enumsData) setEnumsData(enums.data);
				const response = await axiosInstance.get(`${POSTS_URL}/posts`);
				if (!Array.isArray(response?.data)) return;
					const auxMarkers: marker[] = [];
					const posts = response.data.filter((item:post) => item.estado === ESTADO.aprobado);
					for (let i = 0; i < posts.length; i++) {
						const post:post = posts[i];
						if (post.estado === ESTADO.aprobado) auxMarkers.push({
							metadata: {
								title: toCapitalizeCase(reduceText(post.titulo)),
								description: toCapitalizeCase(reduceText(post?.descripcion)),
							},
							center: {latitude: parseFloat(post.coordenadas.latitude),longitude: parseFloat(post.coordenadas.longitude)},
						});
					setMarkers(auxMarkers);
					setPostData(posts);
				}
				stopLoading();
			}
			catch (error){
				console.error('Error on getData: ',error);
				stopLoading();
			}
		}
		getData();
	},[postsData.length]);

	const showPost = (post: post) => {
		if (!post) return;
		setSelectedPost(post);
		setShowPostModal(true);
	}
	const closePost = () => {
		setSelectedPost(undefined);
		setShowPostModal(false);
	}

	const getPostPosition = (id:string) => {
		const mapPosition = postsData.find((post) => post._id === (id));
		if (mapPosition) {
			setMapCenter({latitude: parseFloat(mapPosition.coordenadas.latitude), longitude: parseFloat(mapPosition.coordenadas.longitude)})
			setZoom(10)
		}
	}

	const getClickedLocation = (value: bingMapPosition) => {
		if (editModeActive.current === false) return;
		if (!value || !value.latitude || !value.longitude) return;
		if ((typeof(value.latitude) !== 'number') || (typeof(value.longitude) !== 'number')) return;
		if (value !== onClickPosition) {
			// Mostramos la alerta.
			const auxMarkers:marker[] = markers;
			const infoMarker = {
				metadata: {
					title: 'Iniciar carga',
					description: `¿Desea cargar nueva informacion en este punto?`,
					visible: true,
					actions: [
						{label: 'Confirmar', eventHandler: () => confirmLocation(value)},
					]	
				},
				center: value,
			};
			if (infoMarkerIndex !== -1) auxMarkers[infoMarkerIndex] = infoMarker;
			else {
				auxMarkers.push(infoMarker);
				setInfoMarkerIndex((auxMarkers.length)-1);
			}
			setMarkers(auxMarkers);
			setMapCenter(value);
			setZoom(8);
		};
	}

	const confirmLocation = (location: bingMapPosition) => {
		editModeOFF();
		setOnClickPosition(location);
		setShowFormModal(true);
	}

	const switchFabsVisibility = () => {
		setShowFab({addFab: !showFab.addFab, cancelFab: !showFab.cancelFab})
	}

	const switchColsSize = () => {
		if (colsSize.mapCol === '12') setColsSize({postCol: '4', mapCol: '8'})
		else setColsSize({postCol: '0', mapCol: '12'})
	}

	const editModeON = () => {
		if (!isAuthenticated) return setShowAlert(true);
		editModeActive.current = (true);
		switchFabsVisibility();
		switchColsSize();
	}

	const hiddeAndRemoveInfoMarker = () => {
		const auxMarkers = markers;
		const infoMarker = auxMarkers[infoMarkerIndex];
		if (!infoMarker) return;
		if (infoMarker.metadata) infoMarker.metadata = {...infoMarker.metadata, visible: false};
		else infoMarker.metadata = {title: '', visible: false};
		auxMarkers[infoMarkerIndex] = infoMarker;
		setMarkers(auxMarkers);
		auxMarkers.splice(infoMarkerIndex, 1)
		setInfoMarkerIndex(-1);
		setMarkers(auxMarkers);
	}
	
	const editModeOFF = () => {
		if (infoMarkerIndex !== -1) hiddeAndRemoveInfoMarker();
		editModeActive.current = (false);
		switchFabsVisibility();
		switchColsSize();
		setZoom(2);
	}

	const startLoading = () => {
		setLoading(true);
	}

	const stopLoading = () => {
		setLoading(false);
	}

	const filterData = (filters: string[]) => {
		try{
			const posts = postsData;
			const auxPosts:post[] = [];
			const auxMarkers: marker[]= [];
			if (!filters || !Array.isArray(filters) || filters.length <= 0 || !posts || !Array.isArray(posts)) return {filteredPosts: posts, filteredMarkers: markers};
			for (let i = 0; i < posts.length; i++) {
				const post = posts[i];
				for (let j = 0; j < filters.length; j++) {
					const filter = filters[j];
					if (
						post.categoria.includes(filter) ||
						post.descripcion.includes(filter) ||
						post.titulo.includes(filter) ||
						post.keyword.some((item:string) => item.toLowerCase() === filter.toLowerCase())
					) {
						auxPosts.push(post);
						if (post.estado === 'approved') auxMarkers.push({
							metadata: {
								title: toCapitalizeCase(reduceText(post.titulo, 50)),
								description: reduceText(post.descripcion),
							},
							center: {latitude: parseFloat(post.coordenadas.latitude),longitude: parseFloat(post.coordenadas.longitude)},
						});
						break;
					}
				}
			}
			return {filteredPosts: auxPosts, filteredMarkers: auxMarkers}
		}
		catch (e) {
			console.error(e)
			return {filteredPosts: postsData, filteredMarkers: markers};
		}
	}

	const getMarkersByType = (markers: marker[], type: 'info' | 'normal'): marker[] => {
        let infoMarkers: marker[] = []
        let normalMarkers: marker[] = []
        if (markers){
            for (let i = 0; i < markers.length; i++) {
                const newMarker = markers[i];
                if (newMarker) {
                    if(newMarker.metadata && newMarker.metadata.title) infoMarkers.push(newMarker);
                    else normalMarkers.push(newMarker);
                }
            }
        }
        if (type === 'info') return infoMarkers;
        return normalMarkers;
    }

	return (
		<IonPage >
            <Header login={{includeLogin: true, user: user}}/>
			<IonContent color={'light'} fullscreen>
			<IonLoading
				isOpen={loading}
				showBackdrop={true}
				message={'Cargando!'}
				duration={5000}
			/>
				<IonGrid className={'fixHeight'}>
					<IonRow className={'fixHeight'}>
						{	colsSize.postCol !== '0' ?
							<IonCol size={colsSize.postCol} className={'fixHeight scroll'}>
							<GenericFilters filters={postFilters} getFilters={(filters) => setAppliedFilters(filters.map(item => {return item.value}))}/>
							{
								postsData.length > 0 ? 
								filterData(appliedFilters).filteredPosts.map((post, index)=>{
									if(post.estado === 'approved') return(
										<PostCard
											key={`PostCard-content-index${index}'id'${post._id}`}
											index={index}
											post={post}
											buttons={[
												{label: 'Ver en el mapa', onClick: ()=> {getPostPosition(post._id)}, icon: 'pin'},
												{label: 'Ver publicacion', onClick: ()=> showPost(post), icon: 'pin'}											
											]}
										/>
									)
									return null;
								}) 
								:
								null
							}
							</IonCol>
							:
							null
						}
						<IonCol size={colsSize.mapCol}>
							<IonFab horizontal={"end"} vertical={"bottom"}>
								<IonFabButton color={"success"} onClick={() => editModeON()} hidden={!showFab.addFab} title={'Publicar nuevo punto!'}><IonIcon icon={add}></IonIcon></IonFabButton>
								<IonFabButton color={"warning"} onClick={() => editModeOFF()} hidden={!showFab.cancelFab} title={'Cancelar carga'}><IonIcon icon={arrowUndoCircleOutline}></IonIcon></IonFabButton>
							</IonFab>
							<ReactBingmaps
								bingMapsKey={API_KEY_BINGMAPS}
								// pushPins={appliedFilters.length > 0 ? getMarkersByType(filterData(appliedFilters).filteredMarkers, 'normal') : getMarkersByType(markers, 'normal')}
								pushPinsWithInfoboxes={appliedFilters.length > 0 ? filterData(appliedFilters).filteredMarkers : markers}
								height={'100%'}
								width={'100%'}
								mapOptions={{
									navigationBarMode: "square",
									credentials: API_KEY_BINGMAPS,
								}}
								viewOptions={{
									center: mapCenter,
									zoom: zoom,
								}}
								getLocationOnClick={(value:bingMapPosition) => getClickedLocation(value)}
							/>
							<IonModal isOpen={showFormModal} showBackdrop={true} cssClass={"postModal"} onDidDismiss={() => editModeOFF()}>
								{
									enumsData ? 
									<WetlandForm location={onClickPosition ? onClickPosition : { latitude: 0, longitude: 0 }} enums={enumsData} />
									:
									<h1>Cargando...</h1>
								}
							</IonModal>
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonModal isOpen={showPostModal} showBackdrop={true} keyboardClose={true} onDidDismiss={() => closePost()} cssClass={"modal-width-50vw"}>
					<PostReader post={selectedPost} mode={'complete'} />
				</IonModal>
				<IonAlert
					isOpen={showAlert}
					onDidDismiss={() => setShowAlert(false)}
					header={'Alerta'}
					subHeader={''}
					message={'Debe iniciar sesión para agregar una publicación'}
					buttons={['OK']}
				/>
			</IonContent>
		</IonPage>
	);
};

export default Map;
