import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { LessonsModule } from './lessons/lessons.module';
import { StudentsModule } from './students/students.module';

@Module({
  imports: [AuthModule, StudentsModule, LessonsModule],
  controllers: [AppController],
})
export class AppModule {}


