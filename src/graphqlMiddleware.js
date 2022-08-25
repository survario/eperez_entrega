import { buildSchema } from 'graphql'
import { graphqlHTTP } from 'express-graphql'
import {obtenerProductos, obtenerUnProducto, agregarProducto, borrarProducto} from './controller/ProductosControllerGraphql.js'

const schema = buildSchema(`
  input ProductoInput {
    name: String
    description: String
    category: String
    code: Int 
    image: String
    price: Int
    stock: Int
  }
  type Producto {
    id: ID!
    name: String
    description: String
    category: String
    code: Int  
    image: String
    price: Int    
    stock: Int
  }
  type Query {
    obtenerProductos: [Producto]
    obtenerUnProducto(id: ID!): Producto
  }
  type Mutation {
    agregarProducto(datos: ProductoInput!): Producto
    borrarProducto(id: ID!): Producto
  }
`)

export const graphqlMiddleware = graphqlHTTP({
  schema: schema,
  rootValue: {
    obtenerProductos,
    obtenerUnProducto,
    borrarProducto,
    agregarProducto,
  },
  graphiql: true,
})