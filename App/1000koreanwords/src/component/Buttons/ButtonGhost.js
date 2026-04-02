import '@app/style/buttonghost.css';

export default function ButtonGhost({ onClick, label, color, isIcon, disabled, position }) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`button-ghost ${position ? position : ''} ${color} ${isIcon ? 'icon' : ''}`}
        >
            {isIcon ? <span className={`pi ${label}`} /> : <span>{label}</span>}
        </button>
    );
}