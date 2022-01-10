import { Module } from '@nestjs/common';
import { EnumsService } from './enums.service';
import { EnumsController } from './enums.controller';
import { EnumSchema } from './schema/enums.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'aledaños', schema: EnumSchema},
      {name: 'colores', schema: EnumSchema},
      {name: 'departamentos', schema: EnumSchema},
      {name: 'estadoinvestigaciones', schema: EnumSchema},
      {name: 'faunas', schema: EnumSchema},
      {name: 'floras', schema: EnumSchema},
      {name: 'fuenteamenazas', schema: EnumSchema},
      {name: 'margenes', schema: EnumSchema},
      {name: 'morfologias', schema: EnumSchema},
      {name: 'objetivoiniciativas', schema: EnumSchema},
      {name: 'origenes', schema: EnumSchema},
      {name: 'participantes', schema: EnumSchema},
      {name: 'publicaciones', schema: EnumSchema},
      {name: 'resultadoanalises', schema: EnumSchema},
      {name: 'resultadoinvestigaciones', schema: EnumSchema},
      {name: 'tipoamenazas', schema: EnumSchema},
      {name: 'tipoanalises', schema: EnumSchema},
      {name: 'tipoartes', schema: EnumSchema},
      {name: 'tipohumedales', schema: EnumSchema},
      {name: 'tipoiniciativas', schema: EnumSchema},
      {name: 'zonas', schema: EnumSchema},
    ])
  ],
  providers: [EnumsService],
  controllers: [EnumsController]
})
export class EnumsModule {}
