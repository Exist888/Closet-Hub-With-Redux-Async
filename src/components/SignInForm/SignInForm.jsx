import { useState } from "react";
import { FormInput } from "../FormInput/FormInput.jsx";
import { Button } from "../Button/Button.jsx";
import { ButtonSeparator } from "../ButtonSeparator/ButtonSeparator.jsx";
import { Notification } from "../Notification/Notification.jsx";
import { signInUserWithEmailAndPassword, 
    signInWithGooglePopup 
} from "../../services/firebase/firebase.js";
import "./SignInForm.scss";

const defaultFormFields = {
    email: "",
    password: "",
}

export function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const [errorMsg, setErrorMsg] = useState(null);
    const { email, password } = formFields;

    function handleChange(event) {
        setErrorMsg(null);
        // Destructure input name and value when input changes
        const { name, value } = event.target;
        // Update state to new value where input changes while keeping remaining fields
        setFormFields({ ...formFields, [name]: value });
    }

    function resetFormFields() {
        setFormFields(defaultFormFields);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await signInUserWithEmailAndPassword(email, password);
            resetFormFields();
        } catch(error) {
            if (error.code === "auth/invalid-credential") {
                setErrorMsg("Invalid credentials. Please double check your inputs, or create an account.");
            } else {
                setErrorMsg("Credentials not found. Please try again.");
            }
        }
    }

    async function signInWithGoogle() {
        await signInWithGooglePopup();
    }

    return (
        <section className="sign-in-form-section">
            {errorMsg && (
                <Notification notificationClass="errorMsg">{errorMsg}</Notification>
            )}
            <h1>Already have an account?</h1>
            <p> 
                <i aria-hidden="true" className="fa-solid fa-lock"></i>
                <span><span className="bold">Sign in</span> with your email and password</span>
            </p>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Email"
                    id="sign-in-email" 
                    type="email" 
                    onChange={handleChange}
                    name="email" 
                    value={email}
                    minLength={5}
                    maxLength={75}
                    autoComplete="new-email"
                />

                <FormInput
                    label="Password"
                    id="sign-in-password" 
                    type="password" 
                    onChange={handleChange}
                    name="password" 
                    value={password}
                    minLength={8}
                    maxLength={35}
                    autoComplete="new-password"
                />
                <Button buttonClass="signIn" type="submit">Sign In</Button>
            </form>
            <ButtonSeparator />
            <Button buttonClass="googleSignIn" onClick={signInWithGoogle}>
                <i className="fa-brands fa-google"></i>
                Sign In With Google
            </Button>
        </section>
    );
}