import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTemplateResponseDto } from './dto/create-template-response.dto';
import { UpdateTemplateResponseDto } from './dto/update-template-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateResponse } from './entities/template-response.entity';
import { Repository } from 'typeorm';
import { Template } from 'src/template/entities/template.entity';

@Injectable()
export class TemplateResponseService {

    constructor(
        @InjectRepository(TemplateResponse) private readonly templateResponseRepository: Repository<TemplateResponse>,
        @InjectRepository(Template) private readonly templateRepository: Repository<Template>
    ) {}    

    async findAll(id: number) {
        return this.templateResponseRepository.find({
            where: {
                user: { id }
            },
            relations: {
                template: true,
                user: true
            }
        });
    }

    async findOne(id: number) {
        return await this.templateResponseRepository.findOne({
            where: { id },
            relations: {
                template: true,
                user: true
            }
        });
    }

    async create(createTemplateResponseDto: CreateTemplateResponseDto, userId: number) {
        const { templateId, answers } = createTemplateResponseDto;
    
        const template = await this.templateRepository.findOne({ where: { id: templateId } });
        if (!template) {
            throw new BadRequestException('Template not found');
        }
    
        const existingResponse = await this.templateResponseRepository.findOne({
            where: {
                template: { id: templateId },
                user: { id: userId }
            }
        });
    
        if (existingResponse) {
            throw new BadRequestException("You Have Filled This Form");
        }
    
        const newResponse = this.templateResponseRepository.create({
            answers,
            user: { id: userId },
            template
        });
    
        return await this.templateResponseRepository.save(newResponse);
    }

    async update(id: number, updateTemplateResponseDto: UpdateTemplateResponseDto) {
        const templateResponse = await this.templateResponseRepository.findOne({
            where: { id }
        });
    
        if (!templateResponse) throw new BadRequestException("Can't Find The Form To Update");
    
        const { templateId, answers } = updateTemplateResponseDto;
    
        const updateData: any = { answers };
    
        if (templateId) {
            updateData.template = { id: templateId };
        }
    
        return await this.templateResponseRepository.update(id, updateData);
    }

    async remove(id: number) {
        const templateResponse = this.templateResponseRepository.findOne({
            where: { id }
        })

        if (!templateResponse) throw new BadRequestException("Can't Find The Form To Delete")

        return await this.templateResponseRepository.delete(id)
    }
}