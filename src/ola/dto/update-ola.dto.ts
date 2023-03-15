import { PartialType } from '@nestjs/mapped-types';
import { CreateOlaDto } from './create-ola.dto';

export class UpdateOlaDto extends PartialType(CreateOlaDto) {}
