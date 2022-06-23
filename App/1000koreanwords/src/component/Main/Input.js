import React from "react";

export default class Input extends React.Component {

    handleChange = (e) => {
        this.props.handler(e)
    }

    render() {
        return (
            <div>
                <input
                    type={this.props.type}
                    className="form-control"
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.handleChange}
                    required
                />
            </div>
        );
    }
}