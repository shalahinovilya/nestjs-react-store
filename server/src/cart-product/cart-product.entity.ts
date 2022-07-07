import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {Product} from "../product/product.entity";
import {Cart} from "../cart/cart.entity";


@Table
export class CartProduct extends Model {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.INTEGER, defaultValue: 1})
    quantity: number

    @Column({type: DataType.DECIMAL, defaultValue: 0})
    finalPrice: number;

    @ForeignKey(() => Product)
    @Column({type: DataType.INTEGER, allowNull: false})
    productId: number;

    @ForeignKey(() => Cart)
    @Column({type: DataType.INTEGER, allowNull: false})
    cartId: number;

    @BelongsTo(() => Product)
    product: Product

    @BelongsTo(() => Cart)
    cart: Cart


}