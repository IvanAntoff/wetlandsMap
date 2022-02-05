import { Controller, Get, NotFoundException, Param, Post, Response, StreamableFile, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { archivo } from 'src/interfaces/posts.interface';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    private fileService: FilesService
  ){}
    @Post("uploadSingle")
    @UseInterceptors(FileInterceptor("file", {
      storage: diskStorage({destination: './uploads',filename: (req,file, callback) => {
        const date = new Date;
        callback(null,  `${date.getDay()}${date.getMonth()}${date.getFullYear()}${file.fieldname}${file.originalname}`)
      }}),
    }))
    uploadSingle(@UploadedFile() file:Express.Multer.File) {
      try {
        const date = new Date;
        return ({
          filename: `${date.getDay()}${date.getMonth()}${date.getFullYear()}${file.fieldname}${file.originalname}`,
          name: file.originalname,
          mimetype: file.mimetype
        });
      } catch (error) {
        return({message: 'Error al recuperar archivo', error: error});
      }
    }
  
    @Post("uploadMultiple")
    @UseInterceptors(FilesInterceptor("files[]", 15, {
      storage: diskStorage({destination: './uploads'}),
    }))
    uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
      try {
        const filenames:archivo[] = files.map((file) => {
          return ({
            filename: file.filename,
            name: file.originalname,
            mimetype: file.mimetype
          });
        });
        return(filenames);
      } catch (error) {
        return({message: 'Error al recuperar archivo', error: error});
      }
    }
}
