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

export interface IAddOrUpdateProductPageState {
    open: boolean;
    id: string;
    name: string;
    price: string;
    type: string;
    description: string;
}