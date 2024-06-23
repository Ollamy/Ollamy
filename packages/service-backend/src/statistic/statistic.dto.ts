import { ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';


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