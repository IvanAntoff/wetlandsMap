import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { Enum, Enums, typeEnum } from 'src/interfaces/enum.interface';
import { EnumsService } from './enums.service';

@Controller('enums')
export class EnumsController {
    constructor(
        private readonly enumsService: EnumsService
    ) {}

    @Get()
    public findAll(@Query('type') type: typeEnum): Promise<Enum[] | Enums> {
        try {
            if (!type) type = 'todos';
            return this.enumsService.enumFindAll(type);
        }
        catch (error) {
            return error
        }
    }

    @Get(':id')
    public findOne(@Param('id') id: string, @Query('type') type: typeEnum): Promise<Enum> {
        try {
            if (!type) type = 'todos';
            return this.enumsService.enumFindOne(type, id);
        }
        catch (error) {
            return error
        }
    }

    @Post()
    public create(@Body() newEnum: Enum, @Query('type') type: typeEnum): Promise<Enum> {
        try {
        if (!type) type = 'todos';
            return this.enumsService.enumCreate(type, newEnum)
        }
        catch (error) {
            return error
        }
    }
}
