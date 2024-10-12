import { AbstractEntity } from 'src/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity('events')
export class Event extends AbstractEntity {
  @Column()
  name: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  date2: Date;
}
