import { Collection } from "mongodb"
import type { CiudadModel } from "./types.ts"
import { GraphQLError } from "graphql"
import { ObjectId } from "mongodb"
import { parentPort } from "worker_threads";

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
        }
    }
}