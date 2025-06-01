import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'tbmensaje', schema: 'sms' })
export class MessageEntity {
  @PrimaryGeneratedColumn({
    name: 'co_tbmens',
    type: 'integer',
  })
  messageCode: number;

  @Column({
    name: 'no_mensaje',
    type: 'varchar',
    nullable: true,
  })
  messageDetail?: string;

  @Column({
    name: 'celular',
    type: 'varchar',
    nullable: true,
  })
  phoneNumber?: string;

  @Column({
    name: 'co_tbcamp',
    type: 'smallint',
    nullable: true,
  })
  campaignCode?: number;

  @Column({
    name: 'fe_envio',
    type: 'timestamp',
    nullable: true,
  })
  sendDate?: Date;

  @Column({
    name: 'std',
    type: 'smallint',
    default: 0,
    nullable: true,
  })
  processStatus?: number;

  @Column({ name: 'no_dato1', type: 'varchar', nullable: true })
  data1?: string;

  @Column({ name: 'no_dato2', type: 'varchar', nullable: true })
  data2?: string;

  @Column({ name: 'no_dato3', type: 'varchar', nullable: true })
  data3?: string;

  @Column({ name: 'no_dato4', type: 'varchar', nullable: true })
  data4?: string;

  @Column({ name: 'no_dato5', type: 'varchar', nullable: true })
  data5?: string;

  @Column({ name: 'no_dato6', type: 'varchar', nullable: true })
  data6?: string;

  @Column({ name: 'no_dato7', type: 'varchar', nullable: true })
  data7?: string;

  @Column({ name: 'no_dato8', type: 'varchar', nullable: true })
  data8?: string;

  @Column({ name: 'no_dato9', type: 'varchar', nullable: true })
  data9?: string;

  @Column({ name: 'no_dato10', type: 'varchar', nullable: true })
  data10?: string;
}
