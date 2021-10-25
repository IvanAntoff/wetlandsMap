import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import { post } from '../interfaces/interfaces';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { POSTS_URL, wetlandusers } from '../apiKeys';
import { axiosInstance } from '../axiosConf';

const Control: React.FC = () => {
	const [ postsData, setPostData ] = useState<post[]>([]);
	const [ pendings, setPendings ] = useState<JSX.Element[]>([]);
	const [ approveds, setApproveds ] = useState<JSX.Element[]>([]);
	const [ refuseds, setRefuseds ] = useState<JSX.Element[]>([]);
	const [ forceRefresh, setForceRefresh ] = useState<boolean>(false);
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
						{label: 'Ver publicacion', onClick: () => console.log(post)},
					];
				break;
				case 'approved':
					cardButtons = [
						{label: 'Rechazar', color: 'danger', onClick: () => updateState(post.id, 'refused')},
						{label: 'Ver publicacion', onClick: () => console.log(post)},
					]											
				break;
				case 'refused':
					cardButtons = [
						{label: 'Aprobar', color: 'success', onClick: () => updateState(post.id, 'approved')},
						{label: 'Ver publicacion', onClick: () => console.log(post)},
					]											
				break;
			}
			const card = (
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

	const updateState = async (postId: string, status: 'pending' | 'approved' | 'refused') => {
		try{
			let posts = postsData;
			const postIndex = postsData.findIndex((post) => post.id === postId);
			if (postIndex !== -1) {
				let postToUpdate = posts[postIndex];
				postToUpdate.status = status;
				const res = axiosInstance.put(`${POSTS_URL}/posts/${postId}`, {
					...postToUpdate
				})
				posts[postIndex] = postToUpdate;
				setPostData(posts);
				setForceRefresh(!forceRefresh);
			}
		} catch(error) {console.error(error)}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color={'primary'}>
					<IonTitle>Gestión de centenido</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent color={'light'} fullscreen>
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
			</IonContent>
		</IonPage>
	);
};

export default Control;
