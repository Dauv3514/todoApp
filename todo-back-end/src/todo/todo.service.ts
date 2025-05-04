import { Injectable } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly userRepository: Repository<Todo>,
    private userService: UserService,
  ) {}
  async create(createTodoDto: CreateTodoDto, userId: number) {
    const newTodo = this.userRepository.create(createTodoDto);
    newTodo.date = new Date().toLocaleString();
    newTodo.completed = false;
    newTodo.user = await this.userService.findUserById(userId);
    return await this.userRepository.save(newTodo);
  }

  findAllTodoByUserNotCompleted(userId: number) {
    return this.userRepository.find({
      relations: ['user'],
      where: { user: { id: userId }, completed: false },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
