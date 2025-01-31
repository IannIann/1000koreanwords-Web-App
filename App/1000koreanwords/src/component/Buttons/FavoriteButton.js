import React from "react";
import '@app/style/favoritebutton.css'
export default class FavoriteButton extends React.Component {

    handleClick = () => {
        this.props.handleClick();
    };

    render() {
        return (
            <button className="component-favorite-button pi pi-star-fill"
                onClick={this.handleClick}>
            </button>
        );
    }
};
