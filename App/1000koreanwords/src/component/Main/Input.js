import React from "react";

export default class Input extends React.Component {

    handleChange = e => {
        this.props.handler(e)
    }

    render() {

        const { name, value, type } = this.props;
        return (
            <div>
                <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={value}
                    onChange={this.handleChange}
                    required
                />
            </div>
        );
    }
}