import './App.css';
import Header from "./layout/Header";
import Footer from "./layout/Footer";
import {Route, Routes} from "react-router-dom";
import List from "./food/view/List";
import View from "./food/view/View";
import Create from "./food/form/Create";
import Update from "./food/form/Update";
import ListShop from "./shop/ListShop";
import CreateShop from "./shop/CreateShop";
import UpdateShop from "./shop/UpdateShop";
import ListVoucher from "./voucher/ListVoucher";
import CreateVoucher from "./voucher/CreateVoucher";
import UpdateVoucher from "./voucher/UpdateVoucher";
import Cart from "./cart/Cart";
import Search from "./food/view/Search";

function App() {
    return (
        <>
            <Header/>
            <div className={`container-content`}>
                <Routes>
                    <Route path={'/'} element={<List />}></Route>
                    <Route path={'/view-food/:id'} element={<View/>}></Route>
                    <Route path={'/create-food/:id'} element={<Create/>}></Route>
                    <Route path={'/update-food/:id'} element={<Update/>}></Route>

                    <Route path={'/shop'} element={<ListShop />}></Route>
                    <Route path={'/create-shop'} element={<CreateShop />}></Route>
                    <Route path={'/update-shop/:id'} element={<UpdateShop />}></Route>

                    <Route path={'/carts'} element={<Cart />}></Route>
                    <Route path={'/search-food/:search'} element={<Search/>}></Route>

                    <Route path={'/voucher'} element={<ListVoucher />}></Route>
                    <Route path={'/create-voucher'} element={<CreateVoucher />}></Route>
                    <Route path={'/update-voucher/:id'} element={<UpdateVoucher />}></Route>

                </Routes>
            </div>
            <Footer/>
        </>
    );
}

export default App;
