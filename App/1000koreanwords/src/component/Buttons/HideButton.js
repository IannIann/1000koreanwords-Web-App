import React from "react";
import '@app/style/hidebutton.css'
export default class HideButton extends React.Component {

    handleClick = () => {
        this.props.handleClick();
    };

    render() {
        return (
            <button className="component-hide-button pi pi-eye-slash"
                onClick={this.handleClick}>
            </button>
        );
    }
};