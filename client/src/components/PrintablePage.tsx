import { useEffect, useState } from "react"
import { POSTS_URL } from "../apiKeys"
import { axiosInstance } from "../axiosConf"
import { postVM } from "../interfaces/posts.interface"
import { PostReader } from "./PostReader"
import { useHistory } from "react-router-dom";
import { scale } from "ionicons/icons"

interface PrintablePagePost {
    postId: string
}

export const PrintablePage: React.FC<PrintablePagePost> = (props: PrintablePagePost) => {
    const [ post, setPost ] = useState<postVM | undefined>(undefined);
    const [ text, setText ] = useState<string>('Cargando...');
    const history = useHistory();

    useEffect(() => {
        console.log(props.postId)
        axiosInstance.get(`${POSTS_URL}/posts?id=${props.postId}&normalize=${true}`)
        .then(res => {
            if(!res || !Array.isArray(res?.data) || !res.data[0]) {
                setText('La publicacion buscada no existe.');
                return setTimeout(() => history.goBack(), 1000);
            }
            setPost(res.data[0]);
            setTimeout(() => {
                const tabs = document.getElementById('tabs')
                if (tabs) tabs.style.display = 'none';
                window.print();
                if (tabs) tabs.style.display = 'flex';
            }, 1000);
        })
        .catch(() => {
            setText('Error vuelva a intentarlo mas tarde.');
            setTimeout(() => history.goBack(), 1000);
        });
    },[props]);

    return (
        post ? 
        <PostReader mode="print" post={post} />
        :
        <h1>{text}</h1>
    )
}