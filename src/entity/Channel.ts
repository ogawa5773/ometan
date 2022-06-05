import {
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  Timestamp,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  BaseEntity
} from 'typeorm'

import { Team } from './Team'
import { User } from './User'

@Index(["slackId", "deletedAt"], { unique: true })
@Entity()
export class Channel extends BaseEntity {

  @PrimaryGeneratedColumn({ unsigned: true })
  readonly id: number

  @Column()
  slackId: string

  @ManyToOne(() => Team)
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
