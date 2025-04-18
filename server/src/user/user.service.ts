import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2'
import { JwtService } from '@nestjs/jwt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    async allUsers(): Promise<User[]> {
        return await this.userRepository.find()
    }

    async create(createUserDto: CreateUserDto): Promise<{ newUser: User, token: string }> {

        const userEmailExist = await this.userRepository.findOne({
            where: {
                email: createUserDto.email
            }
        })

        if (userEmailExist) throw new BadRequestException("This Email Already Exist")

        const newUser = await this.userRepository.save({
            ...createUserDto,
            password: await argon2.hash(createUserDto.password)
        })

        const token = this.jwtService.sign({
            email: createUserDto.email,
        }) 

        return { newUser, token }
    }

    async findOne(email: string): Promise<User> {
        return await this.userRepository.findOne({
            where: { email }
        })

    }

    async update(id: number, updateUserDto: UpdateUserDto) {
        const template = await this.userRepository.findOne({
            where: { id },
        });

        if (!template) throw new BadRequestException("Can't Find The Template To Edit");

        return await this.userRepository.update(id, updateUserDto);
    }
    
    async remove(id: number) {
        const user = await this.userRepository.findOne({
            where: { id },
        });

        if (!user) throw new BadRequestException("Can't Find The Template To Delete");

        return await this.userRepository.delete(+id);
    }
    
    
}
