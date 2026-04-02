import React from 'react';
import { toast } from 'react-toastify';
import '@app/style/deckname.css';

export default class DeckName extends React.Component {

    state = { theme: this.props.deck.theme || '' };
    previousValue = '';

    componentDidUpdate(prevProps) {
        if (prevProps.deck.theme !== this.props.deck.theme) {
            this.setState({ theme: this.props.deck.theme });
        }
    }
    
    setValue = (value) => {
        this.setState({ theme: value });
    };

    handleBlur = () => {
        const { theme } = this.state;

        if (theme === '') {
            this.setState({ theme: this.previousValue });
            toast.warning('Deck theme cannot be empty');
        } else if (theme !== this.previousValue) {
            this.props.saveDeckTheme(theme);
        }
    };

    handleFocus = () => {
        this.previousValue = this.state.theme;
    };

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            e.target.blur();
        }
    };

    render() {
        const { theme } = this.state;

        return (
            <div className="component-deck-name">
                <div className="deck-name-group">
                    <input
                        id="theme"
                        className="deck-name-field"
                        placeholder="Deck theme"
                        maxLength={40}
                        value={theme}
                        spellCheck="false"
                        onFocus={this.handleFocus}
                        onBlur={this.handleBlur}
                        onChange={(e) => this.setValue(e.target.value)}
                        onKeyDown={this.handleKeyPress}
                    />
                    <label htmlFor="theme" className="deck-name-label">Deck theme</label>
                </div>
            </div>
        );
    }
}