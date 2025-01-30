import { OptionalId}from"mongodb"

export type CiudadModel = OptionalId<{
    poblacion: number,
    nombre: string,
    pais: string,
    latitud: number,
    longitud: number,
    timezone: string,
}>


//https://api.api-ninjas.com/v1/city
export type APIcity ={
    latitude: number,
    longitude: number,
    population: number,
}

//https://api.api-ninjas.com/v1/timezone
export type APItimezone ={
    timezone: string,
}