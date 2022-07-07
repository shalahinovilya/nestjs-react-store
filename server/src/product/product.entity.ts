import {Table, Column, DataType, Model, BelongsTo, ForeignKey, HasMany} from 'sequelize-typescript';
import {CreateProduct} from "./interfaces/product.interface";
import {User} from "../user/user.entity";
import {Category} from "../category/category.entity";
import {CartProduct} from "../cart-product/cart-product.entity";

@Table
export class Product extends Model<CreateProduct> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    description: string;

    @Column({type: DataType.DECIMAL, allowNull: false})
    price: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    userId: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, allowNull: false})
    categoryId: number;

    @Column({type: DataType.STRING, allowNull: false})
    img: string;

    @BelongsTo(() => Category)
    category: Category;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => CartProduct)
    cartProduct: CartProduct[];


    // @BelongsToMany(() => Cart,  { through: CartProduct })
    // carts: Cart[];

}