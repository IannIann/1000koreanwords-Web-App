import '@app/style/buttonhide.css';

export default function ButtonHide({ handleClick, display = true }) {
    if (!display) return null;

    return (
        <button className="component-button-hide pi pi-eye-slash" onClick={handleClick} />
    );
}
