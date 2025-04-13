import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UsePipes, ValidationPipe, Req } from '@nestjs/common';
import { TemplateResponseService } from './template-response.service';
import { CreateTemplateResponseDto } from './dto/create-template-response.dto';
import { UpdateTemplateResponseDto } from './dto/update-template-response.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('template-responses')
export class TemplateResponseController {
    constructor(
        private readonly templateResponseService: TemplateResponseService,
    ) {}

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.templateResponseService.findAll(+req.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.templateResponseService.findOne(+id);
    }

    @Post(':templateId')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    create(@Body() createTemplateResponseDto: CreateTemplateResponseDto, @Param('templateId') templateId: number, @Req() req) {
        return this.templateResponseService.create(createTemplateResponseDto, templateId, req.user.id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateTemplateResponseDto: UpdateTemplateResponseDto) {
        return this.templateResponseService.update(+id, updateTemplateResponseDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.templateResponseService.remove(+id);
    }
}
