import React from 'react';

class CardAnswer extends React.Component {

    renderEditable(){
        const { 
            id, 
            value, 
            handleKeyPress, 
            onChangeAnswer, 
            handleBlur, 
            handleFocus 
        } = this.props;

        return (
            <>
                <div className="card-textarea-group">
                    <textarea
                        cols="16"
                        maxLength={150}
                        id={id}
                        className="card-field answer-field"
                        placeholder="Answer"
                        title={value}
                        value={value}
                        spellCheck="false"
                        onKeyDown={(e) => handleKeyPress(e)}
                        onChange={(e) => onChangeAnswer(e)}
                        onBlur={(e) => handleBlur(e)}
                        onFocus={handleFocus}
                    />
                    <label htmlFor={id} className="card-label">Answer</label>
                </div>
            </>
        );
    }

    renderPlain(){
        const { 
            id, 
            value
        } = this.props;

        return (
            <>
                <div className="card-textarea-group">
                    <textarea
                        cols="16"
                        maxLength={85}
                        id={id}
                        className="card-field answer-field"
                        placeholder="Answer"
                        value={value}
                        disabled
                    />
                    <label htmlFor={id} className="card-label">Answer</label>
                </div>
            </>
        );
    }

    renderInPlay(){
        const {value} = this.props;
        return (
            <>
                <div className='card-answer'>
                    {value}
                </div>
            </>
        )
    }

    renderAnswer()
    {
        const {inPlay, editable} = this.props;

        if (inPlay) {
            return this.renderInPlay();
        } else if (editable) {    
            return this.renderEditable();
        } else {
            return this.renderPlain();
        }
    }

    render() {
        return (
            <>
                {this.renderAnswer()}
            </>
        )
    }
}

export default CardAnswer;