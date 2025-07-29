import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Researcher } from '../../researcher/entities/researcher.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  status: string;

  @Column({ type: 'jsonb' })
  geometry: any;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Researcher, (researcher) => researcher.projects, {
    eager: true,
  })
  researcher: Researcher;
}
