import { IAction } from '../../redux/IAction';
import { IAddOrUpdateProductPageState } from './Product';

export const UPDATE_PRODUCT_STATE = 'update_product_state';
export const UPDATE_OPEN_STATE = 'update_open_state';


export const initState: IAddOrUpdateProductPageState = {
    open: false,
    id: '',
    name: '',
    price: '',
    type: '',
    description: ''
};
export const reducer = (state: any = initState, action: IAction) => {
    let newState: IAddOrUpdateProductPageState = JSON.parse(JSON.stringify(state));
    switch (action.type) {
        case UPDATE_PRODUCT_STATE:
            newState={...newState,...action.value}
            break;
        case UPDATE_OPEN_STATE:
            newState.open = action.value.open;
            break;
        default:
    }
    return newState;
};

// export const editReducer = (state: any = initState, action: IAction) => {
//     let newState: IAddOrUpdateProductPageState = JSON.parse(JSON.stringify(state));
//     switch (action.type) {
//         case UPDATE_PRODUCT_STATE:
//             newState.name = action.value.name;
//             newState.price = action.value.price;
//             newState.type = action.value.type;
//             newState.description = action.value.description;
//             break;
//         case UPDATE_OPEN_STATE:
//             newState.open = action.value.open;
//             break;
//         default:
//     }
//     return newState;
// };
