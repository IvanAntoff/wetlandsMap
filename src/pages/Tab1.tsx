import { IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol } from '@ionic/react';
import { useEffect, useState } from 'react';
import { POSTS_URL } from '../axiosDirs';
import { GenericMap } from '../components/GenericMap';
import PostCard from '../components/PostCard';
import { marker, post } from '../interfaces/interfaces';
const axios = require('axios');

const Tab1: React.FC = () => {
  const [ postsData, setPostData ] = useState<post[]>([]);
  const [ mapCenter, setMapCenter ] = useState<{ latitude: number, longitude: number }>( { latitude: -32.4790999, longitude: -58.2339789 } )
  const [ markers, setMarkers ] = useState<marker[]>([]);

	useEffect(()=>{
		const getData = () =>{
			axios.get(`${POSTS_URL}/posts`).then((response: { data: post[] }) => {
				if (postsData.length !== response.data.length) {
					let auxMarkers:marker[] = [];
					response.data.map((post)=>{
						auxMarkers.push({
							title: post.content.title,
							center: new Microsoft.Maps.Location(parseFloat(post.ubication.lat), parseFloat(post.ubication.lon)),
							text: `${post.content.description.slice(0,75)}...`
						});
						return null;
					});
					setMarkers(auxMarkers);
					setPostData(response.data);
				}
			})
		}
		getData();
	},[postsData.length]);

	useEffect(()=>{
		console.log('mapPosition value: ',mapCenter)
	},[mapCenter])

	useEffect(()=>{
		console.log('markers value: ',markers)
	},[markers])

	const getPostPosition = (id:string) => {
		const mapPosition = postsData.find((post) => post.id === (id));
		if (mapPosition) {
			console.log(mapPosition)
			setMapCenter({latitude: parseFloat(mapPosition.ubication.lat), longitude: parseFloat(mapPosition.ubication.lon)})
		}
	}

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Mapa</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonGrid style={{height: '100%'}}>
					<IonRow style={{height: '100%'}}>
						<IonCol size="4">
							Columna 1
							{
								postsData.length > 0 ? 
								postsData.map((post, index)=>{
									return(
										<PostCard
											key={`PostCard-content-index${index}'id'${post.id}`}
											index={index}
											id={post.id}
											status={post.status}
											category={post.category}
											subcategory={post.subcategory}
											content={post.content}
											ubication={post.ubication}
											keyword={post.keyword}
											buttons={[{label: 'Ver en el mapa', onClick: ()=> {getPostPosition(post.id)}, icon: 'pin'}]}
										/>
									)
								}) 
								:
								null
							}
						</IonCol>
						<IonCol size="8" style={{height: '100%'}}>
							Columna 2
							<GenericMap center={mapCenter} width={'100%'} height={'100%'} markers={markers} zoom={5} />
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Tab1;
