import '@app/style/modalbuttonclose.css';

export default function ModalButtonClose({ handleClick }) {
    return (
        <button className="component-modal-button-close" onClick={handleClick} />
    );
}