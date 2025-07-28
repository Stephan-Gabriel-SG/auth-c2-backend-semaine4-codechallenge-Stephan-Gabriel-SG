import { ApiProperty } from '@nestjs/swagger';

export class SuccessResponseDto<T> {
  @ApiProperty({ default: true })
  success: boolean;

  @ApiProperty({ example: 'Opération réussie' })
  message: string;

  @ApiProperty({
    required: true,
    isArray: true,
  })
  data?: T;
}
