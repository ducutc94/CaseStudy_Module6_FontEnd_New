import {createSlice, current} from '@reduxjs/toolkit'

const initialState = {
    items: [],
}
const user = JSON.parse(localStorage.getItem("user"))

export const cartMerchantSlice = createSlice({
    name: 'cartMerchant',
    initialState,
    reducers: {
        addCartMerchant: (state, action) => {
            let list = action.payload;
            console.log(list)
           state.items = list;
            localStorage.setItem('list', JSON.stringify(state))
        },
        setCartMerchant: (state, action) => {
            const list = localStorage.getItem('list');
            if (list) {
                const data = JSON.parse(list);
                if (Array.isArray(data.items)) {
                    return { ...state, items: data.items };
                }
            }
            return state; // Return the unchanged state if there's an issue
        },
        confirmOrder: (state, action) => {
            const indexItem = action.payload.index;
            let cartMerchant = localStorage.getItem('list');
            let data = JSON.parse(cartMerchant);
            if (data && Array.isArray(data.items)) {
                const updateItem = data.items[indexItem];
                updateItem.statusProductsCarts = "0";
                data.items[indexItem] = updateItem;
                localStorage.setItem('list', JSON.stringify(data)); // Store updated data in localStorage
                return { ...state, items: data.items };
            }
            return state; // Return the unchanged state if there's an issue
        },
        deleteByMerchant: (state, action) => {
            const indexItem = action.payload.index;
            let cartMerchant = localStorage.getItem('list');
            let data = JSON.parse(cartMerchant);
            if (data) {
                const updatedItems = data.items.map((item, index) => {
                    if (index === indexItem) {
                        return {
                            ...item,
                            statusProductsCarts: "1"
                        };
                    }
                    return item;
                });
                const updatedData = { ...data, items: updatedItems };
                localStorage.setItem('list', JSON.stringify(updatedData));
                return { ...state, items: updatedItems };
            }
            return state;
        },
    },
})

export const {addCartMerchant, confirmOrder, setCartMerchant,deleteByMerchant} = cartMerchantSlice.actions

export default cartMerchantSlice.reducer