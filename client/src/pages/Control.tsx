import { IonAlert, IonCol, IonContent, IonGrid, IonHeader, IonModal, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { post } from '../interfaces/interfaces';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { POSTS_URL, wetlandusers } from '../apiKeys';
import { axiosInstance } from '../axiosConf';
import { PostReader } from '../components/PostReader';

const Control: React.FC = () => {
	const [ postsData, setPostData ] = useState<post[]>([]);
	const [ pendings, setPendings ] = useState<JSX.Element[]>([]);
	const [ approveds, setApproveds ] = useState<JSX.Element[]>([]);
	const [ refuseds, setRefuseds ] = useState<JSX.Element[]>([]);
	const [ forceRefresh, setForceRefresh ] = useState<boolean>(false);
	const [ alert, setAlert ] = useState<{show: boolean,header: string,subtitle: string,message: string}>({show: false,header: '',subtitle: '',message: ''})
	const [ selectedPost, setSelectedPost ] = useState<post | undefined>(undefined);
	const [ showPostModal, setShowPostModal ] = useState<boolean>(false);
	const { user, isAuthenticated, isLoading } = useAuth0();
	const history = useHistory();

	useEffect(()=>{
		if (!isAuthenticated || !user || !wetlandusers.some((item) => item === user?.email)) return history.goBack();
		const getData = () =>{
			try{
				axiosInstance.get(`${POSTS_URL}/posts`).then((response: { data: post[] }) => {
					setPostData(response.data);
				})
			} catch (error) {console.error(error)}
		}
		getData();
	},[user, isAuthenticated, isLoading]);

	useEffect(()=>{
		let auxPendings = [];
		let auxApproveds = [];
		let auxRefuseds = [];
		for (let index = 0; index < postsData.length; index++) {
			const post = postsData[index];
			let cardButtons: { label?: string, size?: "small" | "large" | "default", onClick: Function, 
			color?: string,icon?: string }[] = [];
			switch (post.status){
				case 'pending':
					cardButtons = [
						{label: 'Aprobar', color: 'success', onClick: () => updateState(post.id, 'approved')},
						{label: 'Rechazar', color: 'danger', onClick: () => updateState(post.id, 'refused')},
						{label: 'Ver publicacion', onClick: () => showPost(post)},
					];
				break;
				case 'approved':
					cardButtons = [
						{label: 'Rechazar', color: 'danger', onClick: () => updateState(post.id, 'refused')},
						{label: 'Ver publicacion', onClick: () => showPost(post)},
					]											
				break;
				case 'refused':
					cardButtons = [
						{label: 'Aprobar', color: 'success', onClick: () => updateState(post.id, 'approved')},
						{label: 'Ver publicacion', onClick: () => showPost(post)},
					]											
				break;
			}
			const card = (
				<PostCard
					key={`PostCard-content-index${index}'id'${post.id}`}
					index={index}
					post={post}
					buttons={cardButtons}																			
				/>
			)
			if (post.status === 'pending') auxPendings.push(card);
			else if (post.status === 'approved') auxApproveds.push(card);
			else if (post.status === 'refused') auxRefuseds.push(card);
		}
		setPendings(auxPendings);
		setApproveds(auxApproveds);
		setRefuseds(auxRefuseds);
	},[postsData, forceRefresh]);

	const showPost = (post: post) => {
		if (!post) return;
		setSelectedPost(post);
		setShowPostModal(true);
	}
	const closePost = () => {
		setSelectedPost(undefined);
		setShowPostModal(false);
	}

	const updateState = async (postId: string, status: 'pending' | 'approved' | 'refused') => {
		try{
			let posts = postsData;
			const postIndex = postsData.findIndex((post) => post.id === postId);
			if (postIndex !== -1) {
				let postToUpdate = posts[postIndex];
				postToUpdate.status = status;
				const res = await axiosInstance.patch(`${POSTS_URL}/posts/${postId}`, {
					status: status
				})
				if (!res || !res.data || !res.data.status || (res.data.status !== 200 && res.data.status !== 204)) return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
				posts[postIndex] = postToUpdate;
				setPostData(posts);
				setForceRefresh(!forceRefresh);
			}
		} catch(error) {console.error(error)}
	}

	const showAlert = (message: string, header: string = 'Atencion!',subtitle: string = '') => {
		if (!message || typeof(header) !== 'string' || typeof(subtitle) !== 'string') return;
		const auxAlert = {
			show: true,
			header: header,
			subtitle: subtitle,
			message: message
		}
		return setAlert(auxAlert);
	}

	const closeAlert = () => {
		return setAlert({show: false,header: '',subtitle: '',message: ''});
	}
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color={'primary'}>
					<IonTitle>Gestión de centenido</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color={'light'} fullscreen>
				<IonAlert
					isOpen={alert.show}
					onDidDismiss={() => closeAlert()}
					header={alert.header}
					subHeader={alert.subtitle}
					message={alert.message}
					buttons={['OK']}
				/>
				{	(!isAuthenticated || !user || !wetlandusers.some((item) => item === user?.email)) ?  
					<IonTitle>Inicie sesion como administrador</IonTitle>
					:
					<IonGrid className={'fixHeight'}>
						<IonRow className={'fixHeight'}>
							<IonCol size="4" className={'fixHeight scroll'}>
								<h3 className={'ion-text-center'}>Pendientes</h3>
								{ pendings }
							</IonCol>
							<IonCol size="4" className={'fixHeight scroll'}>
								<h3 className={'ion-text-center'}>Aprobados</h3>
								{ approveds }
							</IonCol>
							<IonCol size="4" className={'fixHeight scroll'}>
								<h3 className={'ion-text-center'}>Rechazados</h3>
								{ refuseds }
							</IonCol>
						</IonRow>
					</IonGrid>
				}
				<IonModal isOpen={showPostModal} showBackdrop={true} keyboardClose={true} onDidDismiss={() => closePost()}>
					<PostReader post={selectedPost} mode={'complete'} />
				</IonModal>
			</IonContent>
		</IonPage>
	);
};

export default Control;
