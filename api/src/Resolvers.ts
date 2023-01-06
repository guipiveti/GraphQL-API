const {getPizzaSales, getUsedIngredients} = require('./controllers/PizzaController');
import { QueryFiltersType } from './utils/types';

const Resolvers = {
  Query: {
    getPizzaSales: async(_: any, args:QueryFiltersType) => { 
      let sales = await getPizzaSales(args);
      return sales;
    },
    getUsedIngredients: async(_: any, args:QueryFiltersType) => { 
      let numberOfIngredients = await getUsedIngredients(args);
      return numberOfIngredients;
    },
  },
};
export default Resolvers;