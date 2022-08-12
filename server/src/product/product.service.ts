import {Injectable, Inject} from '@nestjs/common';
import {Product} from "./product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {FileService} from "../file/file.service";
import {Op} from "sequelize";
import {Category} from "../category/category.entity";
import {CartProduct} from "../cart-product/cart-product.entity";


@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: typeof Product,
        private fileService: FileService
    ) {}


    async createProduct(dto: CreateProductDto, file): Promise<Product> {
        const fileName = this.fileService.saveFile(file)
        const data = await this.productRepository.create({
            title: dto.title,
            description: dto.description,
            price: dto.price,
            categoryId: dto.categoryId,
            userId: dto.userId,
            img: fileName}).catch(() => {
            this.fileService.removeFile(fileName)
            throw new Error('Неккоректная информация при создании продукта')
            }
        )
        return data
    }


    async updateProduct(productId, fieldsForUpdating, file): Promise<Product> {
        const product = await this.productRepository.findByPk(productId);
        const oldFile = product.img
        if (!product.id) {
            throw new Error('Нет продукта с таким id')
        }
        let fileName
        if (typeof file === 'object') {
            fileName = this.fileService.saveFile(file)
        }
        else {
            const checkImg = this.fileService.checkFile(fieldsForUpdating.img)
            if (!checkImg)  throw new Error('Ошибка при загрузке изображение, попробуйте снова')
        }

        await product.update({
            title: fieldsForUpdating.title,
            description: fieldsForUpdating.description,
            price: fieldsForUpdating.price,
            img: fileName || fieldsForUpdating.img,
        }).catch(() => {
                this.fileService.removeFile(fileName)
                throw new Error('Неккоректная информация при обновлении продукта')
            }
        )
        fileName && this.fileService.removeFile(oldFile)
        return product
    }


    async deleteProduct(productId): Promise<Product> {

        const product = await this.productRepository.findByPk(productId);
        this.fileService.removeFile(product.img);
        if (product.id)  await product.destroy();
        return product;
    }


    async getOne(productId): Promise<Product> {
        return await this.productRepository.findByPk(productId, {include: [
                {model: Category, attributes: ['value']}
            ]});
    }


    async getProducts(req) {
        const {limit, offset, categoryId, sortOrder, searchInput} = req.query

        if (searchInput) {
            return await this.productRepository.findAndCountAll( {
                where: {title: {[Op.like]: `%${searchInput}%`}},
                order: [sortOrder],
                offset,
                limit
            })
        }

        if (categoryId) {
            return await this.productRepository.findAndCountAll({
                order: [sortOrder],
                where: {categoryId}, offset, limit}
            )}

        return await this.productRepository.findAndCountAll( {order: [sortOrder], offset, limit})
    }

    async getProductsForCart (idList) {
        return await this.productRepository.findAll({
            order: [['title', 'ASC']],
            where: {id: idList},
            include: [
                {
                    model: CartProduct,
                    attributes: ['id', 'quantity']
                },
                {
                    model: Category,
                    attributes: ['id', 'value']
                }],
        })
    }

}