import { IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonTitle, IonToolbar } from '@ionic/react';
import { useEffect, useState } from 'react';
import { POSTS_URL } from '../axiosDirs';
import PostCard from '../components/PostCard';
import { post } from '../interfaces/interfaces';
const axios = require('axios');

const Tab3: React.FC = () => {
  const [ postsData, setPostData ] = useState<post[]>([]);

	useEffect(()=>{
		const getData = () =>{
			axios.get(`${POSTS_URL}/posts`).then((response: { data: post[] }) => {
				if (postsData.length !== response.data.length) {
					setPostData(response.data);
				}
			})
		}
		getData();
	},[postsData.length]);

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar>
					<IonTitle>Mapa</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<IonGrid className={'fixHeight'}>
					<IonRow className={'fixHeight'}>
						<IonCol size="4" className={'fixHeight scroll'}>
							Columna 1
							{
								postsData.length > 0 ? 
								postsData.map((post, index)=>{
									if(post.status === 'pending')
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
											buttons={[]}
										/>
									)
									return null
								}) 
								:
								null
							}
						</IonCol>
						<IonCol size="4" className={'fixHeight scroll'}>
							Columna 1
							{
								postsData.length > 0 ? 
								postsData.map((post, index)=>{
									if(post.status === 'refused')
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
											buttons={[]}
										/>
									)
									return null
								}) 
								:
								null
							}
						</IonCol>
						<IonCol size="4" className={'fixHeight scroll'}>
							Columna 1
							{
								postsData.length > 0 ? 
								postsData.map((post, index)=>{
									if(post.status === 'approved')
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
											buttons={[]}
										/>
									)
									return null
								}) 
								:
								null
							}
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Tab3;
