import { Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { TemplateLikesService } from './template_likes.service';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('template-likes')
export class TemplateLikesController {

    constructor(private readonly templateLikesService: TemplateLikesService) {}

    @Get('all-likes')
    allLikes() {
        return this.templateLikesService.allLikes()
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.templateLikesService.findAll(+req.user.id)
    }

    @Get(':id')
    findOne(@Param('id') id: number) {
        return this.templateLikesService.findOne(id)
    }

    @Get('count/:templateId')
    count(@Param('templateId') templateId: number) {
        return this.templateLikesService.countLikes(templateId);
    }

    @Post(':templateId')
    @UseGuards(JwtAuthGuard)
    likeTemplate(@Param('templateId') templateId: number, @Req() req) {
        return this.templateLikesService.likeTemplate(+req.user.id, +templateId);
    }

    @Delete(':templateId')
    @UseGuards(JwtAuthGuard)
    unlikeTemplate(@Param('templateId') templateId: number, @Req() req ) {
        console.log('DELETE /:templateId called with token:', req.user);
        return this.templateLikesService.unlikeTemplate(+templateId, +req.user.id);
    }
}   