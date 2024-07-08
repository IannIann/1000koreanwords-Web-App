//make a new react card component 
//it should have a question and answer as props
//it should render a card with the question and answer
//the design should be a square with a rounded border
//the question should be on top of the card
//the answer should be below the question
//the question and answer should be centered
//the question should be bold
//question and answer should be separated by a line
//make it beautiful

import React, { Component } from 'react';

// class Card extends Component {
//     render() {
//         const { question, answer } = this.props;

//         return (
//             <div style={{ border: '1px solid black', borderRadius: '5px', width: '1200px', height: '150px', padding: '10px', textAlign: 'center' }}>
//                 <div style={{ fontWeight: 'bold' }}>{question}</div>
//                 <hr />
//                 <div>{answer}</div>
//             </div>
//         );
//     }
// }

import '@app/style/card.css'

class Card extends React.Component {
    render() {
        const { question, answer } = this.props;

        return (
            <div className="card">
                <div className="question">{question}</div>
                <hr />
                <div className="answer">{answer}</div>
            </div>
        );
    }
}

export default Card;
