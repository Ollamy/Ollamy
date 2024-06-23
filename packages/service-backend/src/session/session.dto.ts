import { ApiProperty } from '@nestjs/swagger';
import {
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';


class answerModel {
    @ApiProperty({ required: false })
    @IsUUID()
    @IsOptional()
    id?: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    data?: string;
}

export class validateQuestionSessionModel {
    @ApiProperty({ required: true })
    @IsUUID()
    questionId: string;

    @ApiProperty({ required: true, type: answerModel })
    answer: answerModel;
}
