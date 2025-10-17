import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // FOR SAGA
import { FormInput } from "../FormInput/FormInput.jsx";
import { Button } from "../Button/Button.jsx";
import { ButtonSeparator } from "../ButtonSeparator/ButtonSeparator.jsx";
import { Notification } from "../Notification/Notification.jsx";
import { emailSignInStart, googleSignInStart, clearUserError } from "../../store/user/userAction.js"; // FOR SAGA
import { selectUserError } from "../../store/user/userSelector.js"; // FOR SAGA
import "./SignInForm.scss";

const defaultFormFields = {
    email: "",
    password: "",
}

export function SignInForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    // FOR SAGA
    const dispatch = useDispatch();
    const error = useSelector(selectUserError);

    function handleChange(event) {
        // Destructure input name and value when input changes
        const { name, value } = event.target;

        // FOR SAGA: refactor after moving Saga to archive
        dispatch(clearUserError());

        // Update state to new value where input changes while keeping remaining fields
        setFormFields({ ...formFields, [name]: value });
    }

    function resetFormFields() {
        setFormFields(defaultFormFields);
    }

    async function handleSubmit(event) {
        event.preventDefault();
        // FOR SAGA: Remove try/catch since async logic happens inside of the Saga
        dispatch(emailSignInStart(email, password));
        resetFormFields();
}

    async function signInWithGoogle() {
        // FOR SAGA:
        dispatch(googleSignInStart());
    }

    return (
        <section className="sign-in-form-section">
            {/* FOR SAGA */}
            {error && (
                <Notification notificationClass="errorMsg">
                    {error.code === "auth/invalid-credential" 
                        ? "Invalid credentials. Please double check your inputs."
                        : "Credentials not found. Please try again."
                    }
                </Notification>
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
                    minLength={15}
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