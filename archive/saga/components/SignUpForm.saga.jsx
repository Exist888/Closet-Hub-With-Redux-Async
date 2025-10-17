import { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // FOR SAGA
import { FormInput } from "../FormInput/FormInput.jsx";
import { Button } from "../Button/Button.jsx";
import { ButtonSeparator } from "../ButtonSeparator/ButtonSeparator.jsx";
import { Notification } from "../Notification/Notification.jsx";
import { signUpStart, googleSignInStart, clearUserError } from "../../store/user/userAction.js"; // FOR SAGA
import { selectUserError } from "../../store/user/userSelector.js"; // FOR SAGA
import "./SignUpForm.scss";

const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}

export function SignUpForm() {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;
    // FOR SAGA:
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
        
        if (password !== confirmPassword) {
            alert("Passwords don't match. Please try again.");
            return;
        }
        // FOR SAGA: Remove try/catch since async logic happens inside of the Saga
        dispatch(signUpStart(email, password, displayName));
        resetFormFields();
    }

    async function signInWithGoogle() {
        // FOR SAGA:
        dispatch(googleSignInStart());
    }

    return (
        <section className="sign-up-form-section">
            {/* FOR SAGA */}
            {error && (
                <Notification notificationClass="errorMsg">
                    {error.code === "auth/email-already-in-use" 
                        ? "Cannot create account. Email already in use."
                        : "Error creating account. Please try again or continue with Google instead."
                    }
                </Notification>
            )}
            <h1>New to Closet Hub?</h1>
            <p>
                <i aria-hidden="true" className="fa-solid fa-user-plus"></i>
                <span><span className="bold">Sign up</span> with your name, email, and password</span>
            </p>
            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Name"
                    id="name" 
                    type="text" 
                    onChange={handleChange}
                    name="displayName" 
                    value={displayName}
                    minLength={3}
                    maxLength={75}
                    autoComplete="new-name"
                />

                <FormInput
                    label="Email"
                    id="email" 
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
                    id="password" 
                    type="password" 
                    onChange={handleChange}
                    name="password" 
                    value={password}
                    minLength={15}
                    maxLength={35}
                    autoComplete="new-password"
                />

                <FormInput
                    label="Confirm Password"
                    id="confirm-password" 
                    type="password" 
                    required 
                    onChange={handleChange}
                    name="confirmPassword"
                    value={confirmPassword} 
                    minLength={15}
                    maxLength={35}
                    autoComplete="new-confirm-password"
                />

                <Button buttonClass="signUp" type="submit">Sign Up</Button>
            </form>
            <ButtonSeparator />
            <Button buttonClass="googleContinue" onClick={signInWithGoogle}>
                <i className="fa-brands fa-google"></i>
                Continue With Google
            </Button>
        </section>
    );
}