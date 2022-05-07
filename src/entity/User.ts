import {
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    Timestamp,
    UpdateDateColumn,
    DeleteDateColumn,
    Entity,
    ManyToOne
  } from 'typeorm'

import { Team } from './Team'
import { Channel } from './Channel'

@Entity()
export class User {

    @PrimaryGeneratedColumn({ unsigned: true })
    readonly id: number

    @Column({ unsigned: true, unique: true })
    slackId: number

    @ManyToOne(() => Team, (team) => team.users)
    team: Team

    @ManyToOne(() => Channel, (channel) => channel.users)
    channel: Channel

    @Column()
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
