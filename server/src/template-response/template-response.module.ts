import { Module } from '@nestjs/common';
import { TemplateResponseService } from './template-response.service';
import { TemplateResponseController } from './template-response.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateResponse } from './entities/template-response.entity';
import { Template } from 'src/template/entities/template.entity';
import { User } from 'src/user/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([TemplateResponse, Template, User])],
    controllers: [TemplateResponseController],
    providers: [TemplateResponseService],
})
export class TemplateResponseModule {}
