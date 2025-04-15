import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUser } from './dto/register.dto';
import { LoginUser } from './dto/login.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('signup')
    async signUp(@Body() body: RegisterUser) {
        return this.authService.signUp(body);
    }
    @Post('login')
    async login(@Body() body: LoginUser) {
        return this.authService.login(body);
    }
}
