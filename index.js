var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema } = require('graphql');

// Construct a schema, using GraphQL schema language
var restaurants = [
    {
        id: 1,
        name: "WoodsHill ",
        description: "American cuisine, farm to table, with fresh produce every day",
        dishes: [
          {
            name: "Swordfish grill",
            price: 27
          },
          {
            name: "Roasted Broccily ",
            price: 11
          }
        ]
      },
      {
        id: 2,
        name: "Fiorellas",
        description: "Italian-American home cooked food with fresh pasta and sauces",
        dishes: [
          {
            name: "Flatbread",
            price: 14
          },
          {
            name: "Carbonara",
            price: 18
          },
          {
            name: "Spaghetti",
            price: 19
          }
        ]
      },
      {
        id: 3,
        name: "Karma",
        description: "Malaysian-Chinese-Japanese fusion, with great bar sluts and bartenders",
        dishes: [
          {
            name: "Dragon Roll",
            price: 12
          },
          {
            name: "Pancake roll ",
            price: 11
          },
          {
            name: "Cod cakes",
            price: 13
          }
        ]
      }
    ]

// Construct a schema, using GraphQL schema language
    // return Contact from contacts
    // Specify the endpoint of the API as contact & contacts
    // contact takes 1 argument which is an id and returns Contact
    // Define what Contact is
    // Define what a Course is

    
var schema = buildSchema(`
  type Query {
    restaurant(id: Int): Restaurant
    restaurants: [Restaurant]
  },
  type Restaurant {
    name: String
    description: String
    dishes: [Dish]
  }
  type Dish {
      name: String
      number: Int
  }
  input RestaurantInput{
    id: Int
    name: String
    description: String
  }

  type DeleteResponse{
    ok: Boolean!
  }

  type Mutation{
    setRestaurant(input: RestaurantInput): Restaurant
    deleteRestaurant(id: Int!): DeleteResponse 
    editRestaurant(id: Int!, name: String): Restaurant
  }

`);

// The root provides a resolver function for each API endpoint
// Put in our queries here - function that returns what we want
// We need to provide a contact method via fat arrow function
// contact takes in an argument and returns id
var root = {
    restaurant : (arg) => restaurants[arg.id],
    restaurants : () => restaurants,

    setRestaurant : ({input}) => {
      restaurants.push({id:input.id,name:input.name,description:input.description})
      return input
    },

    deleteRestaurant : ({id})=>{
      const ok = Boolean(restaurants[id])
      let delr = restaurants[id];
      restaurants = restaurants.filter(item => item.id !== id)
      console.log(JSON.stringify(delr)) 
      return {ok}
    },

    editRestaurant: ({id, ...restaurant}) => {
      if(!restaurants[id]) {
        throw new Error("contact doesn't exist")
      }
      restaurants[id] = {
      ...restaurants[id],...restaurant
      }
      return restaurants[id]
    }

  };


var app = express();
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000, ()=> console.log('Running GraphQL on Port: 4000'));