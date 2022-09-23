import { Sequelize } from 'sequelize-typescript';
import {User} from "../user/user.entity";
import {Product} from "../product/product.entity";
import {Category} from "../category/category.entity";
import {Cart} from "../cart/cart.entity";
import {CartProduct} from "../cart-product/cart-product.entity";
import {Order} from "../order/order.entity";
import {Comment} from "../comment/comment.entity";


export const databaseProviders = [
    {
        provide: 'SEQUELIZE',
        useFactory: async () => {
            const sequelize = new Sequelize({
                dialect: 'postgres',
                host: process.env.POSTGRES_HOST,
                port: +process.env.POSTGRES_PORT,
                username: process.env.POSTGRES_USER,
                password: process.env.POSTGRES_DB_PASSWORD,
                database: process.env.POSTGRES_DB,
            });
            sequelize.addModels([User, Product, Category, Cart, CartProduct, Order, Comment]);
            await sequelize.sync();
            return sequelize;
        },
    },
];