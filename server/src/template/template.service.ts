import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTemplateDto } from './dto/create-template.dto';
import { UpdateTemplateDto } from './dto/update-template.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from './entities/template.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TemplateService {
    constructor(
        @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
    ) {}

    async create(createTemplateDto: CreateTemplateDto, id: number) {
        const templateExist = await this.templateRepository.findOne({
            where: {
                title: createTemplateDto.title,
            },
        });

        if (templateExist) throw new BadRequestException('This Template Already Exist');

        const newTemplate = {
            ...createTemplateDto,
            user: { id },
            tags: [{ id: +createTemplateDto.tags }]
        };

        return await this.templateRepository.save(newTemplate);
    }

    async findAll(id: number) {
        return await this.templateRepository.find({
            where: {
                user: { id },
            },
            relations: {
                user: true,
                tags: true,
                templateLikes: true
            }
        });
    }

    async findOne(id: number) {
        return await this.templateRepository.findOne({
            where: { id },
            relations: {
                user: true,
                tags: true,
                templateLikes: true
            },
        });
    }

    async update(id: number, updateTemplateDto: UpdateTemplateDto) {
        const template = await this.templateRepository.findOne({
            where: { id },
        });

        if (!template) throw new BadRequestException("Can't Find The Template To Edit");

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