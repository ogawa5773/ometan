import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany
} from 'typeorm'

import { Team } from './Team'
import { User } from './User'

@Entity()
export class Channel {

  @PrimaryGeneratedColumn({ unsigned: true })
  readonly id: number

  @Column({ unsigned: true, unique: true })
  slackId: number

  @ManyToOne(() => Team, (team) => team.users)
  team: Team

  @OneToMany(() => User, (user) => user.team)
  users: User[]

  @Column()
  name: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  @DeleteDateColumn()
  deletedAt: Timestamp
}
