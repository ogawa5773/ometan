import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany
} from 'typeorm'

import { Channel } from './Channel'
import { User } from './User'

@Entity()
export class Team {

  @PrimaryGeneratedColumn({ unsigned: true })
  readonly id: number

  @OneToMany(() => Channel, (channel) => channel.team)
  channels: Channel[]

  @OneToMany(() => User, (user) => user.team)
  users: User[]

  @Column({ unsigned: true, unique: true })
  slackId: number

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  @DeleteDateColumn()
  deletedAt: Timestamp
}
