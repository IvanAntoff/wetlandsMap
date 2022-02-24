import { CATEGORIA, post, postVM } from "../interfaces/posts.interface";
import { categorias } from "../enums/data";
import * as Excel from 'exceljs';

export const reduceText = (text: string, max: number = 100) :string => {
    if (!text || typeof(text) !== 'string') return '';
    if (text.length > max) return (text.substring(0, max)+'...'); 
    return text;
}

export const toCapitalizeCase = (text: string) :string => {
    if (!text || text.length <= 0) return '';
    const lowerText = text.substr(1).toLowerCase();
    return (text[0].toUpperCase() + lowerText);
}

export const  booleanText = (boolean: boolean | undefined) => {
    if (typeof(boolean) !== 'boolean') return null;
    if (boolean) return 'Presencia';
    return 'Ausencia';
}

export const getCatergoryName = (type: CATEGORIA) :string => {
    let label = categorias.find((item) => item.value === type)?.name || 'Desconocido';
    return label;
}

export const postToXLSX = async (posts: postVM[] | post[], onError?:() => void) => {
    if(posts.length === 0) {
        if(onError) return onError;
        else return;
    }
    const workBook = new Excel.Workbook();
    // Date by type.
    const data: { humedales: any[], amenazas: any[], iniciativas: any[], arte: any[], investigaciones: any[] } = {
        humedales: [],
        amenazas: [],
        iniciativas: [],
        arte: [],
        investigaciones: [],
    }
    // XLSX Headers by type
    const basicHeader = ['Departamento', 'Zona', 'Latitud', 'Logitud', 'Categoria', 'Tipo', 'Origen', 'Fecha de carga', 'Titulo', 'Descripcion'];
    const humedalesHeader = [ 'Historia', 'Color', 'Olor', 'Aledaños', 'Flora', 'Fauna', 'Margenes', 'Morfologia' ];
    const amenazasHeader = ['Tipo', 'Origen', 'Fuente', 'Olor', 'Color', 'Materia flotando', 'Descripcion de la materia', 'Espuma', 'Algas', 'Analisis', 'Tipo analisis', 'Resultados de analisis', 'Informe tecnico', 'Estudio ambiental'];
    const iniciativasHeader = [ 'tipo', 'participantes', 'objetivo' ];
    const artesHeader = [ 'tipo', 'participantes' ];
    const investigacionesHeader = [ 'participantes', 'estado', 'resultado', 'publicacion' ];
    data.humedales.push(basicHeader.concat(humedalesHeader));
    data.amenazas.push(basicHeader.concat(amenazasHeader));
    data.iniciativas.push(basicHeader.concat(iniciativasHeader));
    data.arte.push(basicHeader.concat(artesHeader));
    data.investigaciones.push(basicHeader.concat(investigacionesHeader));
    posts.forEach(post => {
        const postData = [
            post.departamento,
            post.zona,
            post.coordenadas.latitude,
            post.coordenadas.longitude,
            post.categoria,
            post.tipo,
            post.origen,
            post.fechacreacion,
            post.tipo,
            post.descripcion
        ];
        if(post.categoria === CATEGORIA.humedal && post.datos.humedal) {
            postData.push(
                post.datos.humedal?.historia || 'No incluye',
                post.datos.humedal?.color || 'No incluye',
                booleanText(post.datos.humedal?.olor) || 'No incluye',
                post.datos.humedal?.aledaños  || 'No incluye',
                post.datos.humedal?.flora?.toString() || 'No incluye',
                post.datos.humedal?.fauna?.toString() || 'No incluye',
                post.datos.humedal?.margen || 'No incluye',
                post.datos.humedal?.morfologia || 'No incluye',
            )
            data.humedales.push(postData);
            return;
        }
        if (post.categoria === CATEGORIA.amenaza && post.datos.amenaza) {
            postData.push(
                post.datos.amenaza?.tipo || 'No incluye',
                post.datos.amenaza?.origen || 'No incluye',
                post.datos.amenaza?.fuente || 'No incluye',
                booleanText(post.datos.amenaza?.olor) || 'No incluye',
                post.datos.amenaza?.color || 'No incluye',
                booleanText(post.datos.amenaza?.materia) || 'No incluye',
                post.datos.amenaza?.materiadescripcion || 'No incluye',
                booleanText(post.datos.amenaza?.espuma) || 'No incluye',
                booleanText(post.datos.amenaza?.algas) || 'No incluye',
                booleanText(post.datos.amenaza?.analisis) || 'No incluye',
                post.datos.amenaza?.tipoanalises || 'No incluye',
                post.datos.amenaza?.resultadoanalises || 'No incluye',
                booleanText(post.datos.amenaza?.informetecnico) || 'No incluye',
                booleanText(post.datos.amenaza?.estudioambiental) || 'No incluye',
            );
            data.amenazas.push(postData);
            return;
        }
        if (post.categoria === CATEGORIA.iniciativa && post.datos.iniciativa) {
            postData.push(
                post.datos.iniciativa?.tipo || 'No incluye',
                post.datos.iniciativa?.participantes || 'No incluye',
                post.datos.iniciativa?.objetivo || 'No incluye',
            );
            data.iniciativas.push(postData);
            return;
        }
        if (post.categoria === CATEGORIA.arte && post.datos.arte) {
            postData.push(
                post.datos.arte.tipo || 'No incluye',
                post.datos.arte.participantes || 'No incluye',
            );
            data.arte.push(postData);
            return;
        }
        if (post.categoria === CATEGORIA.investigacion && post.datos.investigacion) {
            postData.push(
                post.datos.investigacion?.participantes || 'No incluye',
                post.datos.investigacion?.estado || 'No incluye',
                post.datos.investigacion?.resultado || 'No incluye',
                post.datos.investigacion?.publicacion || 'No incluye',
            );
            data.investigaciones.push(postData);
            return;
        }
    });
    if(data.humedales.length > 1) {
        const ws = workBook.addWorksheet('Humedales & sitios de interes');
        ws.addRows(data.humedales);
    }
    if(data.amenazas.length > 1) {
        const ws = workBook.addWorksheet('Amenazas & impactos');
        ws.addRows(data.amenazas);
    }
    if(data.iniciativas.length > 1) {
        const ws = workBook.addWorksheet('Iniciativas sustentables');
        ws.addRows(data.iniciativas);
    } 
    if(data.arte.length > 1) {
        const ws = workBook.addWorksheet('Expreciones artisticas');
        ws.addRows(data.arte);
    }
    if(data.investigaciones.length > 1) {
        const ws = workBook.addWorksheet('Proyectos de investigacion');
        ws.addRows(data.arte);
    }
    const buffer = await workBook.xlsx.writeBuffer();
    const blobo = new Blob([buffer]);
    const blobUrl = window.URL.createObjectURL(blobo);
    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = 'Excel.xlsx';

    // Append link to the body
    document.body.appendChild(link);

    // firefox fix
    link.dispatchEvent(
        new MouseEvent('click', { 
        bubbles: true, 
        cancelable: true, 
        view: window 
        })
    );

    // Eliminamos el link.
    document.body.removeChild(link);
}