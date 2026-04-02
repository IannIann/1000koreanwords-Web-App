import '@app/style/input.css';

export default function Input({ id, value, type, placeholder, handler }) {
    return (
        <div className="component-input">
            <div className="input-group">
                <input
                    id={id}
                    className="input-field"
                    placeholder={placeholder}
                    type={type}
                    value={value}
                    onChange={handler}
                />
                <label htmlFor={id} className="input-field-label">{placeholder}</label>
            </div>
        </div>
    );
}
