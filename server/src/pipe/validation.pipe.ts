import {ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {validate} from "class-validator";


@Injectable()
export class CustomValidationPipe implements PipeTransform {

    async transform(value: any, metadata: ArgumentMetadata): Promise<any> {

        if (!metadata.metatype || !this.toValidate(metadata.metatype)) {
            return value
        }
        if (this.isEmpty(value)) {
            throw new HttpException('Validation failed: no payload provided', HttpStatus.BAD_REQUEST)
        }

        const object = plainToInstance(metadata.metatype, value)

        const errors = await validate(object)

        if (errors.length) {
            const messages = errors.map((data) => {
              return `${data.property}: ${Object.values(data.constraints).join(', ')}`
            })
            throw new HttpException(messages, HttpStatus.BAD_REQUEST)
        }

        return value
    }

    private toValidate(metatype: Function): boolean {
        const types: Function[] = [String, Boolean, Number, Array, Object]
        return !types.includes(metatype)
    }

    private isEmpty (value: any) {
        return Object.keys(value).length < 1;
    }
}
