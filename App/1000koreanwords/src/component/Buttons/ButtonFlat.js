import React from 'react';
import '@app/style/buttonflat.css';

class ButtonFlat extends React.Component {
  render() {
    const { onClick, label, disabled, customClass} = this.props;
    return (
        <button disabled={disabled} onClick={onClick} className={`button-flat ${customClass}`} role="button">
            {label}
        </button>
    );
  }
}

export default ButtonFlat;