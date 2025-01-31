import React from 'react';

class CardQuestion extends React.Component {

    renderEditable() {
        const { 
            id, 
            value, 
            handleKeyPress, 
            onChangeQuestion, 
            handleBlur, 
            handleFocus 
        } = this.props;

        return (
            <>
                <div className="card-input-group">
                    <input
                        id={id}
                        className="card-field"
                        placeholder="Question"
                        title={value}
                        value={value}
                        maxLength={30}
                        spellCheck="false"
                        onKeyDown={(e) => handleKeyPress(e)}
                        onChange={(e) => onChangeQuestion(e)}
                        onBlur={(e) => handleBlur(e)}
                        onFocus={handleFocus}
                    />
                    <label htmlFor={id} className="card-label">Question</label>
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
                <div className="card-input-group">
                    <input
                        id={id}
                        className="card-field"
                        placeholder="Question"
                        value={value}
                        disabled="disabled"
                    />
                    <label htmlFor={id} className="card-label">Question</label>
                </div>
            </>
        );
    }

    renderInPlay(){

        const {value} = this.props;
        return (
            <>
                <div className='card-question'> 
                    <div> {value} </div>
                </div>
            </>
        )
    }
    
    renderQuestion()
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
                {this.renderQuestion()}
            </>
        )
    }
}

export default CardQuestion;