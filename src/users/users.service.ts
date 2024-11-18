import { BadRequestException, Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {

  private readonly logger = new Logger('UsersService');

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) { }

  async create(createUserDto: CreateUserDto) {

    // TODO: Repasar estas comprobaciones para ver cual dejar finalmente
    // const userEmail = await this.findOneByEmail(createUserDto.email);

    // if (userEmail) {
    //   throw new BadRequestException('Email already exists');
    // }

    // const username = await this.findOneByUsername(createUserDto.username);

    // if (username) {
    //   throw new BadRequestException('Username already exists');
    // }
    // TODO: Fin

    try {

      const { password, ...userData } = createUserDto;

      const user = await this.userRepository.save({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      delete user.password;

      return user;
    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  findOneByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({ where: { username } });
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  private handleDBExceptions(error: any): never {

    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check server logs');
  }
  
}
