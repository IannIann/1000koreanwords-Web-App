import React from 'react';

class CardQuestion extends React.Component {

    constructor(props) {
        super(props);
        this.questionRef = React.createRef();
    }

    componentDidMount() {
        this.shrinkToFit();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.value !== this.props.value) {
            this.shrinkToFit();
        }
    }

    shrinkToFit() {
        const el = this.questionRef.current;
        if (!el) return;

        el.style.fontSize = '';
        const parent = el.parentElement;
        let fontSize = parseFloat(getComputedStyle(el).fontSize);

        while (el.scrollHeight > parent.clientHeight * 0.2 && fontSize > 12) {
            fontSize -= 1;
            el.style.fontSize = `${fontSize}px`;
        }
    }

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
                        title={value || ""}
                        value={value || ""} 
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
                        value={value || ""} 
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
                <div className='card-question'  ref={this.questionRef}> 
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