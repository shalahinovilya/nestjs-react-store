import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import {CreateCategory} from "./interfaces/category.interface";
import {Product} from "../product/product.entity";

@Table
export class Category extends Model<CreateCategory> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    value: string

    @Column({type: DataType.STRING, allowNull: false})
    description: string

    @HasMany(() => Product)
    product: Product[]

}