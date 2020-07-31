import { IProductState } from './IState';

export interface IProductProps extends IProductState{
    updateQryParameters:any,
    queryData:any,
    addData:any,
    updateData:any,
    deleteData:any,
}