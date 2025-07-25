import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ required: true, example: 2 })
  @IsNotEmpty({ message: "L'id de la bibliothèque est obligatoire" })
  @IsNumber()
  library_id: number;

  @ApiProperty({ required: true, example: 'Le petit prince' })
  @IsNotEmpty({ message: 'Le titre est obligatoire' })
  @IsString({ message: 'Le titre doit etre une chaîne de caractères' })
  title: string;

  @ApiProperty({ required: true, example: 'Charles Perrault' })
  @IsNotEmpty({ message: "L'auteur est obligatoire" })
  @IsString({ message: "L'auteur doit etre une chaîne de caractères" })
  author: string;

  @ApiProperty({
    required: false,
    example: 'Le petit prince est une histoire fantastique',
  })
  @IsOptional()
  resume: string;

  @ApiProperty({ required: true, example: 'Fantastique' })
  @IsNotEmpty({ message: 'Le genre est obligatoire' })
  @IsString({ message: 'Le genre doit etre une chaîne de caractères' })
  genre: string;

  @ApiProperty({ required: false, example: true })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value: value }: { value: boolean | undefined }) => {
    if (value !== undefined) return value;
    return true;
  })
  available: boolean;
}
