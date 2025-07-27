import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { LibrariesService } from './libraries.service';
import { CreateLibraryDto } from './dto/create-library.dto';
import {
  ApiBody,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SuccessResponseDto } from 'src/common/dto/api-response.dto';
import { Library } from './entities/library.entity';
import { ErrorResponseDto } from 'src/common/dto/api-error.dto';

@ApiTags('Libraries')
@Controller('libraries')
export class LibrariesController {
  constructor(private readonly librariesService: LibrariesService) {}

  @Post()
  @ApiOperation({ summary: 'Créer une nouvelle bibliothèque' })
  @ApiBody({ type: CreateLibraryDto })
  @ApiResponse({
    status: 201,
    description: 'Bibliothèque créée avec succès',
    type: SuccessResponseDto<Library>,
  })
  create(@Body() createLibraryDto: CreateLibraryDto) {
    return this.librariesService.create(createLibraryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Lister toutes les bibliothèques' })
  @ApiResponse({
    status: 200,
    description: 'Liste des bibliothèques récupérée',
    type: SuccessResponseDto<Library[]>,
  })
  findAll() {
    return this.librariesService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtenir une bibliothèque par son ID' })
  @ApiParam({
    name: 'id',
    required: true,
    description: 'Identifiant unique de la bibliothèque',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Bibliothèque trouvée',
    type: SuccessResponseDto<Library>,
  })
  @ApiNotFoundResponse({
    description: 'Bibliothèque non trouvée',
    type: ErrorResponseDto,
  })
  findOne(@Param('id') id: string) {
    return this.librariesService.findOne(+id);
  }
}
