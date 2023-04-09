
const graphql = require ('graphql');

const ingredients = [
    {id: 1, name: "White", stock: 20},
    {id: 2, name: "Wheat", stock: 130},
    {id: 3, name: "Rye", stock: 120},
    {id: 4, name: "Ham", stock: 170},
    {id: 5, name: "Turkey", stock: 100},
    {id: 6, name: "Roast Beef", stock: 111},
    {id: 7, name: "Cheese", stock: 160},
    {id: 8, name: "Lettuce", stock: 50},
    {id: 9, name: "Tomato", stock: 300},
    {id: 10, name: "Mayo", stock: 184},
    {id: 11, name: "Mustard", stock: 51},
    {id: 12, name: "Ketchup", stock: 53},
    {id: 13, name: "Relish", stock: 74},
    {id: 14, name: "Sauerkraut", stock: 142},
    {id: 15, name: "Pesto", stock: 12},
]

const { graphqlHTTP } = require('express-graphql');
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLNonNull,
    GraphQLInt
} = require('graphql')

const IngredientType = new GraphQLObjectType({
    name: 'Ingredient',
    description: 'This represents an ingredient',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        stock: {type: new GraphQLNonNull(GraphQLInt)},
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () =>({
        ingredients: {
            type: new GraphQLList(IngredientType),
            description: 'List of Ingredients',
            args: {name: {type: GraphQLString}},
            resolve(parent,args) {
                if (args.name==null) return ingredients;
                ingredientList = [];
                ingredients.forEach(function(ingredient) {
                    if (ingredient.name == args.name) {
                        ingredientList.push(ingredient);
                    }
                });
                return ingredientList;
            },
        },
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

exports.schema = schema;