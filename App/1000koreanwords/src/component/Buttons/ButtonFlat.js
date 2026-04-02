import '@app/style/buttonflat.css';

export default function ButtonFlat({ onClick, label, disabled, customClass }) {
    return (
        <button disabled={disabled} onClick={onClick} className={`button-flat ${customClass}`}>
            {label}
        </button>
    );
}