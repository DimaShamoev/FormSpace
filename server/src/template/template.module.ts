import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';
import { User } from 'src/user/entities/user.entity';
import { TemplateLike } from 'src/template_likes/entities/template_like.entity';
import { TemplateResponse } from 'src/template-response/entities/template-response.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Template, User, TemplateLike, TemplateResponse, Tag])],
    controllers: [TemplateController],
    providers: [TemplateService],
    exports: [TemplateService]
})
export class TemplateModule {}
