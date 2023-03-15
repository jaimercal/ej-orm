import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Ola {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  nombre: string;

  @Column('float', {
    default: 0,
  })
  altura: number;
}
