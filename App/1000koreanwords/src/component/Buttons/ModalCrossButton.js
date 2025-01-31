import React from "react";
import '@app/style/modalcrossbutton.css'
export default class ModalCrossButton extends React.Component {

    handleClick = () => {
        this.props.handleClick();
    };

    render() {
        return (
            <button className="component-modal-cross-button"
                onClick={this.handleClick}>
            </button>
        );
    }
};
