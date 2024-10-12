import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EventsService {
  private readonly logger: Logger;

  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {
    this.logger = new Logger(EventsService.name);
  }

  create(createEventDto: CreateEventDto) {
    try {
      const event = this.eventsRepository.create(createEventDto);
      return this.eventsRepository.save(event);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  findAll() {
    return this.eventsRepository.find();
  }

  findOne(id: string) {
    try {
      const event = this.eventsRepository.findOneBy({ id });
      if (!event) {
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      return event;
    } catch (error) {
      this.logger.log(error);
      throw error;
    }
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    try {
      const event = await this.eventsRepository.preload({
        id: id,
        ...updateEventDto,
      });
      if (!event) {
        throw new NotFoundException(`Event with id ${id} not found`);
      }
      return this.eventsRepository.save(event);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }

  remove(id: string) {
    try {
      return this.eventsRepository.delete(id);
    } catch (error) {
      this.logger.error(error);
      throw error;
    }
  }
}
