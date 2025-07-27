import { ApiProperty } from '@nestjs/swagger';

export class LoanDto {
  @ApiProperty({
    example: 1,
    description: 'Identifiant du prêt',
  })
  id: number;

  @ApiProperty({
    example: '2025-07-26',
    description: 'Date de début du prêt (format ISO)',
    type: String,
  })
  start_date: Date;

  @ApiProperty({
    example: '2025-08-02',
    description: 'Date de fin du prêt (format ISO)',
    type: String,
  })
  end_date: Date;

  @ApiProperty({
    example: false,
    description: 'Indique si le livre a été rendu',
  })
  returned: boolean;
}
