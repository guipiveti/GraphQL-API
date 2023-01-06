import { gql } from "apollo-server-express";
const Schema = gql`
  type IngredientsUsed {
    ingredient: String!
    quantity: Int
    cost: Float
    unit_price: Float
  }

  type PizzaSales {
    flavor: String!
    quantity: Int
    sales: Float
    unit_price: Float
  }
  
  type Query {
    getPizzaSales(start: String, end: String, flavors: [String]): [PizzaSales]
  }
  type Query {
    getUsedIngredients(start: String, end: String, flavors: [String]): [IngredientsUsed]
  }
`;
export default Schema; 