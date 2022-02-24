import { Controller, Post, UploadedFile, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { archivo } from 'src/interfaces/posts.interface';
// import { FILE_FOLDER } from 'src/main';

@Controller('files')
export class FilesController {
  constructor(
  ){}
    @Post("uploadSingle")
    @UseInterceptors(FileInterceptor("file", {
      storage: diskStorage({destination: join(__dirname,'..','uploads'),filename: (req,file, callback) => {
        const date = new Date;
        callback(null,  `${date.getDay()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${file.originalname}`)
      }}),
    }))
    uploadSingle(@UploadedFile() file:Express.Multer.File) {
      try {
        const date = new Date;
        return ({
          filename: `${date.getDay()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${file.originalname}`,
          name: file.originalname,
          mimetype: file.mimetype
        });
      } catch (error) {
        return({message: 'Error al recuperar archivo', error: error});
      }
    }
  
    @Post("uploadMultiple")
    @UseInterceptors(FilesInterceptor("files[]", 25,{
      storage: diskStorage({destination: join(__dirname,'..','uploads'),filename: (req,file, callback) => {
        const date = new Date;
        callback(null,  `${date.getDay()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${file.originalname}`)
      }}),
    }))
    uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
      try {
        const date = new Date;
        const filenames:archivo[] = files.map((file) => {
          return ({
            filename: `${date.getDay()}${date.getMonth()}${date.getFullYear()}${date.getHours()}${date.getMinutes()}${file.originalname}`,
            name: file.originalname,
            mimetype: file.mimetype
          });
        });
        console.log(filenames)
        return(filenames);
      } catch (error) {
        return({message: 'Error al recuperar archivo', error: error});
      }
    }
}
