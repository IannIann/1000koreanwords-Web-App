import React from 'react';
import '@app/style/buttonflat.css';

class ButtonFlat extends React.Component {

  renderSpan(label, isIcon, size)
  {
    if (isIcon) {
      return (
        <span className={`button-front pi ${label}`}/>
      );
    }
    else {
      return (
        <span className={`button-front ${size ? size : ''}`}>
          {label}
        </span>
      )
    }
  }

  render() {
    const { onClick, label, color, disabled, customClass } = this.props;
    return (
        <button disabled={disabled} onClick={onClick} className={`button-flat ${customClass}`} role="button">
            {label}
        </button>
    );
  }
}

export default ButtonFlat;