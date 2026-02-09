import React from "react";
import '@app/style/loader.css';

export default class Loader extends React.Component {

    render() {
        return (
            <div className="component-loader">
                <span className="loader"></span>
            </div>
        );
    }
}