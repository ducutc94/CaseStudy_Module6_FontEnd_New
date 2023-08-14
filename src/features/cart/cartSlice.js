import {createSlice, current} from '@reduxjs/toolkit'

const initialState = {
    items: [],
    totalQuantity: 0,
    totalMoney: 0
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addCart: (state, action) => {
            const foodBuy = action.payload.food;
            const quantity = action.payload.quantity;
            const existingItemIndex = state.items.findIndex(item => item.food.id === foodBuy.id);
            if (existingItemIndex === -1) {
                // New item
                const newItem = {
                    food: foodBuy,
                    quantity: quantity,
                    money: quantity * foodBuy.price
                };
                const updatedItems = [...state.items, newItem];
                const updatedTotalQuantity = state.totalQuantity + 1; // Increment the total quantity
                const updatedTotalMoney = state.totalMoney + newItem.money;
                const updatedState = {
                    ...state,
                    items: updatedItems,
                    totalQuantity: updatedTotalQuantity,
                    totalMoney: updatedTotalMoney
                };

                localStorage.setItem('cart', JSON.stringify(updatedState));
                return updatedState;
            } else {
                // Existing item
                const updatedItems = state.items.map((item, index) => {
                    if (index === existingItemIndex) {
                        return {
                            ...item,
                            quantity: item.quantity + quantity,
                            money: (item.quantity + quantity) * foodBuy.price
                        };
                    }
                    return item;
                });
                const updatedTotalQuantity = state.totalQuantity ; // Increment the total quantity
                const updatedTotalMoney = state.totalMoney + (quantity * foodBuy.price);
                const updatedState = {
                    ...state,
                    items: updatedItems,
                    totalQuantity: updatedTotalQuantity,
                    totalMoney: updatedTotalMoney
                };
                localStorage.setItem('cart', JSON.stringify(updatedState));
                return updatedState;
            }
        },
        setCart: (state, action) => {
            let cart = localStorage.getItem('cart');
            if (cart) {
                let data = JSON.parse(cart);
                state.items = data.items;
                state.totalQuantity = data.totalQuantity;
                state.totalMoney = data.totalMoney;
            } else {
                state.items = [];
                state.totalQuantity = 0;
                state.totalMoney = 0;
            }
        },
        deleteItem: (state, action) => {

            const indexItem = action.payload.index;
            const food = action.payload.food;
            let cart = localStorage.getItem('cart');
            let data = JSON.parse(cart);
            if (data) {
                const deletedItem = data.items[indexItem];
                const deletedItemPrice = deletedItem.money;
                data.items.splice(indexItem, 1);
                data.totalQuantity--;
                // Trừ tiền của phần tử bị xóa khỏi tổng tiền
                data.totalMoney -= deletedItemPrice;
                state.items = data.items;
                state.totalQuantity = data.totalQuantity;
                state.totalMoney = data.totalMoney;
                localStorage.setItem('cart', JSON.stringify(data));
            }
        },
        setStatus: (state, action) => {
            let id = action.payload.food.statusProducts
            console.log(id)
        },
        deleteAll: (state, action) => {
            state.items = []
            state.totalQuantity = 0
            state.totalMoney = 0
            localStorage.setItem('cart', JSON.stringify(state))
        }
    },

})

export const {addCart, setCart, deleteItem, setStatus, deleteAll} = cartSlice.actions

export default cartSlice.reducer