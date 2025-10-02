import "./FormInput.scss";

export function FormInput({ label, id, type, onChange, name, value, minLength, maxLength, autoComplete }) {
    return (
        <div className="label-and-input-container">
            <label htmlFor={id}>{label}</label>
            <input 
                id={id} 
                type={type}
                required 
                onChange={onChange}
                name={name}
                value={value}
                minLength={minLength}
                maxLength={maxLength}
                autoComplete={autoComplete}
            />
        </div>
    );
}