import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsNumber } from 'class-validator';
import { PROVIDER_TYPES, ProviderTypes } from '../types';

export class SendCampaignDto {
  @ApiProperty({
    example: 2,
    description: 'Codigo de campaña',
  })
  @IsNotEmpty()
  @IsNumber()
  campaignCode: number;

  @ApiProperty({
    example: 'SOLUCIONES',
    description: 'Codigo de campaña',
  })
  @IsNotEmpty()
  @IsIn(PROVIDER_TYPES)
  messageProvider: ProviderTypes;
}
export class SendCampaignResponseDto {
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
