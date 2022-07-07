import {Table, Column, DataType, Model, HasMany} from 'sequelize-typescript';
import {CreateUser} from "./interfaces/user.interface";
import {Product} from "../product/product.entity";
import {Cart} from "../cart/cart.entity";

@Table
export class User extends Model<CreateUser> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    username: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @HasMany(() => Product)
    product: Product[];

    @HasMany(() => Cart)
    cart: Cart[];
}