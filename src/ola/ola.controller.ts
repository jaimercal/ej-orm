import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OlaService } from './ola.service';
import { CreateOlaDto } from './dto/create-ola.dto';
import { UpdateOlaDto } from './dto/update-ola.dto';

@Controller('ola')
export class OlaController {
  constructor(private readonly olaService: OlaService) {}

  @Post()
  create(@Body() createOlaDto: CreateOlaDto) {
    return this.olaService.create(createOlaDto);
  }

  @Get()
  findAll() {
    return this.olaService.findAll();
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.olaService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOlaDto: UpdateOlaDto) {
    return this.olaService.update(id, updateOlaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.olaService.remove(id);
  }
}
