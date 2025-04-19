import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { Template } from 'src/template/entities/template.entity';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CommentService {

    constructor(
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Template) private readonly templateRepository: Repository<Template>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async allComments() {
        return await this.commentRepository.find({
            relations: {
                user: true,
                template: true,
            }
        })
    }
    
    async findAll(userId: number) {
        return await this.commentRepository.find({
            where: {
                user: {id: userId}
            },
            relations: {
                user: true,
                template: true
            }
        });
    }
    
    async findOne(id: number) {
        return await this.commentRepository.findOne({
            where: { id },
            relations: {
                user: true,
                template: true
            }
        })
    }
    
    async create(createCommentDto: CreateCommentDto, templateId, userId: number) {
        const newComment = {
            ...createCommentDto,
            user: { id: userId },
            template: { id: templateId }
        }

        return await this.commentRepository.save(newComment)
    }

    async update(id: number, updateCommentDto: UpdateCommentDto) {
        const editComment = {
            ...updateCommentDto,
        }

        return await this.commentRepository.update(id, updateCommentDto)
    }

    async remove(id: number) {
        return await this.commentRepository.delete(id)
    }
}
