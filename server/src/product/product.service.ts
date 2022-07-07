import {Injectable, Inject} from '@nestjs/common';
import {Product} from "./product.entity";
import {CreateProductDto} from "./dto/create-product.dto";
import {FileService} from "../file/file.service";


@Injectable()
export class ProductService {
    constructor(
        @Inject('PRODUCT_REPOSITORY')
        private productRepository: typeof Product,
        private fileService: FileService
    ) {}

    async createProduct(dto: CreateProductDto, file): Promise<Product> {
        const fileName = this.fileService.saveFile(file)
        const data = await this.productRepository.create({...dto, img: fileName}).catch(e => {
            this.fileService.removeFile(fileName)
            throw new Error('Неккоректная информация при создании продукта')
            }
        )
        return data
    }

    async getOne(productId): Promise<Product> {
        return await this.productRepository.findByPk(productId);
    }

    async updateProduct(productId, fieldsForUpdating, file): Promise<Product> {

        const product = await this.productRepository.findByPk(productId);

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
        }).catch(e => {
                this.fileService.removeFile(fileName)
                throw new Error('Неккоректная информация при обновлении продукта')
            }
        )
        this.fileService.removeFile(product.img)
        return product
    }

    async deleteProduct(productId): Promise<Product> {

        const product = await this.productRepository.findByPk(productId);
        this.fileService.removeFile(product.img);
        if (product.id)  await product.destroy();
        return product;
    }

    async findAll(): Promise<Product[]> {
        return this.productRepository.findAll<Product>();
    }

    async getTotalProductsNum() {
        return await this.productRepository.count();
    }

    async getProducts(limit, offset) {
        return await this.productRepository.findAll({offset, limit})
    }
}