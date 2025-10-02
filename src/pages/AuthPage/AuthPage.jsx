import { SignInForm } from "../../components/SignInForm/SignInForm.jsx";
import { SignUpForm } from "../../components/SignUpForm/SignUpForm.jsx";
import "./AuthPage.scss";

export function AuthPage() {
    return (
        <section className="auth-section elements-container">
            <SignInForm />
            <SignUpForm />
        </section>
    );
}