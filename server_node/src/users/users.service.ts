import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ObjectID } from 'mongodb';

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
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
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

  async update(id: string, updateUserDto: UpdateUserDto) {
    const exists =
      ObjectID.isValid(id) && (await this.userRepository.findOne(id));
    if (!exists) {
      throw new NotFoundException();
    }
    await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
