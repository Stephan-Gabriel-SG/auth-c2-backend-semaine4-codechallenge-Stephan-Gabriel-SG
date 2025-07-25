import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLibraryDto {
  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: "L'id de l'utilisateur est obligatoire" })
  @IsNumber()
  user_id: number;

  @ApiProperty({ required: true, example: 'Bibliothèque 1', uniqueItems: true })
  @IsNotEmpty({ message: 'Le nom de la bibliothèque est obligatoire' })
  @IsString({
    message: 'Le nom de la bibliothèque doit etre une chaîne de caractères',
  })
  name: string;

  @ApiProperty({ required: true, example: 'Antananarivo' })
  @IsNotEmpty({ message: 'La localisation de la bibliothèque est obligatoire' })
  @IsString({
    message:
      'La localisation de la bibliothèque doit etre une chaîne de caractères',
  })
  location: string;
}
