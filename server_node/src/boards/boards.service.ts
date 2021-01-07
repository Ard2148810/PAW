import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { UsersService } from '../users/users.service';
import { createCipher, createDecipher } from 'crypto';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
  ) {}

  async create(username: string, createBoardDto: CreateBoardDto) {
    const { name, description } = createBoardDto;
    const board = await this.boardRepository.create({
      name: name,
      description: description,
      owner: username,
      teamMembers: [username],
      isPublic: false,
      lists: [],
      labels: [],
    });
    return await this.boardRepository.save(board);
  }

  findAll(username: string) {
    return this.boardRepository.find({
      where: {
        teamMembers: { $in: [username] },
      },
    });
  }

  async findOne(username: string, id: string) {
    const board = await this.boardRepository.findOne(id, {
      where: {
        teamMembers: { $in: [username] },
      },
    });
    if (!board) {
      throw new NotFoundException('Board not found');
    } else return board;
  }

  async findOnePublic(encryptedId: string) {
    const id = this.decipher(encryptedId);
    const board = await this.boardRepository.findOne(id);
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    if (!board.isPublic) {
      throw new BadRequestException('Board is not public');
    }
    return board;
  }

  async update(username: string, id: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.findOne(id, {
      where: {
        teamMembers: { $in: [username] },
      },
    });
    if (!board) {
      throw new NotFoundException('Board not found');
    }
    return await this.boardRepository.update(id, updateBoardDto);
  }

  async remove(username: string, id: string) {
    this.boardRepository
      .findOne(id, {
        where: {
          teamMembers: { $in: [username] },
        },
      })
      .then(async (board) => {
        if (!board) {
          throw new NotFoundException('Board not found');
        }
        if (board.owner != username) {
          throw new BadRequestException('Only owner can delete a board');
        }
        return await this.boardRepository.delete(id);
      });
  }

  async removeAll(username: string) {
    this.boardRepository
      .find({
        where: {
          owner: { $in: [username] },
        },
      })
      .then(async (boards) => {
        for (const board of boards) {
          await this.remove(username, board.id);
        }
      });
  }

  async updateTeamMembers(username: string) {
    this.boardRepository
      .find({
        where: {
          teamMembers: { $in: [username] },
        },
      })
      .then(async (boards) => {
        for (const board of boards) {
          await this.removeUser(username, board.id, username);
        }
      });
  }

  async addUser(username: string, id: string, newUser: string) {
    await this.boardRepository
      .findOne(id, {
        where: {
          teamMembers: { $in: [username] },
        },
      })
      .then(async (board) => {
        if (!board) {
          throw new NotFoundException('Board not found');
        }
        const user = await this.userService.findOneByUsername(newUser);
        if (!user) {
          throw new NotFoundException('User not found');
        }
        if (board.teamMembers.includes(user.username)) {
          throw new BadRequestException('User already belongs to the board');
        }
        board.teamMembers.push(user.username);
        await this.boardRepository.update(board.id, board);
        return board.teamMembers;
      });
  }

  async removeUser(username: string, id: string, teamMember: string) {
    await this.boardRepository
      .findOne(id, {
        where: {
          teamMembers: { $in: [username] },
        },
      })
      .then(async (board) => {
        if (!board) {
          throw new NotFoundException('Board not found');
        }
        await this.userService
          .findOneByUsername(teamMember)
          .then(async (user) => {
            if (!user) {
              throw new NotFoundException('User not found');
            }
            if (board.owner == user.username) {
              throw new BadRequestException(
                'Owner cannot be deleted from the board',
              );
            }
            board.teamMembers.splice(
              board.teamMembers.indexOf(user.username),
              1,
            );
            await this.boardRepository.update(board.id, board);
            return board.teamMembers;
          });
      });
  }

  generateLink(board: Board) {
    if (!board.isPublic) {
      throw new BadRequestException('Board is not public');
    }
    return this.encrypt(board.id);
  }

  encrypt(id: string) {
    const cipher = createCipher('aes-256-ctr', `'${process.env.AES_KEY}'`);

    return Buffer.concat([
      cipher.update(id.toString()),
      cipher.final(),
    ]).toString('base64');
  }

  decipher(encryptedId: string) {
    const decipher = createDecipher('aes-256-ctr', `'${process.env.AES_KEY}'`);
    const buffer = Buffer.from(encryptedId, 'base64');

    return Buffer.concat([
      decipher.update(buffer),
      decipher.final(),
    ]).toString();
  }
}
