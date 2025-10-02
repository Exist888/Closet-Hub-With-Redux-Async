import { Routes, Route } from "react-router-dom";
import { ShopPage } from "../../pages/ShopPage/ShopPage.jsx";
import { CategoryPage } from "../../pages/CategoryPage/CategoryPage.jsx";
import "./Shop.scss";

export function Shop() {
    return (
        <Routes>
            <Route index element={<ShopPage />} />
            <Route path=":category" element={<CategoryPage />} />
        </Routes>
    );
}