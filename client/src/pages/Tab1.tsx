import { IonContent, IonGrid, IonHeader, IonPage, IonTitle, IonToolbar, IonRow, IonCol } from '@ionic/react';
import { useEffect, useState } from 'react';
import { POSTS_URL } from '../axiosDirs';
import { GenericMap } from '../components/GenericMap';
import PostCard from '../components/PostCard';
import { bingMapPosition, marker, post } from '../interfaces/interfaces';
const axios = require('axios');

const Tab1: React.FC = () => {
	const [ postsData, setPostData ] = useState<post[]>([]);
	const [ mapCenter, setMapCenter ] = useState<{ latitude: number, longitude: number }>( { latitude: -32.4790999, longitude: -58.2339789 } )
	const [ markers, setMarkers ] = useState<marker[]>([]);
	const [ onClickPosition, setOnClickPosition ] = useState<bingMapPosition>()
	const [ zoom, setZoom ] = useState<number>(5);

	useEffect(()=>{
		const getData = () =>{
			axios.get(`${POSTS_URL}/posts`).then((response: { data: post[] }) => {
				if (postsData.length !== response.data.length) {
					let auxMarkers:marker[] = [];
					response.data.map((post)=>{
						auxMarkers.push({
							title: post.content.title,
							center: {latitude: parseFloat(post.ubication.lat),longitude: parseFloat(post.ubication.lon)},
							text: `${post.content.description.slice(0,75)}...`,
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

	const getPostPosition = (id:string) => {
		const mapPosition = postsData.find((post) => post.id === (id));
		if (mapPosition) {
			setMapCenter({latitude: parseFloat(mapPosition.ubication.lat), longitude: parseFloat(mapPosition.ubication.lon)})
			setZoom(10)
		}
	}

	const getClickedLocation = (value: bingMapPosition) => {
		if (value && ((value.latitude && typeof(value.latitude) === 'number') && (value.longitude && typeof(value.longitude) === 'number'))) {
			if (value !== onClickPosition) {
				setOnClickPosition(value);
				setMapCenter(value);
				setZoom(8);
			};
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
							<GenericMap center={mapCenter} width={'100%'} height={'100%'} markers={markers} zoom={zoom} 
								getLocationOnClick={(value:bingMapPosition) => getClickedLocation(value)}
							/>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Tab1;
