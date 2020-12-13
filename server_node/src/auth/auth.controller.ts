import { Controller, Body, UseGuards } from '@nestjs/common';
import { Post, Request } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import {
  ApiBody,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { LocalAuthGuard } from './local-auth.guard';
import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { LoginResponseDto } from './dto/login-response.dto';
import { UserResponseDto } from '../users/dto/user-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @ApiOperation({
    description: 'Generates and returns 24h valid jwt access token.',
  })
  @ApiBody({ type: LoginDto })
  @ApiCreatedResponse({ type: LoginResponseDto })
  @ApiUnauthorizedResponse({ description: 'Wrong credentials' })
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @ApiOperation({ description: 'Creates a user account.' })
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({ type: UserResponseDto })
  @ApiConflictResponse({ description: 'User already exists' })
  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.createAndReturn(createUserDto);
  }
}
