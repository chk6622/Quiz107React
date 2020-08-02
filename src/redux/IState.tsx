import { IProduct, ProductType } from '../components/product/Product';
export interface IProductState{
    nameQry:string|null,
    priceQry:number|null,
    typeQry:ProductType|null,
    products:IProduct[]
}