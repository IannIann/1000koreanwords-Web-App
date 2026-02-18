import React from 'react';
import '@app/style/buttonghost.css';

class ButtonGhost extends React.Component {

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
    const { onClick, label, color, isIcon, size, disabled, position } = this.props;
    return (
        <button disabled={disabled} onClick={onClick} className={`button-ghost ${position} ${color}`} role="button">
            {label}
        </button>
    );
  }
}

export default ButtonGhost;