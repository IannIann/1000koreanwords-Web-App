import React from 'react';
import '@app/style/buttonghost.css';

class ButtonGhost extends React.Component {

  renderSpan(label, isIcon)
  {
    if (isIcon) {
      return (
        <span className={`pi ${label}`}/>
      );
    }
    else {
      return (
        <span>
          {label}
        </span>
      )
    }
  }

  render() {
    const { onClick, label, color, isIcon, disabled, position } = this.props;
    return (
        <button disabled={disabled} onClick={onClick} className={`button-ghost ${position ? position : ''} ${color} ${isIcon ? 'icon' : ''}`} role="button">
            {this.renderSpan(label, isIcon)}
        </button>
    );
  }
}

export default ButtonGhost;