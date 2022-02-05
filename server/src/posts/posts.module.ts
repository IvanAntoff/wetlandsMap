import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostSchema } from './schema/posts.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { EnumsService } from 'src/enums/enums.service';
import { EnumSchema } from 'src/enums/schema/enums.schema';
import { FilesService } from 'src/files/files.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'posts', schema: PostSchema},
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
  providers: [PostsService, EnumsService, FilesService],
  controllers: [PostsController]
})
export class PostsModule {}
