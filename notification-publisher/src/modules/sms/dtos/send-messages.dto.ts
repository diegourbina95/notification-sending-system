import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested,
  ArrayMinSize,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { PROVIDER_TYPES, ProviderTypes } from '../types';

export class Message {
  @ApiProperty({
    example: '999999999',
    description: 'Número de celular',
  })
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty({
    example: 'Esto es un mensaje de ejemplo...',
    description: 'Mensaje a enviar',
  })
  @IsString()
  @IsNotEmpty()
  messageDetail: string;
}

export class SendMessagesDto {
  @ApiProperty({
    example: 'Campaña de ejemplo',
    description: 'Nombre de la campaña',
  })
  @IsString()
  @IsNotEmpty()
  campaignName: string;

  @ApiProperty({
    example: 'SOLUCIONES',
    description: 'Codigo de campaña',
  })
  @IsNotEmpty()
  @IsIn(PROVIDER_TYPES)
  messageProvider: ProviderTypes;

  @IsArray()
  @ArrayMinSize(1, { message: 'Debe enviar al menos un mensaje' })
  @ValidateNested({ each: true })
  @Type(() => Message)
  messages: Message[];
}

export class SendMessagesResponseDto {
  @ApiProperty({
    description: 'Código de respuesta del servicio',
    example: '00',
  })
  responseCode: string;

  @ApiProperty({
    description: 'Mensaje de respuesta del servicio',
    example: 'Solicitud enviada a procesar correctamente',
  })
  message: string;
}
