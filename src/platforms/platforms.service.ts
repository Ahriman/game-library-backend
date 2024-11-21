import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlatformDto } from './dto/create-platform.dto';
import { UpdatePlatformDto } from './dto/update-platform.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Platform } from './entities/platform.entity';

@Injectable()
export class PlatformsService {

  constructor(
    @InjectRepository(Platform)
    private platformsRepository: Repository<Platform>,
  ) {}
  
  async create(createPlatformDto: CreatePlatformDto): Promise<Platform> {
    const platform = this.platformsRepository.create(createPlatformDto);
    return this.platformsRepository.save(platform);
  }

  async findAll(): Promise<Platform[]> {
    return this.platformsRepository.find();
  }

  async findOne(id: string): Promise<Platform> {
    const platform = await this.platformsRepository.findOne({ where: { id } });
    if (!platform) {
      throw new NotFoundException(`Platform with ID ${id} not found`);
    }
    return platform;
  }

  async update(id: string, updatePlatformDto: UpdatePlatformDto): Promise<Platform> {
    await this.platformsRepository.update(id, updatePlatformDto);
    const updatedPlatform = await this.platformsRepository.findOne({ where: { id } });
    if (!updatedPlatform) {
      throw new NotFoundException(`Platform with ID ${id} not found`);
    }
    return updatedPlatform;
  }

  async remove(id: string): Promise<void> {
    const result = await this.platformsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Platform with ID ${id} not found`);
    }
  }
  
}
