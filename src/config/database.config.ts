import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Project } from '../project/entities/project.entity';
import { Researcher } from '../researcher/entities/researcher.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5434,
  username: 'ecodash',
  password: 'ecodash_password',
  database: 'ecodash_db',
  entities: [Project, Researcher],
  synchronize: true, // cuidado em produção!
};
