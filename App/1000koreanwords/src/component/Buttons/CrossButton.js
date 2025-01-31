import React from "react";
import '@app/style/crossbutton.css'
export default class CrossButton extends React.Component {

    handleClick = () => {
        this.props.handleClick();
    };

    render() {
        return (
            <button className="component-cross-button"
                onClick={this.handleClick}>
            </button>
        );
    }
};
