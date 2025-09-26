import { Controller, Get } from '@nestjs/common';

@Controller('students')
export class StudentsController {
  @Get()
  list() {
    return [
      { id: '1', name: 'Ali Yılmaz' },
      { id: '2', name: 'Ayşe Demir' },
    ];
  }
}


