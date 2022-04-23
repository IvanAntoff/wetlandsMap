import { useEffect, useState } from "react"
import { POSTS_URL } from "../apiKeys"
import { axiosInstance } from "../axiosConf"
import { postVM } from "../interfaces/posts.interface"
import { PostReader } from "./PostReader"
import { useHistory } from "react-router-dom";

interface PrintablePagePost {
    postId: string
}

export const PrintablePage: React.FC<PrintablePagePost> = (props: PrintablePagePost) => {
    const [ post, setPost ] = useState<postVM | undefined>(undefined);
    const [ text, setText ] = useState<string>('Cargando...');
    const history = useHistory();

    useEffect(() => {
        axiosInstance.get(`${POSTS_URL}/posts/${props.postId}?normalize=${true}&includecomments=${false}`)
        .then(res => {
            if(!res || !res.data) {
                setText('La publicacion buscada no existe.');
                return setTimeout(() => history.goBack(), 1000);
            }
            setPost(res.data);
            setTimeout(() => {
                const tabs = document.getElementById('tabs');
                const toPrint = document.getElementById('toPrint');
                if (tabs) tabs.style.display = 'none';
                if (toPrint) toPrint.style.transform = 'scale(1,0.8)';
                window.print();
                if (tabs) tabs.style.display = 'flex';
                if (toPrint) {
                    toPrint.style.transform = 'scale(1,1)';
                    toPrint.style.overflow = 'scroll';
                };
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