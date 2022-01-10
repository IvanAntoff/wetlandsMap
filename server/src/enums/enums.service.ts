import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enum, typeEnum } from 'src/interfaces/enum.interface';

@Injectable()
export class EnumsService {
    constructor(
        @InjectModel('aledaños') private aledaños: Model <Enum>,
        @InjectModel('colores') private color: Model <Enum>,
        @InjectModel('departamentos') private departamento: Model <Enum>,
        @InjectModel('estadoinvestigaciones') private estadoinvestigacion: Model <Enum>,
        @InjectModel('faunas') private fauna: Model <Enum>,
        @InjectModel('floras') private flora: Model <Enum>,
        @InjectModel('fuenteamenazas') private fuenteamenaza: Model <Enum>,
        @InjectModel('margenes') private margen: Model <Enum>,
        @InjectModel('morfologias') private morfologia: Model <Enum>,
        @InjectModel('objetivoiniciativas') private objetivoiniciativa: Model <Enum>,
        @InjectModel('origenamenazas') private origenamenaza: Model <Enum>,
        @InjectModel('participantes') private participantes: Model <Enum>,
        @InjectModel('publicaciones') private publicacion: Model <Enum>,
        @InjectModel('resultadoanalises') private resultadoanalises: Model <Enum>,
        @InjectModel('resultadoinvestigaciones') private resultadoinvestigacion: Model <Enum>,
        @InjectModel('tipoamenazas') private tipoamenaza: Model <Enum>,
        @InjectModel('tipoanalises') private tipoanalises: Model <Enum>,
        @InjectModel('tipoartes') private tipoarte: Model <Enum>,
        @InjectModel('tipohumedales') private tipohumedal: Model <Enum>,
        @InjectModel('tipoiniciativas') private tipoiniciativa: Model <Enum>,
        @InjectModel('zonas') private zona: Model <Enum>,
    ) {}

    public async enumFindAll(type: typeEnum): Promise <Enum[]> {
        if (!type) new BadGatewayException('type not include');
        let response = [];
        switch(type) {
            case 'aledaños':
                response = await this.aledaños.find();
                break
            case 'colores':
                response = await this.color.find();
                break
            case 'departamentos':
                response = await this.departamento.find();
                break
            case 'estadoinvestigaciones':
                response = await this.estadoinvestigacion.find();
                break
            case 'faunas':
                response = await this.fauna.find();
                break
            case 'floras':
                response = await this.flora.find();
                break
            case 'fuenteamenazas':
                response = await this.fuenteamenaza.find();
                break
            case 'margenes':
                response = await this.margen.find();
                break
            case 'morfologias':
                response = await this.morfologia.find();
                break
            case 'objetivoiniciativas':
                response = await this.objetivoiniciativa.find();
                break
            case 'origenamenazas':
                response = await this.origenamenaza.find();
                break
            case 'participantes':
                response = await this.participantes.find();
                break
            case 'publicaciones':
                response = await this.publicacion.find();
                break
            case 'resultadoanalises':
                response = await this.resultadoanalises.find();
                break
            case 'resultadoinvestigaciones':
                response = await this.resultadoinvestigacion.find();
                break
            case 'tipoamenazas':
                response = await this.tipoamenaza.find();
                break
            case 'tipoanalises':
                response = await this.tipoanalises.find();
                break
            case 'tipoartes':
                response = await this.tipoarte.find();
                break
            case 'tipohumedales':
                response = await this.tipohumedal.find();
                break
            case 'tipoiniciativas':
                response = await this.tipoiniciativa.find();
                break
            case 'zonas':
                response = await this.zona.find();
                break
            case 'todos':
                response = await this.aledaños.find();
                response = response.concat(await this.color.find());
                response = response.concat(await this.departamento.find());
                response = response.concat(await this.estadoinvestigacion.find());
                response = response.concat(await this.fauna.find());
                response = response.concat(await this.flora.find());
                response = response.concat(await this.fuenteamenaza.find());
                response = response.concat(await this.margen.find());
                response = response.concat(await this.morfologia.find());
                response = response.concat(await this.objetivoiniciativa.find());
                response = response.concat(await this.origenamenaza.find());
                response = response.concat(await this.participantes.find());
                response = response.concat(await this.publicacion.find());
                response = response.concat(await this.resultadoanalises.find());
                response = response.concat(await this.resultadoinvestigacion.find());
                response = response.concat(await this.tipoamenaza.find());
                response = response.concat(await this.tipoanalises.find());
                response = response.concat(await this.tipoarte.find());
                response = response.concat(await this.tipohumedal.find());
                response = response.concat(await this.tipoiniciativa.find());
                response = response.concat(await this.zona.find());
                break;
        }
        return response;
    }
    
    public async enumFindOne(type: typeEnum, id: string): Promise<Enum> {
        if (!type || !id) new BadGatewayException('id or type not include');
        let response:Enum = null;
        switch(type) {
            case 'aledaños':
                response = await this.aledaños.findById(id);
                break
            case 'colores':
                response = await this.color.findById(id);
                break
            case 'departamentos':
                response = await this.departamento.findById(id);
                break
            case 'estadoinvestigaciones':
                response = await this.estadoinvestigacion.findById(id);
                break
            case 'faunas':
                response = await this.fauna.findById(id);
                break
            case 'floras':
                response = await this.flora.findById(id);
                break
            case 'fuenteamenazas':
                response = await this.fuenteamenaza.findById(id);
                break
            case 'margenes':
                response = await this.margen.findById(id);
                break
            case 'morfologias':
                response = await this.morfologia.findById(id);
                break
            case 'objetivoiniciativas':
                response = await this.objetivoiniciativa.findById(id);
                break
            case 'origenamenazas':
                response = await this.origenamenaza.findById(id);
                break
            case 'participantes':
                response = await this.participantes.findById(id);
                break
            case 'publicaciones':
                response = await this.publicacion.findById(id);
                break
            case 'resultadoanalises':
                response = await this.resultadoanalises.findById(id);
                break
            case 'resultadoinvestigaciones':
                response = await this.resultadoinvestigacion.findById(id);
                break
            case 'tipoamenazas':
                response = await this.tipoamenaza.findById(id);
                break
            case 'tipoanalises':
                response = await this.tipoanalises.findById(id);
                break
            case 'tipoartes':
                response = await this.tipoarte.findById(id);
                break
            case 'tipohumedales':
                response = await this.tipohumedal.findById(id);
                break
            case 'tipoiniciativas':
                response = await this.tipoiniciativa.findById(id);
                break
            case 'zonas':
                response = await this.zona.findById(id);
                break
            case 'todos':
                new BadGatewayException("You must specify type to create an enum")
        }
        if (!response) {
          throw new NotFoundException('Enum not found.');
        }
        return response;
    }

    public async enumCreate(type: typeEnum, newEnum: Enum): Promise <Enum> {
        if (!newEnum || !newEnum.name || !type) new BadGatewayException('Name or type not include')
        let response = null; 
        switch(type) {
            case 'aledaños':
                response = await this.aledaños.create();
                break
            case 'colores':
                response = await this.color.create();
                break
            case 'departamentos':
                response = await this.departamento.create();
                break
            case 'estadoinvestigaciones':
                response = await this.estadoinvestigacion.create();
                break
            case 'faunas':
                response = await this.fauna.create();
                break
            case 'floras':
                response = await this.flora.create();
                break
            case 'fuenteamenazas':
                response = await this.fuenteamenaza.create();
                break
            case 'margenes':
                response = await this.margen.create();
                break
            case 'morfologias':
                response = await this.morfologia.create();
                break
            case 'objetivoiniciativas':
                response = await this.objetivoiniciativa.create();
                break
            case 'origenamenazas':
                response = await this.origenamenaza.create();
                break
            case 'participantes':
                response = await this.participantes.create();
                break
            case 'publicaciones':
                response = await this.publicacion.create();
                break
            case 'resultadoanalises':
                response = await this.resultadoanalises.create();
                break
            case 'resultadoinvestigaciones':
                response = await this.resultadoinvestigacion.create();
                break
            case 'tipoamenazas':
                response = await this.tipoamenaza.create();
                break
            case 'tipoanalises':
                response = await this.tipoanalises.create();
                break
            case 'tipoartes':
                response = await this.tipoarte.create();
                break
            case 'tipohumedales':
                response = await this.tipohumedal.create();
                break
            case 'tipoiniciativas':
                response = await this.tipoiniciativa.create();
                break
            case 'zonas':
                response = await this.zona.create();
                break
            case 'todos':
                new BadGatewayException("You must specify type to create an enum");
        }
        return response;
    }
}
