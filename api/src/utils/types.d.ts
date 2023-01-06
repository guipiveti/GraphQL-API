export type QueryFiltersType = {
    start?: number,
    end?: number,
    flavors?: Array<string>
}

export type IngredientsDataType = {
    ingredient: string,
    quantity: number,
    unit_price: number,
    cost: number
}

export type IngredientsPriceType = {
    ingredient: string,
    price: number
}

export type PizzasPriceType = {
    flavor: string,
    price: number
}

export type ReceiptType = {
    flavor: string,
    pepperoni: number,
    cheese: number,
    vedgetable: number,
    dough: number,
    sauce: number
}