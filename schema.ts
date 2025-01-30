

export const schema =`#graphql

    type Ciudad {
        nombre: String!
        poblacion: Int!
        pais: String!
        latitud: Float! 
        longitud: Float!
        timezone: String!
    }

    type Query{
        getCiudad(id: String!): Ciudad!
        getCiudades: [Ciudad]!
    }

    type Mutation{
        addCiudad(nombre: String!,pais:String!): Ciudad!
        updateCiudad(id: String!,nombre: String, pais: String): Ciudad
        deleteCiudad(id: String!): Boolean
    }

`