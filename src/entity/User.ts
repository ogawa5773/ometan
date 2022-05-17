import {
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Timestamp,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    BaseEntity
  } from 'typeorm'

import { Team } from './Team'
import { Channel } from './Channel'

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn({ unsigned: true })
    readonly id: number

    @Column({ unique: true })
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
