import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TagService {

    constructor(
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>
    ) {}

    async findAll(id: number) {
        return await this.tagRepository.find({
            where: {
                user: { id },
            },
            relations: {
                user: true,
                template: true
            }
        });
    }

    async findOne(id: number) {
        return await this.tagRepository.findOne({
            where: { id },
            relations: {
                user: true,
                template: true
            }
        });
    }

    async create(createTagDto: CreateTagDto, userId: number) {
        const tagExist = await this.tagRepository.find({
            where: {
                user: { id: userId },
                title: createTagDto.title
            }
        });
    
        if (tagExist.length) throw new BadRequestException("This Tag Already Exist");
    
        const template = await this.tagRepository.findOne({
            where: { id: createTagDto.templateId },
        });
    
        if (!template) throw new BadRequestException("Template not found");
    
        const newTag = {
            title: createTagDto.title,
            user: { id: userId },
            template: { id: createTagDto.templateId },
        };
    
        return await this.tagRepository.save(newTag);
    }

    async update(id: number, updateTagDto: UpdateTagDto) {
        const tag = await this.tagRepository.findOne({
            where: { id }
        })

        if (!tag) throw new BadRequestException("Can't Find Tag To Edit")

        return await this.tagRepository.update(id, updateTagDto)
    }

    async remove(id: number) {
        const tag = await this.tagRepository.findOne({
            where: { id }
        })

        if (!tag) throw new BadRequestException("Can't Find Tag To Remove")

        return await this.tagRepository.delete(+id)
    }
}
