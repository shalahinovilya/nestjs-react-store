import {
    BelongsTo,
    Column,
    DataType,
    ForeignKey,
    HasMany,
    HasOne,
    Model,
    Table
} from "sequelize-typescript";
import {User} from "../user/user.entity";
import {CartProduct} from "../cart-product/cart-product.entity";
import {Order} from "../order/order.entity";


@Table
export class Cart extends Model{

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.DECIMAL, allowNull: false, defaultValue: 0})
    finalPrice: number;

    @Column({type: DataType.BOOLEAN, allowNull: false, defaultValue: false})
    inOrder: boolean;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => CartProduct)
    cartProduct: CartProduct[];

    @HasOne(() => Order)
    order: Order;
}