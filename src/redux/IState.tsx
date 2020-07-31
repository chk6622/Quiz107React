import { IProduct, ProductType } from '../components/Product';
export interface IProductState{
    nameQry:string|null,
    priceQry:number|null,
    typeQry:ProductType|null,
    products:IProduct[]
}