import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as argon2 from 'argon2'
import { IUser } from 'src/Types/user.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findOne(email);
        const passwordCheck = await argon2.verify(user.password, password)

        if (user && passwordCheck) {
            return user
        }

        throw new UnauthorizedException("Email Or Password Are Incorrect");
    }
    
    async login(user: IUser) {
        const { id, email, role } = user

        return {
            id,
            email,
            role,
            token: this.jwtService.sign({
                id: user.id,
                email: user.email,
                role: user.role
            })
        }
    }
}