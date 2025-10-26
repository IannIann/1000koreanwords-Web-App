import React from "react";
import '@app/style/input.css';

export default class Input extends React.Component {

    handleChange = e => {
        this.props.handler(e)
    }

    render() {

        const { id, value, type, placeholder } = this.props;
        return (
            <div className="component-input">
                <div className="input-group">
                    <input
                        id={id}
                        className="input-field"
                        placeholder={placeholder}
                        type={type}
                        value={value}
                        onChange={this.handleChange}
                    />
                    <label htmlFor={id} className="input-field-label"> {placeholder}</label>
                </div>
            </div>
        );
    }
}