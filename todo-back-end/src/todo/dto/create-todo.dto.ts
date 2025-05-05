import { IsString } from 'class-validator';

export class CreateTodoDto {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  @IsString()
  title: string;
}
