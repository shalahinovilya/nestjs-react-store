import {Table, Column, DataType, Model, HasMany} from 'sequelize-typescript';
import {CreateUser} from "./interfaces/user.interface";
import {Product} from "../product/product.entity";
import {Cart} from "../cart/cart.entity";
import {ApiProperty} from "@nestjs/swagger";

@Table
export class User extends Model<CreateUser> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty()
    id: number;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: true})
    username: string;

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    @ApiProperty({ uniqueItems: true, nullable: false})
    email: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    password: string;

    @HasMany(() => Product)
    product: Product[];

    @HasMany(() => Cart)
    cart: Cart[];
}