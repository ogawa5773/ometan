import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  BaseEntity
} from 'typeorm'

import { Channel } from './Channel'
import { User } from './User'

@Entity()
export class Team extends BaseEntity {

  @PrimaryGeneratedColumn({ unsigned: true })
  readonly id: number

  @OneToMany(() => Channel, (channel) => channel.team, { cascade: ["remove"] })
  channels: Channel[]

  @OneToMany(() => User, (user) => user.team, { cascade: ["remove"] })
  users: User[]

  @Column({ unique: true })
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
