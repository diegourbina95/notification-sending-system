import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class SendCampaignDto {
  @ApiProperty({
    example: '33000019',
    description: 'Codigo de campaña',
  })
  @IsNotEmpty()
  @IsString()
  campaignCode: string;

  @ApiProperty({
    example: 'SMS_INFOBIP',
    description: 'Codigo de campaña',
  })
  @IsNotEmpty()
  @IsString()
  messageProvider: string;
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
