import { ApiProperty } from '@nestjs/swagger';

export class ErrorResponseDto {
  @ApiProperty({ default: false })
  success: boolean;

  @ApiProperty({
    example:
      'NOT_FOUND_400 | BAD_REQUEST_400 | CONFLICT_409 | INTERNAL_SERVER_ERROR_500',
  })
  code: string;

  @ApiProperty({
    example:
      'Opération echouée | Livre non disponible | Une erreur est survenue',
  })
  message: string;
}
