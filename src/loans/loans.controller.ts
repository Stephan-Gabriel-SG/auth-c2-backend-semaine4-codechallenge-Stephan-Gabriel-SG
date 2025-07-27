import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LoansService } from './loans.service';
import { CreateLoanDto } from './dto/create-loan.dto';
import { UpdateLoanDto } from './dto/update-loan.dto';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/api-response.dto';
import { Loan } from './entities/loan.entity';
import { ErrorResponseDto } from 'src/common/dto/api-error.dto';

@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un prêt' })
  @ApiBody({ type: CreateLoanDto })
  @ApiResponse({
    status: 201,
    description: 'Prêt créé avec succès',
    type: SuccessResponseDto<Loan>,
  })
  @ApiResponse({
    status: 400,
    description: 'Erreur de validation des données',
    type: ErrorResponseDto,
  })
  create(@Body() createLoanDto: CreateLoanDto) {
    return this.loansService.create(createLoanDto);
  }

  @Get()
  @ApiOperation({ summary: 'Liste des prêts enregistrés' })
  @ApiResponse({
    status: 200,
    description: 'Liste récupérée avec succès',
    type: SuccessResponseDto<Loan[]>,
  })
  findAll() {
    return this.loansService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Récupérer un prêt par ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identifiant du prêt',
  })
  @ApiResponse({
    status: 200,
    description: 'Prêt trouvé',
    type: SuccessResponseDto<Loan>,
  })
  @ApiResponse({
    status: 404,
    description: 'Prêt non trouvé',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.loansService.findOne(+id);
  }

  @Patch(':id/return')
  @ApiOperation({ summary: 'Mettre à jour un prêt (retour)' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identifiant du prêt',
  })
  @ApiBody({ type: UpdateLoanDto })
  @ApiResponse({
    status: 200,
    description: 'Prêt mis à jour avec succès',
    type: SuccessResponseDto<Loan>,
  })
  @ApiResponse({
    status: 400,
    description: 'Données invalides ou ID incorrect',
    type: ErrorResponseDto,
  })
  update(@Param('id') id: string, @Body() updateLoanDto: UpdateLoanDto) {
    return this.loansService.update(+id, updateLoanDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Supprimer un prêt par ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'Identifiant du prêt',
  })
  @ApiResponse({
    status: 200,
    description: 'Prêt supprimé',
    type: SuccessResponseDto<Loan>,
  })
  @ApiResponse({
    status: 404,
    description: 'Prêt introuvable pour suppression',
    type: ErrorResponseDto,
  })
  remove(@Param('id') id: string) {
    return this.loansService.remove(+id);
  }
}
