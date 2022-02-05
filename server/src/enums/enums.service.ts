import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Enum, Enums, typeEnum } from 'src/interfaces/enum.interface';

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
        @InjectModel('origenes') private origenes: Model <Enum>,
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

    public async enumFindAll(type: typeEnum): Promise <Enum[] | Enums> {
        if (!type) new BadGatewayException('type not include');
        let response: Enum[] | Enums = [];
        switch(type) {
            case 'aledaños':
                response = await this.aledaños.find().lean();
                break
            case 'colores':
                response = await this.color.find().lean();
                break
            case 'departamentos':
                response = await this.departamento.find().lean();
                break
            case 'estadoinvestigaciones':
                response = await this.estadoinvestigacion.find().lean();
                break
            case 'faunas':
                response = await this.fauna.find().lean();
                break
            case 'floras':
                response = await this.flora.find().lean();
                break
            case 'fuenteamenazas':
                response = await this.fuenteamenaza.find().lean();
                break
            case 'margenes':
                response = await this.margen.find().lean();
                break
            case 'morfologias':
                response = await this.morfologia.find().lean();
                break
            case 'objetivoiniciativas':
                response = await this.objetivoiniciativa.find().lean();
                break
            case 'origenes':
                response = await this.origenes.find().lean();
                break
            case 'participantes':
                response = await this.participantes.find().lean();
                break
            case 'publicaciones':
                response = await this.publicacion.find().lean();
                break
            case 'resultadoanalises':
                response = await this.resultadoanalises.find().lean();
                break
            case 'resultadoinvestigaciones':
                response = await this.resultadoinvestigacion.find().lean();
                break
            case 'tipoamenazas':
                response = await this.tipoamenaza.find().lean();
                break
            case 'tipoanalises':
                response = await this.tipoanalises.find().lean();
                break
            case 'tipoartes':
                response = await this.tipoarte.find().lean();
                break
            case 'tipohumedales':
                response = await this.tipohumedal.find().lean();
                break
            case 'tipoiniciativas':
                response = await this.tipoiniciativa.find().lean();
                break
            case 'zonas':
                response = await this.zona.find().lean();
                break
            case 'todos':
                response = {
                    aledaños: await this.aledaños.find().lean(),
                    colores: await this.color.find().lean(),
                    departamentos: await this.departamento.find().lean(),
                    estadoinvestigaciones: await this.estadoinvestigacion.find().lean(),
                    faunas: await this.fauna.find().lean(),
                    floras: await this.flora.find().lean(),
                    fuenteamenazas: await this.fuenteamenaza.find().lean(),
                    margenes: await this.margen.find().lean(),
                    morfologias: await this.morfologia.find().lean(),
                    objetivoiniciativas: await this.objetivoiniciativa.find().lean(),
                    origenes: await this.origenes.find().lean(),
                    publicaciones: await this.publicacion.find().lean(),
                    participantes: await this.participantes.find().lean(),
                    resultadoanalises: await this.resultadoanalises.find().lean(),
                    resultadoinvestigaciones: await this.resultadoinvestigacion.find().lean(),
                    tipoamenazas: await this.tipoamenaza.find().lean(),
                    tipoanalises: await this.tipoanalises.find().lean(),
                    tipoartes: await this.tipoarte.find().lean(),
                    tipohumedales: await this.tipohumedal.find().lean(),
                    tipoiniciativas: await this.tipoiniciativa.find().lean(),
                    zonas: await this.zona.find().lean()
                }
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
            case 'origenes':
                response = await this.origenes.findById(id);
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
            case 'origenes':
                response = await this.origenes.create();
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
