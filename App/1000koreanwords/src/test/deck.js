// Deck.js
import React, { Component } from 'react';
import Modal from './Modal';
import './deck.css';

class Deck extends Component {
  state = {
    modalClass: '',
    testMessage: ''
  };

  openModal = () => {
    this.setState({ modalClass: 'display', testMessage: 'test' });
    document.body.classList.add('modal-active');
  }

  closeModal = () => {
    this.setState({ modalClass: 'display out' });
    document.body.classList.remove('modal-active');
  }

  componentDidMount() {
    document.querySelectorAll('.deck-stack').forEach(cardStack => {
      const card3 = cardStack.querySelector('.deck-3');
      if (card3) {
        card3.addEventListener('mouseenter', () => 
          cardStack.querySelector('.deck-2')?.classList.add('in-between')
        );
        card3.addEventListener('mouseleave', () => 
          cardStack.querySelector('.deck-2')?.classList.remove('in-between')
        );
      }
    });
  }


  render() {
    const { modalClass } = this.state;

    return (
        <>
                <div className="stack-grid-container">
                    <div className="stack-grid">
                        <div className="deck-stack">
                            <div className="component-deck-test deck-1">Card 1</div>
                            <div className="component-deck-test deck-2">Card 2</div>
                            <div className="component-deck-test deck-3">Card 3</div>
                        </div>
                        <div className="deck-stack">
                            <div className="component-deck-test deck-1">Card 1</div>
                            <div className="component-deck-test deck-2">Card 2</div>
                            <div className="component-deck-test deck-3">Card 3</div>
                        </div>
                        <div className="deck-stack">
                            <div className="component-deck-test deck-1">Card 1</div>
                            <div className="component-deck-test deck-2">Card 2</div>
                            <div className="component-deck-test deck-3">Card 3</div>
                        </div>
                    </div>
                </div>
        </>
    );
  }
}

export default Deck;
