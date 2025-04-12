import { BadRequestException, Injectable } from '@nestjs/common';
import { TemplateLike } from './entities/template_like.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Template } from 'src/template/entities/template.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class TemplateLikesService {
    constructor(
        @InjectRepository(TemplateLike) private readonly templateLikeRepository: Repository<TemplateLike>,
        @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
        @InjectRepository(User) private readonly userRepository: Repository<User>,
    ) {}

    async findAll(id: number) {
        return await this.templateLikeRepository.find({
            where: {
                user: { id }
            },
            relations: {
                template: true
            }
        })
    }

    async findOne(id: number) {
        return await this.templateLikeRepository.findOne({
            where: { id },
            relations: {
                template: true
            }
        })
    }

    async countLikes(templateId: number) {
        return this.templateLikeRepository.count({
          where: { template: { id: templateId } },
        });
    }

    async likeTemplate(userId: number, templateId: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
            },
        });

        const template = await this.templateRepository.findOne({
            where: {
                id: templateId,
            },
        });

        const existing = await this.templateLikeRepository.findOne({
            where: { user: { id: userId }, template: { id: templateId } },
        });

        if (!user) throw new BadRequestException("User not found");
        if (!template) throw new BadRequestException("Template not found");
        if (existing) throw new BadRequestException("Like Exist");
        
        const likeTemplate = this.templateLikeRepository.create({ user, template })

        return this.templateLikeRepository.save(likeTemplate)
    }

    async unlikeTemplate(templateID: number, userId: number) {
        return await this.templateLikeRepository.delete({
            user: {
                id: userId
            },
            template: {
                id: templateID
            }
        })
    }

}
