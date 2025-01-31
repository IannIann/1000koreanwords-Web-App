// Modal.js
import React, { Component } from 'react';
// import './modal2.css';

class Modal extends Component {
  handleBackgroundClick = (event) => {
    if (event.target.className.includes('modal-background')) {
      this.props.onClose();
    }
  }

  renderHtml() {
    return (<>  </>
    );
  }

  render() {
    const { modalClass } = this.props;

    return (
      <div id="modal-container" className={modalClass}>
        <div className="modal-background" onClick={this.handleBackgroundClick}>
          <div className="modal">
          {this.props.html()}
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
