import {Table, Column, DataType, Model, BelongsTo, ForeignKey, HasMany} from 'sequelize-typescript';
import {CreateProduct} from "./interfaces/product.interface";
import {User} from "../user/user.entity";
import {Category} from "../category/category.entity";
import {CartProduct} from "../cart-product/cart-product.entity";
import {ApiProperty} from "@nestjs/swagger";
import {Comment} from "../comment/comment.entity";

@Table
export class Product extends Model<CreateProduct> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty({uniqueItems: true})
    id: number;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    @ApiProperty({uniqueItems: true, nullable: false})
    title: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    description: string;

    @Column({type: DataType.DECIMAL, allowNull: false})
    @ApiProperty({nullable: false})
    price: number;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER, allowNull: false})
    @ApiProperty({nullable: false})
    userId: number;

    @ForeignKey(() => Category)
    @Column({type: DataType.INTEGER, allowNull: false})
    @ApiProperty()
    categoryId: number;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty()
    img: string;

    @BelongsTo(() => Category)
    category: Category;

    @BelongsTo(() => User)
    user: User;

    @HasMany(() => CartProduct)
    cartProduct: CartProduct[];

    @HasMany(() => Comment)
    comment: Comment[];

}