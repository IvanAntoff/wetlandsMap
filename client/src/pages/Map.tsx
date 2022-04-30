import { IonContent, IonGrid, IonPage, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonLoading, IonModal, IonAlert } from '@ionic/react';
import { add, arrowUndoCircleOutline } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import PostCard from '../components/PostCard';
import { WetlandForm } from '../components/WetlandForm';
import { bingMapPosition, genericFilter, marker } from '../interfaces/interfaces';
import { useAuth0 } from "@auth0/auth0-react";
import { API_KEY_BINGMAPS, POSTS_URL } from '../apiKeys';
import ReactBingmaps from "../components/BingMapsReact";
import { axiosInstance } from '../axiosConf';
import { PostReader } from '../components/PostReader';
import { reduceText, toCapitalizeCase } from '../utils/sharedFn';
import { Header } from '../components/Header';
import { ESTADO, postVM } from '../interfaces/posts.interface';
import { Enums } from '../interfaces/enum.interface';
import { FiltersPosts, getFiltersRes } from '../components/FiltersPosts';

interface mapProps {
	postid?: string
}

const Map: React.FC<mapProps>= (props: mapProps) => {
	const [ postsData, setPostData ] = useState<postVM[]>([]);
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
	const [ appliedFilters, setAppliedFilters ]	= useState<genericFilter[]>([]);
	const [ selectedPost, setSelectedPost ] = useState<postVM | undefined>(undefined);
	const [ showPostModal, setShowPostModal ] = useState<boolean>(false);
	const editModeActive = useRef<boolean>(false);
	const { user, isAuthenticated } = useAuth0();

	useEffect(()=>{
		const getData = async () =>{
			startLoading();
			try {
				const enums = await axiosInstance.get(`${POSTS_URL}/enums`);
				if (enums && enums.data && !enumsData) setEnumsData(enums.data);
				const response = await axiosInstance.get(`${POSTS_URL}/posts?state=${ESTADO.aprobado}&normalize=true&includecomments=true`);
				if (!Array.isArray(response?.data)) return;
				const auxMarkers: marker[] = [];
				const posts = response.data;
				posts.forEach(post => {
					auxMarkers.push({
						metadata: {
							title: toCapitalizeCase(reduceText(post.titulo)),
							description: toCapitalizeCase(reduceText(post?.descripcion)),
							actions: [
								{label: 'Ver publicación', eventHandler: () => showPost(post)},
							]
						},
						center: {latitude: parseFloat(post.coordenadas.latitude),longitude: parseFloat(post.coordenadas.longitude)},
					});
				});
				setMarkers(auxMarkers);
				setPostData(posts);
				stopLoading();
			}
			catch (error){
				console.error('Error on getData: ',error);
				stopLoading();
			}
		}
		getData()
		.then(() => {
			if (!props.postid) return;
			const post = postsData.find((post) => post._id === props.postid)
			if (!post) return;
			showPost(post);
		})
	},[postsData.length]);

	useEffect(() => {
		const getUpdateMarkers = () => {
			const markers: marker[]= [];
			const posts: postVM[] = getFiltersRes(postsData, appliedFilters);
			posts.forEach(post => {				
				if (post.estado === ESTADO.aprobado) markers.push({
					metadata: {
						title: toCapitalizeCase(reduceText(post.titulo, 50)),
						description: reduceText(post.descripcion),
						actions: [
							{label: 'Ver publicación', eventHandler: () => showPost(post)},
						]
					},
					center: {latitude: parseFloat(post.coordenadas.latitude),longitude: parseFloat(post.coordenadas.longitude)},
				});
			});
			setMarkers(markers);
		};
		getUpdateMarkers();
	},[appliedFilters]);

	const showPost = (post: postVM) => {
		if (!post) return;
		setSelectedPost(post);
		setShowPostModal(true);
	}
	const closePost = () => {
		setSelectedPost(undefined);
		setShowPostModal(false);
	}

	const getPostPosition = (id:string, zoom: number = 10) => {
		const mapPosition = postsData.find((post) => post._id === (id));
		if (mapPosition) {
			setMapCenter({latitude: parseFloat(mapPosition.coordenadas.latitude), longitude: parseFloat(mapPosition.coordenadas.longitude)})
			setZoom(zoom)
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
					description: `¿Desea cargar nueva información  en este punto?`,
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

	const resetLocation = () => {
		editModeOFF();
		setOnClickPosition(undefined);
		setShowFormModal(false);
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

	// const getMarkersByType = (markers: marker[], type: 'info' | 'normal'): marker[] => {
    //     let infoMarkers: marker[] = []
    //     let normalMarkers: marker[] = []
    //     if (markers){
    //         for (let i = 0; i < markers.length; i++) {
    //             const newMarker = markers[i];
    //             if (newMarker) {
    //                 if(newMarker.metadata && newMarker.metadata.title) infoMarkers.push(newMarker);
    //                 else normalMarkers.push(newMarker);
    //             }
    //         }
    //     }
    //     if (type === 'info') return infoMarkers;
    //     return normalMarkers;
    // }

	return (
		<IonPage >
            <Header login={{includeLogin: true, user: user}}/>
			<IonContent color={'light'}>
			<IonLoading
				isOpen={loading}
				showBackdrop={true}
				message={'Cargando!'}
				duration={5000}
			/>
				<IonGrid className={'fullHeight'}>
					<IonRow className={'fullHeight'}>
						{	colsSize.postCol !== '0' ?
							<IonCol sizeMd={colsSize.postCol} sizeSm={"12"} sizeXs={"12"} className={'scroll fullHeight'}>
								<FiltersPosts active={['Category', 'Keywords']} getAppliedFilters={(filters) => setAppliedFilters(filters)}/>
								{
									postsData.length > 0 ? 
									getFiltersRes(postsData, appliedFilters).map((post, index)=>{
										if(post.estado === 'approved') return(
											<PostCard
												key={`PostCard-content-index${index}'id'${post._id}`}
												index={index}
												post={post}
												buttons={[
													{label: 'Ver en el mapa', onClick: ()=> {getPostPosition(post._id, 15)}, icon: 'pin'},
													{label: 'Ver publicación', onClick: ()=> showPost(post), icon: 'pin'}											
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
						<IonCol sizeMd={colsSize.mapCol} sizeSm={"12"} sizeXs={"12"} className={'fullHeight scroll'}>
							<ReactBingmaps
								bingMapsKey={API_KEY_BINGMAPS}
								// pushPins={appliedFilters.length > 0 ? getMarkersByType(filterData(appliedFilters).filteredMarkers, 'normal') : getMarkersByType(markers, 'normal')}
								pushPinsWithInfoboxes={markers}
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
							<IonFab horizontal={"end"} vertical={"bottom"}>
								<IonFabButton color={"success"} onClick={() => editModeON()} hidden={!showFab.addFab} title={'Publicar nuevo punto!'}><IonIcon icon={add}></IonIcon></IonFabButton>
								<IonFabButton color={"warning"} onClick={() => resetLocation()} hidden={!showFab.cancelFab} title={'Cancelar carga'}><IonIcon icon={arrowUndoCircleOutline}></IonIcon></IonFabButton>
							</IonFab>
						</IonCol>
					</IonRow>
				</IonGrid>
				<IonModal isOpen={showPostModal} showBackdrop={true} keyboardClose={true}  onDidDismiss={() => closePost()} cssClass={"modal-width-70vw"}>
					{
						selectedPost && <PostReader post={selectedPost} mode={'complete'} />
					}
				</IonModal>
				<IonModal isOpen={showFormModal} showBackdrop={true} cssClass={"postModal"} onWillDismiss={() => resetLocation()} onDidDismiss={() => resetLocation()}>
					{
						enumsData ? 
						<WetlandForm location={onClickPosition ? onClickPosition : { latitude: 0, longitude: 0 }} enums={enumsData} onSubmit={() => resetLocation()}/>
						:
						<h1>Cargando...</h1>
					}
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
