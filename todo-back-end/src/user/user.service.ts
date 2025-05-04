import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { Constants } from '../utils/constants';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    console.log('newUser:', newUser);
    newUser.role = Constants.ROLES.NORMAL_ROLE;
    return await this.userRepository.save(newUser);
  }

  findUserById(id: number) {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  findAll() {
    return this.userRepository.find();
  }

  findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
