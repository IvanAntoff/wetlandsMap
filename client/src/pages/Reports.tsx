import { IonAlert, IonButton, IonCol, IonContent, IonGrid, IonItem, IonItemDivider, IonLabel, IonModal, IonPage, IonRow, IonTitle } from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import PostCard from '../components/PostCard';
import { useAuth0 } from "@auth0/auth0-react";
import { useHistory } from "react-router-dom";
import { POSTS_URL, wetlandusers } from '../apiKeys';
import { axiosInstance } from '../axiosConf';
import { PostReader } from '../components/PostReader';
import { Header } from '../components/Header';
import { ESTADO, groupedPosts, postVM } from '../interfaces/posts.interface';
import { genericFilter } from '../interfaces/interfaces';
import { FiltersPosts, getFiltersRes } from '../components/FiltersPosts';

const Reports: React.FC = () => {
	const [ posts, setPosts ] = useState<postVM[]>([]);
	const [ appliedFilters, setAppliedFilters ]	= useState<genericFilter[]>([]);
	const [ alert, setAlert ] = useState<{show: boolean,header: string,subtitle: string,message: string, buttons: {text: string, handler?: () => void}[]}>({show: false,header: '',subtitle: '',message: '', buttons: [{text: 'OK'}]})
	const [ selectedPost, setSelectedPost ] = useState<postVM | undefined>(undefined);
	const [ showPostModal, setShowPostModal ] = useState<boolean>(false);
	const { user, isAuthenticated, isLoading } = useAuth0();
	const history = useHistory();
	const checkedPosts = useRef<string[]>([]);
	const [resetAll, setResetAll] = useState<boolean>(false);
	const [checkAll, setCheckAll] = useState<boolean>(false);

	useEffect(()=>{
		if (!isAuthenticated || !user || !wetlandusers.some((item) => item === user?.email)) return history.push('/home');
		const getData = () =>{
			try{
				axiosInstance.get(`${POSTS_URL}/posts?state=${ESTADO.aprobado}`)
				.then((response: { data: groupedPosts }) => {
					if(!response || !response?.data) return;
					if(Array.isArray(response.data)) setPosts(response.data);
				})
			} catch (error) {console.error(error)}
		}
		getData();
	},[user, isAuthenticated, isLoading]);


	useEffect(() => {
		setResetAll(!resetAll);
		checkedPosts.current = [];
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

	const cleanChecks = () => {
		setResetAll(!resetAll);
		checkedPosts.current = [];
	}

	const selectAll = () => {
		checkedPosts.current = [];
		setCheckAll(!checkAll);
	}

	const generateReport = async () => {
		try{
			if(!Array.isArray(checkedPosts?.current) || checkedPosts.current.length === 0) return showAlert('Debe seleccionar al menos una publicacion para generar reportes.', 'Error!', '');
			const res = await axiosInstance.post(`${POSTS_URL}/posts/changeState`, checkedPosts.current);
			if (!res || !res.status || (res.status !== 201 && res.status !== 204)) return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
		} catch(error) {
			console.error(error);
			return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
		}
	}

	const generateReportComplete = async () => {
		try{
			const res = await axiosInstance.post(`${POSTS_URL}/posts/changeState`, []);
			if (!res || !res.status || (res.status !== 201 && res.status !== 204)) return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
		} catch(error) {
			console.error(error);
			return showAlert('No hemos logrado conectar con el servidor', 'Error al actualizar!', 'Intente en unos minutos.');
		}
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
			<IonContent color={'light'} >
				<IonAlert
					isOpen={alert.show}
					onDidDismiss={() => closeAlert()}
					header={alert.header}
					subHeader={alert.subtitle}
					message={alert.message}
					buttons={alert.buttons}
				/>
				{	(!isAuthenticated || !user || !wetlandusers.some((item) => item === user?.email)) ?  
					<IonTitle className={'ion-text-center'}>Inicie sesion como administrador</IonTitle>
					:
					<IonGrid className={'fixHeight'}>
						<IonRow className={'fixHeight'}>
							<IonCol sizeMd={"5"} sizeSm={"12"} sizeXs={"12"}>
								<h3 className='ion-text-center'>Filtros</h3>
								<FiltersPosts active={['All']} getAppliedFilters={setAppliedFilters}/>
							</IonCol>
							<IonCol sizeMd={"2"} sizeSm={"12"} sizeXs={"12"} className={'ion-padding-horizontal'}>
								<h3 className={'ion-text-center'}>Acciones</h3>
								<IonItem>
									<IonLabel className={'ion-text-center ion-margin-vertical'}>Seleccion</IonLabel>
								</IonItem>
								<IonItem>
									<IonButton onClick={selectAll} expand={'block'} color={'primary'} style={{width: '100%'}}>Seleccionar todos</IonButton>
								</IonItem>
								<IonItem>
									<IonButton onClick={cleanChecks} expand={'block'} color={'warning'} style={{width: '100%'}}>Limpiar selecciones</IonButton>
								</IonItem>
								<IonItemDivider color='none'></IonItemDivider>
								<IonItem>
									<IonLabel className={'ion-text-center ion-margin-vertical'}>Generar reporte</IonLabel>
								</IonItem>
								<IonItem>
									<IonButton onClick={generateReport} disabled expand={'block'} color={'success'} style={{width: '100%'}}>Solo seleccionados</IonButton>
								</IonItem>
								<IonItem>
									<IonButton onClick={generateReportComplete} disabled expand={'block'} color={'success'} style={{width: '100%'}}>Historico</IonButton>
								</IonItem>
							</IonCol>
							<IonCol sizeMd={"5"} sizeSm={"12"} sizeXs={"12"} className={'fixHeight scroll'}>
								<h3 className={'ion-text-center'}>Publicaciones</h3>
								{
									getFiltersRes(posts, appliedFilters).map((item, i) => 
										<PostCard key={`PostCard-content-index${i}'id'${item._id}`}
											index={i} post={item}
											buttons={[
												{label: 'Ver publicacion', onClick: () => showPost(item)},
											]}
											check={{
												onCheck: (post) => console.log(post),
												setUncheck: resetAll,
												setCheck: checkAll
											}}
										/>
									)
								}
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

export default Reports;
