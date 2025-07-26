import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto<T> {
  @ApiProperty({ default: false })
  success: boolean;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;

  @ApiProperty({ required: false })
  data?: T;
}
