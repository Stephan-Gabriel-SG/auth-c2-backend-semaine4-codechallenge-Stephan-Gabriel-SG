import { ApiProperty } from '@nestjs/swagger';

export class LoanSlimUserDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'John Doe' })
  name: string;
}

export class LoanSlimBookDto {
  @ApiProperty({ example: 3 })
  id: number;

  @ApiProperty({ example: 'Clean Code' })
  title: string;
}

export class LoanDto {
  @ApiProperty({ example: 42 })
  id: number;

  @ApiProperty({ example: '2025-07-26' })
  start_date: Date;

  @ApiProperty({ example: '2025-07-29' })
  end_date: Date;

  @ApiProperty({ example: false })
  returned: boolean;

  @ApiProperty({ type: LoanSlimUserDto })
  user: LoanSlimUserDto;

  @ApiProperty({ type: LoanSlimBookDto })
  book: LoanSlimBookDto;
}
