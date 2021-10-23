import { IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol, IonFab, IonFabButton, IonIcon, IonLoading, IonModal, IonButtons, IonAlert, IonButton } from '@ionic/react';
import { add, arrowUndoCircleOutline, pin } from 'ionicons/icons';
import { useEffect, useRef, useState } from 'react';
import { POSTS_URL } from '../axiosDirs';
import { GenericFilters } from '../components/GenericFilters';
import { GenericMap } from '../components/GenericMap';
import PostCard from '../components/PostCard';
import { WetlandForm } from '../components/WetlandForm';
import { bingMapPosition, marker, post } from '../interfaces/interfaces';
import LoginButton from '../components/LoginButton';
import LogoutButton from '../components/LogoutButton';
import { useAuth0 } from "@auth0/auth0-react";
import { postFilters, categories } from '../enums/data';
const axios = require('axios');

const Tab1: React.FC = () => {
	const [ postsData, setPostData ] = useState<post[]>([]);
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
	const editModeActive = useRef<boolean>(false);
	const { user, isAuthenticated } = useAuth0();

	useEffect(()=>{
		const getData = async () =>{
			startLoading();
			try {
				const response = await axios.get(`${POSTS_URL}/posts`)
				if (!response || !response.data || !Array.isArray(response.data)) return;
					const auxMarkers: marker[] = [];
					const posts = response.data.filter((item:post) => item.status === 'approved')
					for (let i = 0; i < posts.length; i++) {
						const post = posts[i];
						if (post.status === 'approved') auxMarkers.push({
							metadata: {
								title: post.content.title,
								description: `${post.content?.description.slice(0,75)}...`,
							},
							center: {latitude: parseFloat(post.ubication.latitude),longitude: parseFloat(post.ubication.longitude)},
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

	const getPostPosition = (id:string) => {
		const mapPosition = postsData.find((post) => post.id === (id));
		if (mapPosition) {
			setMapCenter({latitude: parseFloat(mapPosition.ubication.latitude), longitude: parseFloat(mapPosition.ubication.longitude)})
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
						post.category.includes(filter) ||
						post.content.description.includes(filter) ||
						post.content.title.includes(filter) ||
						post.keyword.some(item => item.toLowerCase() === filter.toLowerCase())
					) {
						auxPosts.push(post);
						if (post.status === 'approved') auxMarkers.push({
							metadata: {
								title: post.content.title,
								description: `${post.content?.description.slice(0,75)}...`,
							},
							center: {latitude: parseFloat(post.ubication.latitude),longitude: parseFloat(post.ubication.longitude)},
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

	return (
		<IonPage >
			<IonHeader>
				<IonToolbar color={'primary'}>
					<IonTitle>Humedales digitales</IonTitle>
					{!isAuthenticated || !user ? 
						<IonButtons slot='end'>
							<LoginButton />
						</IonButtons>
						:
						<IonButtons slot='end'>
							<IonButton>
								<p>{user?.nickname ? user.nickname : 'Desconocido'}</p>
								<img className="circular--square" src={user?.picture ? user.picture : ''} alt={user?.name ? user?.name : 'unknowimg'} width="35" height="35" />
							</IonButton>
							<LogoutButton />
						</IonButtons>
					}
				</IonToolbar>
			</IonHeader>
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
									if(post.status === 'approved') return(
										<PostCard
											key={`PostCard-content-index${index}'id'${post.id}`}
											index={index}
											id={post.id}
											status={post.status}
											category={post.category}
											data={post.data}
											content={post.content}
											ubication={post.ubication}
											keyword={post.keyword}
											buttons={[
												{label: 'Ver en el mapa', onClick: ()=> {getPostPosition(post.id)}, icon: 'pin'},
												{label: 'Ver publicacion', onClick: ()=> {console.log(post.id)}, icon: 'pin'}											
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
							<GenericMap center={mapCenter} width={'100%'} height={'100%'} markers={ appliedFilters.length > 0 ? filterData(appliedFilters).filteredMarkers : markers} 
								zoom={zoom} getLocationOnClick={(value:bingMapPosition) => getClickedLocation(value)} loading={loading}
							/>
							<IonModal isOpen={showFormModal} showBackdrop={true} cssClass={"postModal"} >
								<WetlandForm location={onClickPosition ? onClickPosition : {latitude: 0, longitude:0}}
									categories={categories} 
								/>
							</IonModal>
						</IonCol>
					</IonRow>
				</IonGrid>
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

export default Tab1;
