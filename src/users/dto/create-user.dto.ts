import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    required: true,
    description: 'Le nom doit avoir au moins 3 caractères',
    example: 'John Doe',
  })
  @IsNotEmpty({ message: 'Le nom est obligatoire' })
  @MinLength(3, { message: 'Le nom doit avoir au moins 3 caractères' })
  name: string;

  @ApiProperty({
    required: true,
    description: "L'email doit avoir un format valide",
    example: 'john@example.com',
  })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  @IsEmail()
  email: string;

  @ApiProperty({
    required: true,
    description: 'Le mot de passe doit avoir au moins 6 caractères',
    example: 'password123',
  })
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  @MinLength(6, { message: 'Le mot de passe doit avoir au moins 6 caractères' })
  password: string;
}
