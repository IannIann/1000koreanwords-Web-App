import '@app/style/buttonfavorite.css';

export default function ButtonFavorite({ handleClick, display = true }) {
    if (!display) return null;

    return (
        <button className="component-button-favorite pi pi-star-fill" onClick={handleClick} />
    );
}