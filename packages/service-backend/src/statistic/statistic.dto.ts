import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, isUUID, IsUUID } from 'class-validator';

export enum StatisticType {
  STUDENT = 'STUDENT',
  COURSE = 'COURSE',
  SECTION = 'SECTION',
  LESSON = 'LESSON',
}

export enum StatisticOperation {
  AVERAGE = 'AVERAGE',
  MAX = 'MAX',
  MIN = 'MIN',
  ALL = 'ALL',
}

export class GradeStatisticModel {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  average?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  min?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  max?: number;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  title?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  firstname?: string;

  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  lastname?: string;
}

export class UserGradeStatisticModel extends GradeStatisticModel {}
export class CourseGradeStatisticModel extends GradeStatisticModel {}
export class SectionGradeStatisticModel extends GradeStatisticModel {}
export class LessonGradeStatisticModel extends GradeStatisticModel {}


export class Session {
  @ApiProperty()
  @IsNumber()
  correctAnswers: number

  @ApiProperty()
  @IsNumber()
  totalQuestions: number

  @ApiProperty()
  @IsNumber()
  timeTakenInSeconds: number
}

export class CourseUserStatistic {
  @ApiProperty()
  @IsUUID()
  lessonId: string

  @ApiProperty()
  @IsString()
  title: string

  @ApiProperty()
  @IsNumber()
  average: number

  @ApiProperty()
  @IsNumber()
  max: number

  @ApiProperty()
  @IsNumber()
  min: number

  @ApiProperty({type: [Session]})
  sessions: Session[]
}
