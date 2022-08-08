import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../product/product.entity";
import {User} from "../user/user.entity";
import {CreateComment} from "./interface/comment.interface";
import {ApiProperty} from "@nestjs/swagger";


@Table
export class Comment extends Model<CreateComment> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty({uniqueItems: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    advantages: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    limitations: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    content: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    @ApiProperty({nullable: false})
    userId: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, allowNull: false})
    @ApiProperty({nullable: false})
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @BelongsTo(() => User)
    user: User;

}