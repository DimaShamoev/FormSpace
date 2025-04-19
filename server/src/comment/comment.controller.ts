import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from 'src/auth/Guards/jwt-auth.guard';

@Controller('comments')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Get('all-comments')
    allComments() {
        return this.commentService.allComments()
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.commentService.findAll(+req.user.id);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.commentService.findOne(+id);
    }

    @Post(':templateId')
    @UseGuards(JwtAuthGuard)
    create(@Body() createCommentDto: CreateCommentDto, @Param('templateId') templateId: number, @Req() req) {
        return this.commentService.create(createCommentDto, templateId, req.user.id, );
    }

    @Patch('edit/:id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
        return this.commentService.update(+id, updateCommentDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.commentService.remove(+id);
    }
}
