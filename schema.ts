

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
        getCiudades: [Ciudad!]!
    }


`