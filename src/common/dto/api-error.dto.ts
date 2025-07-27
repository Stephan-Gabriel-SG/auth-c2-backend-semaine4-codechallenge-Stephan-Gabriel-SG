import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ default: false })
  success: boolean;

  @ApiProperty()
  code: string;

  @ApiProperty()
  message: string;
}
