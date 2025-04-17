import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Template } from 'src/template/entities/template.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Tag, Template])],
    controllers: [TagController],
    providers: [TagService],
})
export class TagModule {}
