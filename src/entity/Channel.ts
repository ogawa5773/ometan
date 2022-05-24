import {
  Column,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Timestamp,
  UpdateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  BaseEntity
} from 'typeorm'

import { Team } from './Team'
import { User } from './User'

@Entity()
export class Channel extends BaseEntity {

  @PrimaryGeneratedColumn({ unsigned: true })
  readonly id: number

  @Column({ unique: true })
  slackId: string

  @ManyToOne(() => Team, (team) => team.channels)
  team: Team

  @OneToMany(() => User, (user) => user.team)
  users: User[]

  @Column({ nullable: true })
  name: string

  @CreateDateColumn()
  createdAt: Timestamp

  @UpdateDateColumn()
  updatedAt: Timestamp

  @DeleteDateColumn()
  deletedAt: Timestamp
}
