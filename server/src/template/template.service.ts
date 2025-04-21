import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';
import { Repository } from 'typeorm';
import { Tag } from 'src/tag/entities/tag.entity';

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
        @InjectRepository(Tag) private readonly tagRepository: Repository<Tag>
    ) {}

    async allTemplates() {
        return this.templateRepository.find({
            relations: [
                'user',
                'template_responses',
                'template_responses.user',
                'template_responses.template',
                'comments',
                'comments.user',
                'comments.template',
                'templateLikes',
                'templateLikes.user',
                'templateLikes.template',
                'tags',
                'tags.user',
                'tags.template'
            ],
        })
    }

    async findAll(id: number) {
        return await this.templateRepository.find({
            where: {
                user: { id },
            },
            relations: {
                user: true,
                tags: true,
                templateLikes: true,
                template_responses: true,
                comments: true
            }
        });
    }

    async findOne(id: number) {
        return await this.templateRepository.findOne({
            where: { id },
            relations: [
                'user',
                'template_responses',
                'template_responses.user',
                'template_responses.template',
                'comments',
                'comments.user',
                'comments.template',
                'templateLikes',
                'templateLikes.user',
                'templateLikes.template',
                'tags',
                'tags.user',
                'tags.template'
            ],
        });
    }

    async create(createTemplateDto: CreateTemplateDto, id: number) {
        const templateExist = await this.templateRepository.findOne({
            where: {
                title: createTemplateDto.title,
            },
        });
    
        if (templateExist) throw new BadRequestException('This Template Already Exist');
    
        const tags = createTemplateDto.tags ? createTemplateDto.tags.map((tagId) => ({ id: +tagId })) : [];
        const templateLikes = createTemplateDto.template_likes ? createTemplateDto.template_likes.map((likeId) => ({ id: +likeId })) : [];
    
        const newTemplate = this.templateRepository.create({
            ...createTemplateDto,
            user: { id },
            tags,
            templateLikes,
        });
    
        return await this.templateRepository.save(newTemplate);
    }
    

    async update(id: number, updateTemplateDto: UpdateTemplateDto) {
        const template = await this.templateRepository.findOne({
            where: { id },
            relations: ['tags']
        });

        if (!template) throw new BadRequestException("Can't Find The Template To Edit");

        if (updateTemplateDto.tags && updateTemplateDto.tags.length > 0) {
            template.tags = await this.tagRepository.findByIds(updateTemplateDto.tags);
        }

        return await this.templateRepository.update(id, updateTemplateDto);
    }

    async remove(id: number) {
        const template = await this.templateRepository.findOne({
            where: { id },
        });

        if (!template)
            throw new BadRequestException("Can't Find The Template To Delete");

        return await this.templateRepository.delete(+id);
    }
}