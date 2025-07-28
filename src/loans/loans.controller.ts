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
  ApiExtraModels,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'common/dto/api-response.dto';
import { ErrorResponseDto } from 'common/dto/api-error.dto';
import { LoanDto } from './dto/loan.dto';

@ApiTags('Loans')
@Controller('loans')
export class LoansController {
  constructor(private readonly loansService: LoansService) {}

  @Post()
  @ApiOperation({ summary: 'Créer un prêt' })
  @ApiBody({ type: CreateLoanDto })
  @ApiExtraModels(SuccessResponseDto, LoanDto)
  @ApiResponse({
    status: 201,
    description: 'Prêt créé avec succès',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LoanDto) },
            },
          },
        },
      ],
    },
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
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LoanDto) },
            },
          },
        },
      ],
    },
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
  @ApiExtraModels(SuccessResponseDto, LoanDto)
  @ApiResponse({
    status: 200,
    description: 'Prêt trouvé',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LoanDto) },
            },
          },
        },
      ],
    },
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
  @ApiExtraModels(SuccessResponseDto, LoanDto)
  @ApiResponse({
    status: 201,
    description: 'Mettre un pret a jour',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LoanDto) },
            },
          },
        },
      ],
    },
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
  @ApiExtraModels(SuccessResponseDto, LoanDto)
  @ApiResponse({
    status: 201,
    description: 'Prêt supprimé',
    schema: {
      allOf: [
        { $ref: getSchemaPath(SuccessResponseDto) },
        {
          properties: {
            data: {
              type: 'array',
              items: { $ref: getSchemaPath(LoanDto) },
            },
          },
        },
      ],
    },
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
