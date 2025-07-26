import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateLoanDto {
  @ApiProperty({
    example: 1,
    description: 'Identifiant du livre à emprunter',
  })
  @IsNotEmpty({ message: "L'id du livre est obligatoire" })
  @IsNumber()
  book_id: number;

  @ApiProperty({
    example: 2,
    description: "Identifiant de l'utilisateur emprunteur",
  })
  @IsNotEmpty({ message: "L'id de l'utilisateur est obligatoire" })
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: '2025-07-26',
    description: 'Date de début du prêt (format ISO)',
    type: String,
  })
  @IsNotEmpty()
  @IsDateString()
  start_date: Date;

  @ApiProperty({
    example: '2025-08-02',
    description: 'Date de fin du prêt (format ISO)',
    type: String,
  })
  @IsNotEmpty()
  @IsDateString()
  end_date: Date;

  @ApiProperty({
    example: false,
    description: 'Indique si le livre a été rendu',
  })
  @IsOptional()
  @Transform(({ value }) => {
    if (value == 'true' || value == '1') return true;
    if (value == 'false' || value == '0') return false;
    return false;
  })
  returned: boolean;
}
