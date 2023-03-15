import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateOlaDto } from './dto/create-ola.dto';
import { UpdateOlaDto } from './dto/update-ola.dto';
import { Ola } from './entities/ola.entity';

@Injectable()
export class OlaService {
  private readonly logger = new Logger('OlaService');

  constructor(
    @InjectRepository(Ola)
    private readonly olaRepository: Repository<Ola>,

    private readonly dataSource: DataSource,
  ) {}

  async create(createOlaDto: CreateOlaDto) {
    const olaDetails = createOlaDto;

    try {
      const ola = this.olaRepository.create({ ...olaDetails });

      await this.olaRepository.save(ola);

      return ola;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findAll() {
    const olas = await this.olaRepository.find();
    return olas.map((ola) => {
      ola;
    });
  }

  async findOne(term: string) {
    let ola: Ola;

    ola = await this.olaRepository.findOneBy({ id: term });

    if (!ola) throw new NotFoundException(`Product with ${term} not found`);

    return ola;
  }

  async update(id: string, updateOlaDto: UpdateOlaDto) {
    const toUpdate = updateOlaDto;

    const ola = this.olaRepository.preload({ id, ...toUpdate });

    if (!ola) throw new NotFoundException(`Product with id: ${id} not found`);

    // Create query runner
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await queryRunner.manager.save(ola);

      await queryRunner.commitTransaction();
      await queryRunner.release();

      return this.findOne(id);
    } catch (error) {
      await queryRunner.rollbackTransaction();
      await queryRunner.release();
      this.handleDBExceptions(error);
    }
  }

  async remove(id: string) {
    const ola = await this.findOne(id);
    await this.olaRepository.remove(ola);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    this.logger.error(error);

    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
