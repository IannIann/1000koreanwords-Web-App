import React from 'react';
import '@app/style/buttonpushable.css';

class ButtonPushable extends React.Component {

  renderSpan(label, isIcon, size)
  {
    if (isIcon) {
      return (
        <span className={`button-front pi ${label}`}/>
      );
    }
    else {
      return (
        <span className={`button-front ${size}`}>
          {label}
        </span>
      )
    }
  }

  render() {
    const { onClick, label, color, isIcon, size } = this.props;
    return (
        <button onClick={onClick} className={`button-pushable ${color}`} role="button">
            <span className="button-edge"></span>
            {this.renderSpan(label, isIcon, size)}
        </button>
    );
  }
}

export default ButtonPushable;