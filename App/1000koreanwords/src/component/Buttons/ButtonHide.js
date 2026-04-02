import '@app/style/buttonhide.css';

export default function ButtonHide({ handleClick, displayButtons }) {
    if (!displayButtons) return null;

    return (
        <button className="component-button-hide pi pi-eye-slash" onClick={handleClick} />
    );
}