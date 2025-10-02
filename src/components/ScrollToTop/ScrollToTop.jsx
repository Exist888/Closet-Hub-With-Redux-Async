import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
    // Destructure url pathname from useLocation object
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [pathname]);

    return null;
}