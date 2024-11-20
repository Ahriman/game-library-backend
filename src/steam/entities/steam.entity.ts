import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SteamGame } from '../interfaces/steam.game';

@Entity()
export class Steam implements SteamGame {
  @ApiProperty({
    description: 'El ID de la aplicación en Steam.',
    example: 440
  })
  @PrimaryGeneratedColumn()
  appid: number;

  @ApiProperty({
    description: 'El nombre del juego en Steam.',
    example: 'Team Fortress 2'
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'El tiempo total de juego en minutos.',
    example: 12345
  })
  @Column()
  playtime_forever: number;

  @ApiProperty({
    description: 'La URL del icono del juego.',
    example: 'https://example.com/icon.jpg'
  })
  @Column()
  img_icon_url: string;

  @ApiProperty({
    description: 'La URL del logo del juego.',
    example: 'https://example.com/logo.jpg'
  })
  @Column()
  img_logo_url: string;
}