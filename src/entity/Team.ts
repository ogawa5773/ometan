import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Timestamp,
  Entity,
  Index,
  OneToMany,
  BaseEntity
} from 'typeorm'

import { Channel } from './Channel'
import { User } from './User'

@Index(["slackId", "deletedAt"], { unique: true })
@Entity()
export class Team extends BaseEntity {

  @PrimaryGeneratedColumn({ unsigned: true })
  readonly id: number

  @OneToMany(() => Channel, (channel) => channel.team, { cascade: true })
  channels: Channel[]

  @OneToMany(() => User, (user) => user.team, { cascade: true })
  users: User[]

  @Column()
  slackId: string

  @Column({ nullable: true })
  name: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  @DeleteDateColumn()
  deletedAt: Timestamp
}
