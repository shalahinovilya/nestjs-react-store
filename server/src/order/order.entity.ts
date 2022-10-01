import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.entity";
import {Cart} from "../cart/cart.entity";
import {CreateOrder} from "./interfaces/order.interface";
import {ApiProperty} from "@nestjs/swagger";

@Table
export class Order extends Model<CreateOrder> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty({uniqueItems: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    firstName: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    lastName: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    phone: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    address: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    deliveryType: string;

    @Column({type: DataType.STRING, allowNull: true})
    @ApiProperty({nullable: true})
    comment: string;

    @ForeignKey(() => User)
    @ApiProperty()
    userId: number

    @ForeignKey(() => Cart)
    @ApiProperty()
    cartId: number

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Cart)
    cart: Cart;

}