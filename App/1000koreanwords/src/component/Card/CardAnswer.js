import React from 'react';

class CardAnswer extends React.Component {

    constructor(props) {
        super(props);
        this.answerRef = React.createRef();
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
        const el = this.answerRef.current;
        if (!el) return;

        el.style.fontSize = '';
        const parent = el.parentElement;
        let fontSize = parseFloat(getComputedStyle(el).fontSize);

        // Shrink until the answer fits within 50% of the card height, down to 12px minimum.
        while (el.scrollHeight > parent.clientHeight * 0.5 && fontSize > 12) {
            fontSize -= 1;
            el.style.fontSize = `${fontSize}px`;
        }
    }

    renderEditable() {
        const { id, value, handleKeyPress, onChangeAnswer, handleBlur, handleFocus } = this.props;

        return (
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
                    onKeyDown={handleKeyPress}
                    onChange={onChangeAnswer}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
                <label htmlFor={id} className="card-label">Answer</label>
            </div>
        );
    }

    renderPlain() {
        const { id, value } = this.props;

        return (
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
        );
    }

    renderInPlay() {
        const { value } = this.props;

        return (
            <div className="card-answer" ref={this.answerRef}>
                {value}
            </div>
        );
    }

    render() {
        const { inPlay, editable } = this.props;

        if (inPlay) return this.renderInPlay();
        if (editable) return this.renderEditable();
        return this.renderPlain();
    }
}

export default CardAnswer;