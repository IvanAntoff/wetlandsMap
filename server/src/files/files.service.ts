import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { existsSync } from 'fs';
import { FILE_FOLDER, URL_SV } from 'src/main';

@Injectable()
export class FilesService {
    constructor(){
    }
    getFileUrl(filename): string {
        if(!existsSync(join(FILE_FOLDER,filename))) return undefined;
        const path = (URL_SV+filename);
        return (path);
    }
 
    getFilesUrl(filesName: string[]): string[] {
        if(!Array.isArray(filesName)) return [];
        const url: string[] = [];
        filesName.forEach(filename => {
            const path = this.getFileUrl(filename);
            if(path) url.push(path);
        });
        return url;
    }
}
