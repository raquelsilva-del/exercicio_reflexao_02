function  MinLength(length: number): PropertyDecorator{
    return (target, properyKey) => {
            
    }
}


export class Category {
    title: string

    constructor (title: string) {
        this.title = title
    }
}

new Category('ti')