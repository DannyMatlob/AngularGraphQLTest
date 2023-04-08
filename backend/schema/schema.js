
const graphql = require ('graphql');

const authors = [
    {id: 1, name: "J.K Rowling"},
    {id: 2, name: "Danny Matlob"},
]

const books = [
    {id: 1, name: "Harry Potter Chamber of Secrets", authorId: 1 },
    {id: 2, name: "Harry Potter Second Chamber of Secrets", authorId: 1 },
    {id: 3, name: "Harry Potter Third Chamber of Secrets", authorId: 1 },
    {id: 4, name: "Danny Novel 1", authorId: 2 },
    {id: 5, name: "Danny Novel 2", authorId: 2 },
    {id: 6, name: "Danny Novel 3", authorId: 2 },
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

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents an author',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        books: {
            type: new GraphQLList(BookType),
            resolve: (author) => {
                console.log("Resolving books for author: " + author.name);
                bookList = [];
                books.forEach(function(book) {
                    if (book.authorId == author.id) {
                        console.log("Book Found: " + book.name);
                        bookList.push(book);
                    }
                });
                return bookList
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'This represents a book written by an author',
    fields: () => ({
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLInt)},
        author: {
            type: AuthorType,
            resolve: (book) => {
                return authors.find(author => author.id == book.authorId)
            }
        }
    })
})

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () =>({
        books: {
            type: new GraphQLList(BookType),
            description: 'List of Books',
            resolve: () => books,
        },
        authors: {
            type: new GraphQLList(AuthorType),
            description: 'List of Authors',
            resolve: () => authors,
        }
    })
})

const schema = new GraphQLSchema({
    query: RootQueryType
})

exports.schema = schema;