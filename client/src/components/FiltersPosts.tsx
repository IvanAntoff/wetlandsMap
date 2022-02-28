import { useMemo, useState } from "react";
import { POSTS_URL } from "../apiKeys";
import { axiosInstance } from "../axiosConf";
import { keywordsItems } from "../enums/data";
import { Enums } from "../interfaces/enum.interface";
import { genericFilter } from "../interfaces/interfaces";
import { categorias, post, postVM } from "../interfaces/posts.interface";
import { GenericFilters } from "./GenericFilters";

type FiltersPostsType = 'All' | 'Date' | 'Category' | 'Keywords';

interface FiltersPostsProps {
    active: FiltersPostsType[];
    getAppliedFilters: (filters: genericFilter[]) => void;
    validateWithName?: boolean;
}

export const FiltersPosts: React.FC<FiltersPostsProps> = (props: FiltersPostsProps) => {
    const [ enumsData, setEnumsData ] = useState<Enums>();

    useMemo(async () => {
        const enums = await axiosInstance.get(`${POSTS_URL}/enums`)
        .catch((error) => {console.error(error || 'Error al obtener datos.')});
        if (enums?.data) setEnumsData(enums.data);
    },[])

    const requiredFilters = (): any[] => {
        const getDateItems = (): {name: string, value: string}[] => {
            const userYear = (new Date).getFullYear();
            const releaseYear = 2022;
            const resp = [{name: `${releaseYear}`, value: `${releaseYear}`}];
            if(userYear <= releaseYear) return resp;
            for (let i = 1; i <= (userYear-releaseYear); i++) {
                resp.push({name: `${releaseYear+i}`, value: `${releaseYear+i}`});
            }
            return resp;
        }

        const postFilters = [
            {
                title: 'Tipo de publicacion',
                placeholder: 'Seleccione una categoria',
                items: categorias,
                multiple: true,
                type: 'Category',
            },
            {
                title: 'Palabras clave',
                placeholder: 'Seleccione palabra/s clave',
                items: keywordsItems.map(item => {return {name: item, value: item.toLowerCase()}}),
                multiple: true,
                type: 'Keyword'
            },
            {
                title: 'Año de publicacion',
                placeholder: 'Seleccione un año',
                items: getDateItems(),
                multiple: true,
                type: 'Date'
            }
        ];
        if (!enumsData || props.active.length === 0) return [];
        else if (props.active.includes('All')) return postFilters;
        if(!props.active.includes('Category')) postFilters.splice(0,1);
        if(!props.active.includes('Keywords')) postFilters.splice(1,1);
        if(!props.active.includes('Date')) postFilters.splice(2,1);
        return postFilters
    }

    return (
        <GenericFilters filters={requiredFilters()} getFilters={props.getAppliedFilters}/>
    )
}

export const FilterPostByCategory = (posts: postVM[], values: string | string[]): postVM[] => {
    if(posts.length === 0) return [];
    if(typeof(values) === 'string') values = values.split(',');
    const resp: postVM[] = [];
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        if (values.includes(post.categoria)) resp.push(post); 
    }
    return resp;
}

export const FilterPostByKeyword = (posts: postVM[], values: string | string[]): postVM[] => {
    if(posts.length === 0) return [];
    if(typeof(values) === 'string') values = values.split(',');
    const resp: postVM[] = [];
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        for (let j = 0; j < post.keyword.length; j++) {
            const key = post.keyword[j];
            if(!values.includes(key)) continue;
            resp.push(post);
            break;
        }
    }
    return resp;
}

export const FilterPostByDate = (posts: postVM[], values: string | string[]): postVM[] => {
    if(posts.length === 0) return [];
    if(typeof(values) === 'string') values = values.split(',');
    const resp: postVM[] = [];
    for (let i = 0; i < posts.length; i++) {
        const post = posts[i];
        for (let j = 0; j < values.length; j++) {
            const value = values[j];
            if(!post.fechacreacion.toString().includes(value)) continue;
            resp.push(post);
            break;
        }
    }
    return resp;
}

export const getFiltersRes = (posts: postVM[], filters: genericFilter[]) => {
    if(posts.length === 0) return [];
    if(filters.length === 0) return posts;
    for (let i = 0; i < filters.length; i++) {
        if(posts.length === 0) break;
        const filter = filters[i];
        if(filter.type === 'Category') posts = FilterPostByCategory(posts, filter.value);
        if(filter.type === 'Keyword') posts = FilterPostByKeyword(posts, filter.value);
        if(filter.type === 'Date') posts = FilterPostByDate(posts, filter.value);
    }
    return posts;
}