import { ApiProperty } from '@nestjs/swagger';
export class UserDto {
  @ApiProperty({ required: true, example: 1 })
  id: number;

  @ApiProperty({
    required: true,
    description: 'Le nom doit avoir au moins 3 caractères',
    example: 'John Doe',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: "L'email doit avoir un format valide",
    example: 'john@example.com',
  })
  email: string;

  @ApiProperty({
    required: true,
    example: '2022-01-01T00:00:00.000Z',
  })
  created_at: Date;
}
