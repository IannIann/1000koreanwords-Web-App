import '@app/style/buttonfavorite.css';

export default function ButtonFavorite({ handleClick, displayButtons }) {
    if (!displayButtons) return null;

    return (
        <button className="component-button-favorite pi pi-star-fill" onClick={handleClick} />
    );
}