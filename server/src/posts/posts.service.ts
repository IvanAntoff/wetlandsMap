import { BadGatewayException, BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CommentsService } from 'src/comments/comments.service';
import { EnumsService } from 'src/enums/enums.service';
import { FilesService } from 'src/files/files.service';
import { archivoVM, CATEGORIA, ESTADO, post, postVM } from 'src/interfaces/posts.interface';

@Injectable()
export class PostsService {
    constructor(
        @InjectModel('posts') private posts: Model <post>,
        private enumsService: EnumsService,
        private filesService: FilesService,
        private commentsService: CommentsService
    ) {}

    public async normalizePosts(posts: post[], includeComments: boolean): Promise<postVM[]> {
        return new Promise(async (resolve, reject) => {
            if (!Array.isArray(posts)) return reject(new BadRequestException('Posts not includes.'));
            const enums = await this.enumsService.enumFindAll('todos');
            if (!enums || Array.isArray(enums)) return reject(new InternalServerErrorException('Enums not founds.'));
            const normalizedPosts: postVM[] = [];
            for (let i = 0; i < posts.length; i++) {
                const comments = includeComments ? await this.commentsService.getAllbyPosts(posts[i]._id, true) : [];
                let post: postVM = {
                    ...posts[i],
                    departamento: enums.departamentos.find((item) => item._id.toString() === posts[i].departamento)?.name || 'Desconocido',
                    origen: enums.origenes.find((item) => item._id.toString() === posts[i].origen)?.name || 'Desconocido',
                    tipo: enums.tipohumedales.find((item) => item._id.toString() === posts[i].tipo)?.name || 'Desconocido',
                    zona: enums.zonas.find((item) => item._id.toString() === posts[i].zona)?.name || 'Desconocido',
                    comments: comments
                }
                if(post.categoria === CATEGORIA.amenaza && post?.datos?.amenaza) post.datos.amenaza = {
                    ...post.datos.amenaza,
                    fuente: enums.fuenteamenazas.find((item) => item._id.toString() === post.datos.amenaza.fuente)?.name || 'Desconocida',
                    origen:  enums.origenes.find((item) => item._id.toString() === post.datos.amenaza.origen)?.name || 'Desconocido',
                    tipo:  enums.tipoamenazas.find((item) => item._id.toString() === post.datos.amenaza.tipo)?.name || 'Desconocido',
                    color: post.datos.amenaza?.color ? enums.colores.find((item) => item._id.toString() === post.datos.amenaza.color)?.name || 'Desconocido' : null,
                    resultadoanalises: post.datos.amenaza?.resultadoanalises ? enums.resultadoanalises.find((item) => item._id.toString() === post.datos.amenaza.resultadoanalises)?.name || 'Desconocido' : null,
                    tipoanalises: post.datos.amenaza?.tipoanalises ? enums.tipoanalises.find((item) => item._id.toString() === post.datos.amenaza.tipoanalises)?.name || 'Desconocido' : null,
                }
                else if(post.categoria === CATEGORIA.humedal && post.datos?.humedal) post.datos.humedal = {
                    ...post.datos.humedal,
                    aledaños: enums.aledaños.find((item) => item._id.toString() === post.datos.humedal.aledaños)?.name || 'Desconocido',
                    color: post.datos.humedal?.color ? enums.colores.find((item) => item._id.toString() === post.datos.humedal.color)?.name || 'Desconocido' : null,
                    fauna: post.datos.humedal?.fauna ? post.datos.humedal.fauna.map((fauna) => enums.faunas.find((item) => item._id.toString() === fauna)?.name || 'Desconocido') : [],
                    flora: post.datos.humedal?.flora ? post.datos.humedal.flora.map((flora) => enums.floras.find((item) => item._id.toString() === flora)?.name || 'Desconocido') : [],
                    margen: post.datos.humedal?.margen ? enums.margenes.find((item) => item._id.toString() === post.datos.humedal.margen)?.name || 'Desconocido' : null,
                    morfologia: post.datos.humedal?.morfologia ? enums.morfologias.find((item) => item._id.toString() === post.datos.humedal.morfologia)?.name || 'Desconocido' : null,
                }
                else if(post.categoria === CATEGORIA.arte && post.datos?.arte) post.datos.arte = {
                    tipo: enums.tipoartes.find((item) => item._id.toString() === post.datos.arte.tipo)?.name || 'Desconocido',
                    participantes: enums.participantes.find((item) => item._id.toString() === post.datos.arte.participantes)?.name || 'Desconocido',
                }
                else if(post.categoria === CATEGORIA.iniciativa && post.datos?.iniciativa) post.datos.iniciativa = {
                    objetivo: enums.objetivoiniciativas.find((item) => item._id.toString() === post.datos.iniciativa.objetivo)?.name || 'Desconocido',
                    participantes: enums.participantes.find((item) => item._id.toString() === post.datos.iniciativa.participantes)?.name || 'Desconocido',
                    tipo: enums.tipoiniciativas.find((item) => item._id.toString() === post.datos.iniciativa.participantes)?.name || 'Desconocido',
                }
                else if(post.categoria === CATEGORIA.investigacion && post.datos?.investigacion) post.datos.investigacion = {
                    ...post.datos.investigacion,
                    participantes: enums.participantes.find((item) => item._id.toString() === post.datos.investigacion.participantes)?.name || 'Desconocido',
                    estado: post.datos.investigacion?.estado ? enums.estadoinvestigaciones.find((item) => item._id.toString() === post.datos.investigacion.estado)?.name || 'Desconocido' : null,
                    publicacion: post.datos.investigacion?.publicacion ? enums.publicaciones.find((item) => item._id.toString() === post.datos.investigacion.publicacion)?.name || 'Desconocido' : null,
                    resultado: post.datos.investigacion?.resultado ? enums.resultadoinvestigaciones.find((item) => item._id.toString() === post.datos.investigacion.resultado)?.name || 'Desconocido' : null,
                }
                if(Array.isArray(post.files) && post.files.length > 0) {
                    const files: archivoVM[] = [];
                    for (let i = 0; i < post.files.length; i++) {
                        const file = post.files[i];
                        const url = this.filesService.getFileUrl(file.filename);
                        if(!url) continue;
                        files.push({
                            ...file,
                            url
                        })
                    }
                    post.files = files;
                } 
                normalizedPosts.push(post);
            }
            return resolve(normalizedPosts)
        });
    }

    public async findAll(normalize: boolean = true, filterByStates: ESTADO[] = [], includeComments: boolean): Promise <post[]> {
        return new Promise(async (resolve) => {
            const filters: any = {};
            if (Array.isArray(filterByStates) && filterByStates.length > 0) filters.estado = {"$in": filterByStates}
            const response: post[] = normalize ? await this.normalizePosts(await this.posts.find(filters).lean(), includeComments) : await this.posts.find(filters).lean();
            return resolve(response ? response : []);
        })
    }
    
    public async findOne(id: string, normalize: boolean = true, includeComments: boolean): Promise<post | postVM> {
        return new Promise(async (resolve, rejects) => {
            try {     
                if (!id) return rejects(new BadGatewayException('id or type not include'));
                let response:post | postVM= await this.posts.findById(id).lean();
                if (!response) return rejects(new NotFoundException('Post not found.'));
                if(normalize) {
                    const aux: postVM[] = await (this.normalizePosts([response], includeComments));
                    if(!aux || !Array.isArray(aux) || aux.length == 0) return rejects(new NotFoundException('Normalize post not found.'));
                    response = aux[0]
                }
                return resolve(response);
            } catch (error) {
                return error
            }
        });
    }

    public async create(newPost: post): Promise <post> {
        return new Promise(async (resolve, rejects) => {
            if (!newPost) return rejects(new BadGatewayException('Name or type not include'));
            newPost.fechacreacion = new Date;
            let response = await this.posts.create(newPost);
            return resolve(response ? newPost : null);
        });
    }

    public async changeState(postId: string, state: ESTADO): Promise <post> {
        return new Promise(async (resolve, rejects) => {
            if (!postId || !state) return rejects(new BadGatewayException('id or state not include'));
            let response = await this.posts.findByIdAndUpdate(postId, {estado: state})
            if (!response) return rejects(new ForbiddenException('Post not found'));
            return resolve(response);
        });
    }

    public async delete(postId: string): Promise <boolean> {
        return new Promise(async (resolve, rejects) => {
            if (!postId) return rejects(new BadGatewayException('id not include'));
            let response = await this.posts.deleteOne({_id: postId});
            if(!response) return rejects(new NotFoundException('Post not found'));
            return resolve(response ? true : false);
        });
    }
}
