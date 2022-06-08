import {
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Timestamp,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    ManyToOne,
    BaseEntity
  } from 'typeorm'

import { Team } from './Team'
import { Channel } from './Channel'

@Index(["slackId", "deletedAt"], { unique: true })
@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    readonly id: number

    @Column()
    slackId: string

    @ManyToOne(() => Team, (team) => team.users)
    team: Team

    @ManyToOne(() => Channel, (channel) => channel.users)
    channel: Channel

    @Column({ nullable: true })
    name: string

    @Column({ nullable: true })
    birthday: Date

    @CreateDateColumn()
    createdAt: Timestamp

    @UpdateDateColumn()
    updatedAt: Timestamp

    @DeleteDateColumn()
    deletedAt: Timestamp
}
