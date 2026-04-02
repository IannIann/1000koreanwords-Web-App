import '@app/style/buttoncross.css';

export default function ButtonCross({ handleClick }) {
    return (
        <button className="component-button-cross" onClick={handleClick} />
    );
}