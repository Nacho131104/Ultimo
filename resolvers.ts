import { Collection } from "mongodb"
import type { CiudadModel } from "./types.ts"
import { ObjectId } from "../../../../AppData/Local/deno/npm/registry.npmjs.org/bson/6.10.1/bson.d.ts";
import { GraphQLError } from "../../../../AppData/Local/deno/npm/registry.npmjs.org/graphql/16.10.0/index.d.ts";

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
    }
}