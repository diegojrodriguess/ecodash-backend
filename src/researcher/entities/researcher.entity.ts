import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Project } from '../../project/entities/project.entity';

@Entity()
export class Researcher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Project, (project) => project.researcher)
  projects: Project[];
}
