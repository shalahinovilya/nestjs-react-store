import {Category} from "./category.entity";

export const CategoryProvider = [
    {
        provide: 'CATEGORY_REPOSITORY',
        useValue: Category
    },
]