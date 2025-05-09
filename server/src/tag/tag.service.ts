import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tag.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Template } from 'src/template/entities/template.entity';

@Injectable()
export class TagService {

    constructor(
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>,
        @InjectRepository(Template) private readonly templateRepository: Repository<Template>
    ) {}

    async allTags() {
        return await this.tagRepository.find()
    }

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

    async create(createTagDto: CreateTagDto, userId: number): Promise<Tag> {
        const tagExist = await this.tagRepository.find({
            where: {
                user: { id: userId },
                title: createTagDto.title,
            },
        });
    
        if (tagExist.length) {
            throw new BadRequestException("This Tag Already Exist");
        }
    
        let template;
        if (createTagDto.templateId) {
            template = await this.templateRepository.findOne({
                where: { id: createTagDto.templateId },
            });
    
            if (!template) {
                throw new BadRequestException("Template not found");
            }
        }
    
        const newTag = {
            title: createTagDto.title,
            user: { id: userId },
            template: template ? { id: createTagDto.templateId } : null, // only add template if it exists
        };
    
        return await this.tagRepository.save(newTag);
    }
    

    async update(id: number, updateTagDto: UpdateTagDto) {
        const tag = await this.tagRepository.findOne({
            where: { id },
            relations: ['tags']
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
