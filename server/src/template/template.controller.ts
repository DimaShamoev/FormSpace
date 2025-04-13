import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('templates')
export class TemplateController {
    constructor(private readonly templateService: TemplateService) {}

    @Get('all-templates')
    allTemplates() {
        return this.templateService.allTemplates()    
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.templateService.findAll(+req.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.templateService.findOne(+id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createTemplateDto: CreateTemplateDto, @Req() req) {
        return this.templateService.create(createTemplateDto, +req.user.id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateTemplateDto: UpdateTemplateDto) {
        return this.templateService.update(+id, updateTemplateDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.templateService.remove(+id);
    }
}
