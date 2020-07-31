export enum ProductType{
    'Hardware',
    'Software'
} 

export interface IProduct{
    id:number;
    name:string;
    price:number;
    type:ProductType;
    description:string;
}