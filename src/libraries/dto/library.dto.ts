import { ApiProperty } from '@nestjs/swagger';

export class LibraryDto {
  @ApiProperty({ required: true, example: 1 })
  id: number;

  @ApiProperty({ required: true, example: 1 })
  user_id: number;

  @ApiProperty({ required: true, example: 'Bibliothèque 1', uniqueItems: true })
  name: string;

  @ApiProperty({ required: true, example: 'Antananarivo' })
  location: string;
}
