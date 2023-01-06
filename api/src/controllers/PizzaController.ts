const { query } = require('../services/database');
import { QueryFiltersType, IngredientsDataType, PizzasPriceType, IngredientsPriceType, ReceiptType } from '../utils/types';

const getPizzaSales = async (filters:QueryFiltersType) => {
    let sql = 'select sum(pepperoni) AS pepperoni, sum(branco) AS branco, sum(all_dressed) AS all_dressed from pizza_selling_per_day';
    let values = [];
    if (filters?.start || filters?.end) {
        sql += ' where';
        if (filters?.start) {
            sql += ' date >= $1';
            values[0] = filters?.start;
            if (filters?.end) {
                sql += ' and';
            }
        }
        if (filters?.end) {
            sql += ' date <= $2'
            values[1] = filters?.end;
        }
    }
    let pizzaSales = await query(sql, values);

    // Filtering unwanted pizzas
    if (filters?.flavors) {
        for (const flavor in pizzaSales[0]) {
            if (!filters?.flavors?.includes(flavor)) {
                delete pizzaSales[0][flavor];
            }
        }
    }

    let prices = await query('select * from prices;');

    let queryResponse = [];
    for (const pizzaFlavor in pizzaSales[0]) {
        let pizzaPrice = prices.find((item: PizzasPriceType) => item.flavor == pizzaFlavor)?.price;
        queryResponse.push({
            flavor: pizzaFlavor,
            quantity: parseInt(pizzaSales[0][pizzaFlavor]),
            unit_price: pizzaPrice,
            sales: pizzaPrice * parseInt(pizzaSales[0][pizzaFlavor]) || 0
        });
    }
    return queryResponse;
}

const getUsedIngredients = async (filters:QueryFiltersType) => {
    let pizzaSales = await getPizzaSales(filters);
    let receipts = await query('select * from receipts;');
    let ingredientsData:Array<IngredientsDataType> = [];

    let prices = await query('select * from ingredients;');
    receipts.map((receipt:any) => {
        for (const ingredient in receipt) {
            if (ingredient !== 'flavor') {
                let ingredientIndex = ingredientsData.findIndex((item:IngredientsDataType) => item.ingredient == ingredient);
                let pizzasSold = pizzaSales.find((item)=>item.flavor==receipt.flavor)?.quantity || 0;
                if (ingredientIndex >= 0) {
                    ingredientsData[ingredientIndex].quantity += parseInt(receipt[ingredient])*pizzasSold;
                    ingredientsData[ingredientIndex].cost += (parseInt(receipt[ingredient])*pizzasSold) * ingredientsData[ingredientIndex].unit_price;
                }
                else {
                    let ingredientPrice = prices.find((item:IngredientsPriceType)=>item.ingredient==ingredient)?.price;
                    ingredientsData.push({
                        ingredient,
                        quantity: parseInt(receipt[ingredient])*pizzasSold,
                        unit_price: ingredientPrice,
                        cost: parseInt(receipt[ingredient])*pizzasSold * ingredientPrice
                    })
                }
            }
        }
    });

    return ingredientsData;
}

module.exports = {
    getUsedIngredients,
    getPizzaSales,
}