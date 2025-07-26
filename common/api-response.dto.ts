import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T> {
  @ApiProperty({ default: true })
  success: boolean;

  @ApiProperty({ example: 'Opération réussie' })
  message: string;

  @ApiProperty({
    required: false,
    oneOf: [
      {
        type: 'object',
        example: {
          id: 1,
          title: 'Clean Code',
          author: 'Robert C. Martin',
          available: true,
        },
      },
      {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            id: { type: 'number', example: 1 },
            title: { type: 'string', example: 'Clean Code' },
            author: { type: 'string', example: 'Robert C. Martin' },
            available: { type: 'boolean', example: true },
          },
        },
        example: [
          {
            id: 1,
            title: 'Clean Code',
            author: 'Robert C. Martin',
            available: true,
          },
          {
            id: 2,
            title: 'The Pragmatic Programmer',
            author: 'Andrew Hunt',
            available: false,
          },
        ],
      },
    ],
  })
  data?: T;
}
