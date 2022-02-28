import { IonAlert, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonModal, IonPage, IonRow, IonTitle } from '@ionic/react';
import { useEffect, useState } from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { POSTS_URL, wetlandusers } from '../apiKeys';
import { axiosInstance } from '../axiosConf';
import { Header } from '../components/Header';
import { ESTADO } from '../interfaces/posts.interface';
import { refresh } from 'ionicons/icons';
import { commentVM } from '../interfaces/comment.interface';
import CommentCard from '../components/CommentCard';

const ControlComments: React.FC = () => {
	const [ reloadData, setReloadData ] = useState<boolean>(true);
	const [ pendings, setPendings ] = useState<commentVM[]>([]);
	const [ approveds, setApproveds ] = useState<commentVM[]>([]);
	const [ refuseds, setRefuseds ] = useState<commentVM[]>([]);
	const [ alert, setAlert ] = useState<{show: boolean,header: string,subtitle: string,message: string, buttons: {text: string, handler?: () => void}[]}>({show: false,header: '',subtitle: '',message: '', buttons: [{text: 'OK'}]})
	const { user, isAuthenticated, isLoading } = useAuth0();
	const history = useHistory();

	useEffect(()=>{
		if (!isAuthenticated || !user || !wetlandusers.some((item) => item === user?.email)) return history.push('/home');
		const getData = () =>{
			try{
				axiosInstance.get(`${POSTS_URL}/comments`)
				.then((response: { data: commentVM[] }) => {
					if(!response || !Array.isArray(response?.data)) return;
					setReloadData(false);
					const aprobados: commentVM[] = [];
					const rechazados: commentVM[] = [];
					const pendientes: commentVM[] = [];
					for (let i = 0; i < response.data.length; i++) {
						const comment: commentVM = response.data[i];
						if (comment.state === ESTADO.aprobado) aprobados.push(comment);
						else if (comment.state === ESTADO.pendiente) pendientes.push(comment);
						else if (comment.state === ESTADO.rechazado) rechazados.push(comment);
					}
					if(aprobados.length > 0) setApproveds(aprobados);
					if(rechazados.length > 0) setRefuseds(rechazados);
					if(pendientes.length > 0) setPendings(pendientes);
				})
			} catch (error) {console.error(error)}
		}
		if(reloadData) return getData();
	},[user, isAuthenticated, isLoading, reloadData]);

	const updateState = async (commentId: string, actualState: ESTADO, newState: ESTADO) => {
		try{
			let commentToUpdate = null;
			let commentIndex: number = -1;
			let auxComments: commentVM[] = [];
			switch (actualState) {
				case ESTADO.aprobado:
					commentIndex = approveds.findIndex((item) => item._id === commentId);
					if (commentIndex === -1) return;
					commentToUpdate = approveds[commentIndex];
					auxComments = approveds;
					auxComments.splice(commentIndex, 1);
					setApproveds([...auxComments]);
					break;
				case ESTADO.pendiente:
					commentIndex = pendings.findIndex((item) => item._id === commentId);
					if (commentIndex === -1) return;
					commentToUpdate = pendings[commentIndex];
					auxComments = pendings;
					auxComments.splice(commentIndex, 1);
					setPendings([...auxComments]);
					break;
				case ESTADO.rechazado:
					commentIndex = refuseds.findIndex((item) => item._id === commentId);
					if (commentIndex === -1) return;
					commentToUpdate = refuseds[commentIndex];
					auxComments = refuseds;
					auxComments.splice(commentIndex, 1);
					setRefuseds([...auxComments]);
					break;
			}
			commentToUpdate.state = newState;
			const res = await axiosInstance.post(`${POSTS_URL}/comments/changeState`, {
				id: commentId,
				estado: newState
			});
			if (!res || !res.status || (res.status !== 201 && res.status !== 204)) return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
			switch(newState) {
				case ESTADO.aprobado:
					return setApproveds([...approveds, commentToUpdate]);
				case ESTADO.rechazado:
					return setRefuseds([...refuseds, commentToUpdate]);
				case ESTADO.pendiente:
					return setPendings([...pendings, commentToUpdate]);
			}
		} catch(error) {
			console.error(error);
			return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
		}
	}

	const removeComment = async (commentId: string) => {
		try {
			const commentIndex = refuseds.findIndex((post) => post._id === commentId);
			if (commentIndex < 0) return; 
				const res = await axiosInstance.post(`${POSTS_URL}/comments/deleteComment/${commentId}`);
				if (!res || !res.status || (res.status !== 200 && res.status !== 201)) return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
				const auxPosts = refuseds;
				auxPosts.splice(commentIndex,1);
				setRefuseds([...auxPosts])
		} catch(error) {
			console.error(error);
			return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
		}
	}

	const showRemoveAlert = (commentId: string) => {
		showAlert(
			'Esta a punto de eliminar un comentario!',
			'ALERTA!',
			'¿Esta seguro de continuar?',
			[
				{text: 'Cancelar', handler: () => closeAlert()},
				{text: 'Eliminar', handler: () => removeComment(commentId)}
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
										<CommentCard key={`CommentCard-pending-content-index${i}'id'${item._id}`}
											comment={item}
											buttons={[
												{ label: 'Aprobar', color: 'success', onClick: () => updateState(item._id, ESTADO.pendiente, ESTADO.aprobado) },
												{ label: 'Rechazar', color: 'danger', onClick: () => updateState(item._id, ESTADO.pendiente, ESTADO.rechazado) },
											]} 
										/>
									)
								}
							</IonCol>
							<IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"} className={'fullHeight scroll'}>
								<h3 className={'ion-text-center'}>Aprobados</h3>
								{
									approveds.map((item, i) => 
									<CommentCard key={`CommentCard-approved-content-index${i}'id'${item._id}`}
										comment={item}
										buttons={[
											{label: 'Rechazar', color: 'danger', onClick: () => updateState(item._id, ESTADO.aprobado, ESTADO.rechazado)},
										]}																			
									/>
								)
								}
							</IonCol>
							<IonCol sizeMd={"4"} sizeSm={"12"} sizeXs={"12"} className={'fullHeight scroll'}>
								<h3 className={'ion-text-center'}>Rechazados</h3>
								{
									refuseds.map((item, i) => 
										<CommentCard key={`CommentCard-approved-content-index${i}'id'${item._id}`}
											comment={item}
											buttons={[
												{label: 'Aprobar', color: 'success', onClick: () => updateState(item._id, ESTADO.rechazado, ESTADO.aprobado)},
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
			</IonContent>
		</IonPage>
	);
};

export default ControlComments;