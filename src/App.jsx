import { Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./routes/Layout/Layout.jsx";
import { Home } from "./routes/Home/Home.jsx";
import { Shop } from "./routes/Shop/Shop.jsx";
import { Auth } from "./routes/Auth/Auth.jsx";
import { Checkout } from "./routes/Checkout/Checkout.jsx";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop.jsx";
import { onAuthStateChangedListener, 
    createUserDocumentFromAuth,
    getCategoriesAndDocuments 
} from "./services/firebase/firebase.js";
import { setCurrentUser } from "./store/user/userAction.js";
import { setCategories } from "./store/categories/categoriesAction.js";
import "./App.scss";

export function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // Call listener to track auth state changes throughout app
        // Argument for user parameter is passed in automatically by Firebase - see services/firebase.js
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            dispatch(setCurrentUser(user));
        });

        // Stop listener on unmount
        return unsubscribe;
    }, []);

    useEffect(() => {
        async function getCategories() {
            const categoryObjectsArray = await getCategoriesAndDocuments();
            dispatch(setCategories(categoryObjectsArray));
        }
        getCategories();
    }, []);

    return (
        <Fragment>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="shop/*" element={<Shop />} />
                    <Route path="auth" element={<Auth />} />
                    <Route path="checkout" element={<Checkout />} />
                </Route>
            </Routes>
        </Fragment>
    );
}