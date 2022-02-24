import { IonAlert, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonModal, IonPage, IonRow, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { POSTS_URL, wetlandusers } from '../apiKeys';
import { axiosInstance } from '../axiosConf';
import { PostReader } from '../components/PostReader';
import { Header } from '../components/Header';
import { ESTADO, groupedPosts, postVM } from '../interfaces/posts.interface';
import { refresh } from 'ionicons/icons';

const Control: React.FC = () => {
	const [reloadData, setReloadData] = useState<boolean>(true);
	const [ pendings, setPendings ] = useState<postVM[]>([]);
	const [ approveds, setApproveds ] = useState<postVM[]>([]);
	const [ refuseds, setRefuseds ] = useState<postVM[]>([]);
	const [ alert, setAlert ] = useState<{show: boolean,header: string,subtitle: string,message: string, buttons: {text: string, handler?: () => void}[]}>({show: false,header: '',subtitle: '',message: '', buttons: [{text: 'OK'}]})
	const [ selectedPost, setSelectedPost ] = useState<postVM | undefined>(undefined);
	const [ showPostModal, setShowPostModal ] = useState<boolean>(false);
	const { user, isAuthenticated, isLoading } = useAuth0();
	const history = useHistory();
	useEffect(()=>{
		if (!isAuthenticated || !user || !wetlandusers.some((item) => item === user?.email)) return history.push('/home');
		const getData = () =>{
			try{
				axiosInstance.get(`${POSTS_URL}/posts?group=true`)
				.then((response: { data: groupedPosts }) => {
					if(!response || !response?.data) return;
					setReloadData(false);
					if(Array.isArray(response.data.aprobados)) setApproveds(response.data.aprobados);
					if(Array.isArray(response.data.aprobados)) setPendings(response.data.pendientes);
					if(Array.isArray(response.data.rechazados)) setRefuseds(response.data.rechazados);
				})
			} catch (error) {console.error(error)}
		}
		if(reloadData) return getData();
	},[user, isAuthenticated, isLoading, reloadData]);

	const showPost = (post: postVM) => {
		if (!post) return;
		setSelectedPost(post);
		setShowPostModal(true);
	}
	const closePost = () => {
		setSelectedPost(undefined);
		setShowPostModal(false);
	}

	const updateState = async (postId: string, actualState: ESTADO, newState: ESTADO) => {
		try{
			let postToUpdate = null;
			let postIndex: number = -1;
			let auxPosts: postVM[] = [];
			switch (actualState) {
				case ESTADO.aprobado:
					postIndex = approveds.findIndex((item) => item._id === postId);
					if (postIndex === -1) return;
					postToUpdate = approveds[postIndex];
					auxPosts = approveds;
					auxPosts.splice(postIndex, 1);
					setApproveds([...auxPosts]);
					break;
				case ESTADO.pendiente:
					postIndex = pendings.findIndex((item) => item._id === postId);
					if (postIndex === -1) return;
					postToUpdate = pendings[postIndex];
					auxPosts = pendings;
					auxPosts.splice(postIndex, 1);
					setPendings([...auxPosts]);
					break;
				case ESTADO.rechazado:
					postIndex = refuseds.findIndex((item) => item._id === postId);
					if (postIndex === -1) return;
					postToUpdate = refuseds[postIndex];
					auxPosts = refuseds;
					auxPosts.splice(postIndex, 1);
					setRefuseds([...auxPosts]);
					break;
			}
			postToUpdate.estado = newState;
			const res = await axiosInstance.post(`${POSTS_URL}/posts/changeState`, {
				id: postId,
				estado: newState
			});
			if (!res || !res.status || (res.status !== 201 && res.status !== 204)) return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
			switch(newState) {
				case ESTADO.aprobado:
					return setApproveds([...approveds, postToUpdate]);
				case ESTADO.rechazado:
					return setRefuseds([...refuseds, postToUpdate]);
				case ESTADO.pendiente:
					return setPendings([...pendings, postToUpdate]);
			}
		} catch(error) {
			console.error(error);
			return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
		}
	}

	const removePost = async (postId: string) => {
		try {
			const postIndex = refuseds.findIndex((post) => post._id === postId);
			if (postIndex < 0) return; 
				const res = await axiosInstance.post(`${POSTS_URL}/posts/deletePost/${postId}`);
				if (!res || !res.status || (res.status !== 200 && res.status !== 201)) return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
				const auxPosts = refuseds;
				auxPosts.splice(postIndex,1);
				setRefuseds([...auxPosts])
		} catch(error) {
			console.error(error);
			return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
		}
	}

	const showRemoveAlert = (postId: string) => {
		showAlert(
			'Esta a punto de eliminar una publicacion!',
			'ALERTA!',
			'¿Esta seguro de continuar?',
			[
				{text: 'Cancelar', handler: () => closeAlert()},
				{text: 'Eliminar', handler: () => removePost(postId)}
			]
		)
	}

	const showAlert = (message: string, header: string = 'Atencion!',subtitle: string = '', buttons: {text: string, handler?: () => void}[] = [{text: 'OK!'}]) => {
		if (!message || typeof(header) !== 'string' || typeof(subtitle) !== 'string') return;
		const auxAlert = {
			show: true,
			header: header,
			subtitle: subtitle,
			message: message,
			buttons: buttons
		}
		return setAlert(auxAlert);
	}

	const closeAlert = () => {
		return setAlert({show: false,header: '',subtitle: '',message: '',buttons: [{text: 'OK!'}]});
	}
	return (
		<IonPage>
            <Header login={{includeLogin: true, user: user}}/>
			<IonContent color={'light'}>
				<IonAlert
					isOpen={alert.show}
					onDidDismiss={() => closeAlert()}
					header={alert.header}
					subHeader={alert.subtitle}
					message={alert.message}
					buttons={alert.buttons}
				/>
				{	(!isAuthenticated || !user || !wetlandusers.some((item) => item === user?.email)) ?  
					<IonTitle>Inicie sesion como administrador</IonTitle>
					:
					<IonGrid className={'fullHeight'}>
						<IonRow className={'fullHeight'}>
							<IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"} className={'fullHeight scroll'}>
								<h3 className={'ion-text-center'}>Pendientes</h3>
								{
									pendings.map((item, i) => 
										<PostCard key={`PostCard-content-index${i}'id'${item._id}`}
											index={i} post={item}
											buttons={[
												{label: 'Aprobar', color: 'success', onClick: () => updateState(item._id, ESTADO.pendiente, ESTADO.aprobado)},
												{label: 'Rechazar', color: 'danger', onClick: () => updateState(item._id, ESTADO.pendiente, ESTADO.rechazado)},
												{label: 'Ver publicacion', onClick: () => showPost(item)},
											]}																			
										/>
									)
								}
							</IonCol>
							<IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"} className={'fullHeight scroll'}>
								<h3 className={'ion-text-center'}>Aprobados</h3>
								{
									approveds.map((item, i) => 
									<PostCard key={`PostCard-content-index${i}'id'${item._id}`}
										index={i} post={item}
										buttons={[
											{label: 'Rechazar', color: 'danger', onClick: () => updateState(item._id, ESTADO.aprobado, ESTADO.rechazado)},
											{label: 'Ver publicacion', onClick: () => showPost(item)},
										]}																			
									/>
								)
								}
							</IonCol>
							<IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"} className={'fullHeight scroll'}>
								<h3 className={'ion-text-center'}>Rechazados</h3>
								{
									refuseds.map((item, i) => 
										<PostCard key={`PostCard-content-index${i}'id'${item._id}`}
											index={i} post={item}
											buttons={[
												{label: 'Aprobar', color: 'success', onClick: () => updateState(item._id, ESTADO.rechazado, ESTADO.aprobado)},
												{label: 'Ver publicacion', onClick: () => showPost(item)},
												{label: 'Eliminar', color: 'danger', onClick: () => showRemoveAlert(item._id)},
											]}																			
										/>
									) 
								}
								<IonFab horizontal={"end"} vertical={"bottom"}>
									<IonFabButton color={'success'} disabled={reloadData} onClick={() => setReloadData(true)}>
										<IonIcon icon={refresh}/>
 									</IonFabButton>
								</IonFab>
							</IonCol>
						</IonRow>
					</IonGrid>
				}
				<IonModal isOpen={showPostModal} showBackdrop={true} keyboardClose={true} onDidDismiss={() => closePost()} cssClass={"modal-width-70vw"}>
					<PostReader post={selectedPost} mode={'complete'} />
				</IonModal>
			</IonContent>
		</IonPage>
	);
};

export default Control;
