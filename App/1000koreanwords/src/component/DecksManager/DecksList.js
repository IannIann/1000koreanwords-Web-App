import React from "react";
import Deck from "@app/component/Deck/Deck";
import ButtonAddDeck from "@app/component/Buttons/ButtonAddDeck";

export default class DecksList extends React.Component {

    state = {
        decks: [],
        stackOrders: JSON.parse(localStorage.getItem('stackedDecksOrder')) || {}
    };

    componentDidMount() {
        this.syncDecks();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.decks !== this.props.decks) {
            this.syncDecks();
        }
    }

    syncDecks() {
        const { decks, userDeckStates } = this.props;
        if (!decks || !userDeckStates || !userDeckStates.decks) return;

        const deckStates = userDeckStates.decks;
        const updatedDecks = decks.map(deck => ({
            id: deck._id,
            theme: deck.theme,
            krTheme: deck.krTheme,
            grade: deck.grade,
            size: deck.cards.length,
            isCustom: deck.isCustom || false,
            deckState: deckStates.find(ds => ds.deckId === deck._id)
        }));

        this.setState({ decks: updatedDecks });
    }

    stackDecks = (decks) => {
        return decks.reduce((stack, deck) => {
            if (!stack[deck.theme]) stack[deck.theme] = [];
            stack[deck.theme].push(deck);
            return stack;
        }, {});
    };

    orderDecksByGrade = (decks) => [
        ...decks.filter(deck => deck.grade === "Beginner"),
        ...decks.filter(deck => deck.grade === "Intermediate"),
        ...decks.filter(deck => deck.grade === "Advanced"),
    ];

    saveStackedDecksOrder = (stackId, focusedGrade) => {
        const currentOrder = this.state.stackOrders[stackId] || ['Beginner', 'Intermediate', 'Advanced'];
        const newOrder = [focusedGrade, ...currentOrder.filter(g => g !== focusedGrade)];
        const updatedOrders = { ...this.state.stackOrders, [stackId]: newOrder };
        this.setState({ stackOrders: updatedOrders });
        localStorage.setItem('stackedDecksOrder', JSON.stringify(updatedOrders));
    };

    buildDeckClassNames = (decks, stackId) => {
        const order = this.state.stackOrders[stackId];
        return decks.map((deck, index) => {
            const position = order ? order.indexOf(deck.grade) + 1 : index + 1;
            const focused = position === 1 ? ' focused' : '';
            return `component-deck ${deck.grade} deck-${position}${focused}`;
        });
    };

    renderStackedDecks() {
        const { decks } = this.state;
        const stackedDecks = this.stackDecks(decks);
        const themesOrder = Object.keys(stackedDecks);
        const userThemesOrder = JSON.parse(window.localStorage.getItem("userThemesOrder"));

        if (userThemesOrder) {
            userThemesOrder.forEach(theme => {
                if (themesOrder.includes(theme)) {
                    themesOrder.splice(themesOrder.indexOf(theme), 1);
                    themesOrder.unshift(theme);
                }
            });
        }

        return (
            <div className="stacked-decks-grid">
                {themesOrder.map((theme, index) => (
                    <div key={index} className="stacked-decks" id={theme}>
                        {this.renderDeck(stackedDecks[theme], theme)}
                    </div>
                ))}
            </div>
        );
    }

    renderDeck(decks, stackId) {
        const {
            openResetModal,
            refreshDecks,
            openHiddenCardsModal,
            openEditPage,
            openDeleteModal
        } = this.props;

        const orderedDecks = this.orderDecksByGrade(decks);
        const classNames = this.buildDeckClassNames(orderedDecks, stackId);

        return orderedDecks.map((deck, index) => (
            <Deck key={index}
                deck={deck}
                className={classNames[index]}
                refreshDecks={refreshDecks}
                saveStackedDecksOrder={this.saveStackedDecksOrder}
                openResetModal={openResetModal}
                openHiddenCardsModal={openHiddenCardsModal}
                openDeleteModal={openDeleteModal}
                openEditPage={openEditPage} />
        ));
    }

    renderCustomDeck() {
        const {
            openResetModal,
            refreshDecks,
            maxCustomDecksLimit,
            openHiddenCardsModal,
            openEditPage,
            openDeleteModal,
            toast
        } = this.props;
        const { decks } = this.state;

        return (
            <div className="custom-decks-grid">
                {decks.map(deck => (
                    <Deck key={deck.id}
                        deck={deck}
                        refreshDecks={refreshDecks}
                        className="component-deck custom"
                        openResetModal={openResetModal}
                        openHiddenCardsModal={openHiddenCardsModal}
                        openDeleteModal={openDeleteModal}
                        openEditPage={openEditPage} />
                ))}
                {decks.length < maxCustomDecksLimit && (
                    <ButtonAddDeck
                        refreshDecks={refreshDecks}
                        decks={decks}
                        toast={toast}
                    />
                )}
            </div>
        );
    }

    render() {
        const { isCustomDeck } = this.props;
        const { decks } = this.state;

        return (
            <div className="component-decks-list">
                {isCustomDeck && this.renderCustomDeck()}
                {!isCustomDeck && decks.length > 0 && this.renderStackedDecks()}
            </div>
        );
    }
}
