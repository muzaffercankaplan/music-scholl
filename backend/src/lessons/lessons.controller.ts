import { Controller, Get } from '@nestjs/common';

@Controller('lessons')
export class LessonsController {
  @Get()
  list() {
    return [
      { id: 'l1', studentId: '1', teacherId: 't1', room: 'A1' },
      { id: 'l2', studentId: '2', teacherId: 't2', room: 'B2' },
    ];
  }
}


