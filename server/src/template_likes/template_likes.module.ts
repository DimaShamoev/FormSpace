import { Module } from '@nestjs/common';
import { TemplateLikesService } from './template_likes.service';
import { TemplateLikesController } from './template_likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateLike } from './entities/template_like.entity';
import { Template } from 'src/template/entities/template.entity';
import { User } from 'src/user/entities/user.entity';
import { TemplateModule } from 'src/template/template.module';

@Module({
    imports: [TypeOrmModule.forFeature([TemplateLike, Template, User]), TemplateModule],
    controllers: [TemplateLikesController],
    providers: [TemplateLikesService],  
})
export class TemplateLikesModule {}
