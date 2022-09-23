import {Injectable, Inject, OnModuleInit} from '@nestjs/common';
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {CartService} from "../cart/cart.service";



@Injectable()
export class UserService {

    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: typeof User,
        private cartService: CartService,
    ) {}


    async createUser (dto: CreateUserDto): Promise<User> {

        const user = await this.userRepository.create(dto);
        await this.cartService.getOrCreateCart(user.id)
        return user
    }


    async getUserById (userId): Promise<User> {
        return  await this.userRepository.findByPk(userId);
    }


    async getUserByEmail (email): Promise<User> {
        return await this.userRepository.findOne({where: {email} });
    }


    async getAllUsers (): Promise<User[]> {
        return this.userRepository.findAll<User>();
    }

}