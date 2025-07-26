import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsOptional, IsBoolean, IsString } from 'class-validator';

export class FilterBookDto {
  @ApiProperty({ required: false, example: 'Fantastique' })
  @IsOptional()
  @IsString()
  genre?: string;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value;
  })
  available?: boolean;

  @ApiProperty({ required: false, example: 'Charles Perrault' })
  @IsOptional()
  @IsString()
  author?: string;
}
