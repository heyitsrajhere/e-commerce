import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegisterUser } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginUser } from './dto/login.dto';
import { User } from 'src/db/entity/user.entity';
@Injectable()
export class AuthService {
    @InjectRepository(User) private readonly userRepo: Repository<User>
    private jwtService: JwtService;

    async signUp(body: RegisterUser) {
       const {email,name,password} = body
       const hashed = await bcrypt.hash(password, 10)
       const user = this.userRepo.create({ email,name,password })
       await this.userRepo.save(user)
       return {message: 'User created successfully'}
    }

    async login(body: LoginUser) {
        const {email,password} = body
        const findUser = await this.userRepo.findOne({where: {email}})
        const comparePassword = await bcrypt.compare(password, body.password)
        if(!findUser|| !comparePassword){
            throw new NotFoundException("Invalid credentials")
        }
        const token = this.jwtService.sign({id: findUser.id, email: findUser.email})
        return {access_token: token}
     }
}
