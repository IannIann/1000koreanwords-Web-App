import '@app/style/buttonpronunciation.css';

export default function ButtonPronunciation({ handleClick, display = true }) {
    if (!display) return null;

    return (
        <button className="component-button-pronunciation pi pi-volume-up" onClick={handleClick} />
    );
}
