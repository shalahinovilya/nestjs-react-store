import { Table, Column, DataType, Model, HasMany } from 'sequelize-typescript';
import {CreateCategory} from "./interfaces/category.interface";
import {Product} from "../product/product.entity";
import {ApiProperty} from "@nestjs/swagger";

@Table
export class Category extends Model<CreateCategory> {

    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    @ApiProperty({uniqueItems: true})
    id: number

    @Column({type: DataType.STRING, unique: true, allowNull: false})
    @ApiProperty({uniqueItems: true, nullable: false})
    value: string

    @Column({type: DataType.STRING, allowNull: false})
    @ApiProperty({nullable: false})
    description: string

    @HasMany(() => Product)
    product: Product[]

}