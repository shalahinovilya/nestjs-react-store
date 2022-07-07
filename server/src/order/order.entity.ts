import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {User} from "../user/user.entity";
import {Cart} from "../cart/cart.entity";
import {CreateOrder} from "./interfaces/order.interface";

@Table
export class Order extends Model<CreateOrder> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    firstName: string;

    @Column({type: DataType.STRING, allowNull: false})
    lastName: string;

    @Column({type: DataType.STRING, allowNull: false})
    phone: string;

    @Column({type: DataType.STRING, allowNull: false})
    address: string;

    @Column({type: DataType.STRING, allowNull: false})
    buyingType: string;

    @Column({type: DataType.STRING, allowNull: true})
    comment: string;

    @ForeignKey(() => User)
    userId: number

    @ForeignKey(() => Cart)
    cartId: number

    @BelongsTo(() => User)
    user: User;

    @BelongsTo(() => Cart)
    cart: Cart;


}