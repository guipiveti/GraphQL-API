
# Pizzaria GraphQL API

![Pizza](https://images.squarespace-cdn.com/content/v1/5c23bb393917eeb9305903bf/1558787109272-EHA3PILDX3F8R30OZMKK/0-9.jpg?format=2500w "Pizza")

## 💻 Running the project

1. Open your terminal in the root folder of the project.
2. Run the following command to build all docker images (database and API) and execute them:

   ```bash
   docker compose up -d
   ```
3. Make GraphQL requests  to http://localhost:3333/graphql

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=GraphQL-API&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fguipiveti%2FGraphQL-API%2Fmain%2FAcceleratorApp-Insomnia.json)

There are two query functions currently available (getPizzaSales and getUsedIngredients). Both may receive as arguments:
    start: Date from when you want to filter the results (Format: "YYYY-MM-DD")
    end: Date util when you want to filter the results (Format: "YYYY-MM-DD")
    flavors: an array containing the flavors you want to filter the result (Example: ["pepperoni", "all_dressed"])
*All arguments are optional
