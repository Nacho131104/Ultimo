import {Decimal128, OptionalId}from"mongodb"

export type CiudadModel = OptionalId<{
    poblacion: number,
    nombre: string,
    pais: string,
    timezone: string,
}>


//https://api.api-ninjas.com/v1/city
export type APIcity ={
    latitude: number,
    longitude: number,
    population: number,
}