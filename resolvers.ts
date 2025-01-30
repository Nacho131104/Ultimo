import { Collection } from "mongodb"
import type { CiudadModel } from "./types.ts"
import { GraphQLError } from "graphql"
import { ObjectId } from "mongodb"
import { APIcity } from "./types.ts";

type contexto ={
    CiudadColleccion: Collection<CiudadModel>,
}
 type argsgetciudad ={
    id: string,
}
export const resolvers ={
    Query:{
        getCiudad:async(_:unknown,args:argsgetciudad,ctx:contexto):Promise<CiudadModel> =>{
            const encontrada= await ctx.CiudadColleccion.findOne({_id:new ObjectId(args.id)});
            if(!encontrada)throw new GraphQLError("Ciudad no encontrada");
            return encontrada;
        },

        getCiudades:async(_:unknown,__:unknown,ctx:contexto): Promise<CiudadModel[]|null> =>{
            const ciudades = await ctx.CiudadColleccion.find().toArray();
            if(!ciudades) throw new GraphQLError("No hay ciudades");
            return ciudades;
        },
    },


    Ciudad:{
        id: (parent: CiudadModel): string => parent._id!.toString(),

        timezone:async(parent:CiudadModel):Promise<string> =>{
            const API_KEY = Deno.env.get("API_KEY");
            if(!API_KEY)throw new GraphQLError("Se necesita una api key");
            
            //https://api.api-ninjas.com/v1/city?name=
            const url =`https://api.api-ninjas.com/v1/city?name=${parent.nombre}`;
            const data = await fetch(url,{
                headers:{
                    "X-API-KEY":API_KEY,
                }
            })
            if(data.status!==200)throw new GraphQLError("Error en api ninja");

            const response:APIcity = await data.json();
            if(!response)throw new GraphQLError("Ciudad no encontrada");
            const latitud = response.latitude;
            const longitud = response.longitude;

                

        }
    }
}