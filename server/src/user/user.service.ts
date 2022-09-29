import {Injectable, Inject} from '@nestjs/common';
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {CartService} from "../cart/cart.service";
import {UpdateUserDto} from "./dto/update-user.dto";



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

    async updateUser (userId, dto: UpdateUserDto) {
        return await this.userRepository.update({
            email: dto.email,
            username: dto.username,
            role: dto.role
        }, {where: {id: userId}})
    }

    async deleteUser (userId) {
        return await this.userRepository.destroy({where: {id: userId}});
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