import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tbcampana', schema: 'sms' })
export class CampaignEntity {
  @PrimaryGeneratedColumn({
    name: 'co_tbcamp',
    type: 'integer',
  })
  campaignCode: number;

  @Column({
    name: 'no_camp',
    type: 'varchar',
    length: 100,
    nullable: true, // Asumimos que puede ser null
  })
  campaignName?: string;

  @Column({
    name: 'fe_ini',
    type: 'timestamp',
    nullable: true,
  })
  startDate?: Date;

  @Column({
    name: 'fe_fin',
    type: 'timestamp',
    nullable: true,
  })
  endDate?: Date;

  @Column({
    name: 'nu_reg',
    type: 'integer',
    nullable: true,
  })
  numberOfRecords?: number;
}
