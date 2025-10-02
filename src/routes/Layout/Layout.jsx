import { Fragment } from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../../components/Header/Header.jsx";

export function Layout() {
    return (
        <Fragment>
            <header>
                <Header />
            </header>
            <main>
                <Outlet />
            </main>
        </Fragment>
    );
}