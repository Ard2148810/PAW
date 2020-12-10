import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { SignupResponseDto } from '../auth/dto/signup-response.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { username, name, email, password } = createUserDto;
    let user = await this.findOneByUsername(username);
    if (user) {
      throw new ConflictException('User already exists.');
    }
    user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  findOneByUsername(username: string): Promise<User> {
    return this.userRepository.findOne({ username: username });
  }

  async update(username: string, updateUserDto: UpdateUserDto) {
    const user = await this.findOneByUsername(username);
    if (!user) {
      throw new NotFoundException();
    }
    await this.userRepository.update(user.id, updateUserDto);
  }

  async remove(username: string): Promise<void> {
    const user = await this.findOneByUsername(username);
    await this.userRepository.delete(user.id);
  }
}
