import { Controller, Get, Post, Body, Patch, Param, Delete, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { TagService } from './tag.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Tag } from './entities/tag.entity';

@Controller('tags')
export class TagController {
    constructor(private readonly tagService: TagService) {}

    @Post()
    @UsePipes(new ValidationPipe())
    @UseGuards(JwtAuthGuard)
    // Create Tag issue add -> { title: string; user: { id: number; }; template: { id: number; }; } <- if need 
    create(@Body() createTagDto: CreateTagDto, @Req() req): Promise<Tag> {
        return this.tagService.create(createTagDto, +req.user.id);
    }

    @Get('all-tags')
    allTags() {
        return this.tagService.allTags()
    }

    @Get()
    @UseGuards(JwtAuthGuard)
    findAll(@Req() req) {
        return this.tagService.findAll(+req.user.id);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    findOne(@Param('id') id: string) {
        return this.tagService.findOne(+id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard)
    update(@Param('id') id: string, @Body() updateTagDto: UpdateTagDto) {
        return this.tagService.update(+id, updateTagDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    remove(@Param('id') id: string) {
        return this.tagService.remove(+id);
    }
}
