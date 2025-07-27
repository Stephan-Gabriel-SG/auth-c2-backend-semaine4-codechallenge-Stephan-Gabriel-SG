import { ApiProperty } from '@nestjs/swagger';

export class BookDto {
  @ApiProperty({ required: true, example: 1 })
  id: number;

  @ApiProperty({ required: true, example: 2 })
  library_id: number;

  @ApiProperty({ required: true, example: 'Le petit prince' })
  title: string;

  @ApiProperty({ required: true, example: 'Charles Perrault' })
  author: string;

  @ApiProperty({
    required: false,
    example: 'Le petit prince est une histoire fantastique',
  })
  resume: string;

  @ApiProperty({ required: true, example: 'Fantastique' })
  genre: string;

  @ApiProperty({ required: false, example: true })
  available: boolean;

  @ApiProperty({
    required: true,
    example: '2022-01-01T00:00:00.000Z',
  })
  created_at: Date;
}
