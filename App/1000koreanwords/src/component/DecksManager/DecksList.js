import React from "react";
import Deck from "@app/component/Deck/Deck";
import ButtonAddDeck from '@app/component/Buttons/ButtonAddDeck';

export default class DecksList extends React.Component {

    state = {
        decks: []
    };

    componentDidUpdate(prevProps) {
        const { decks, userDeckStates } = this.props;
        if (decks !== prevProps.decks && decks) {

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

        this.addFocusedToFirstDeck();
    }

    //Build a map of stacked decks by themes
    stackDecks = (decks) => {
        const stackedDecks = decks.reduce((stack, deck) => {
            const theme = deck.theme;
            if (!stack[theme]) {
                stack[theme] = [];
            }
            stack[theme].push(deck);
            return stack;
        }, {});
        return stackedDecks;
    };

    //first deck of each stacked deck is focused after loading
    addFocusedToFirstDeck() {
        document.querySelectorAll('.stacked-decks').forEach(deck => {
            const deck1 = deck.querySelector('.deck-1');
            if (deck1) {
                deck1.classList.add('focused');
            }
        });
    }

    //By default order the decks in stacks by grade
    orderDecksByGrade = (decks) => {
        let orderedDecks = [];
        orderedDecks.push(decks.filter(deck => deck.grade === 'Beginner'));
        orderedDecks.push(decks.filter(deck => deck.grade === 'Intermediate'));
        orderedDecks.push(decks.filter(deck => deck.grade === 'Advanced'));

        return orderedDecks;
    };

    //Saving the order of decks in a stack its recovered on page load
    saveStackedDecksOrder = (event) => {
        const currentStack = event.currentTarget.closest('.stacked-decks');
        const stackId = currentStack.getAttribute('id');
        const decks = Array.from(currentStack.querySelectorAll('.component-deck'));

        // Retrieve existing stacked decks order from localStorage or initialize an empty array
        const existingStackedDecksOrder = JSON.parse(window.localStorage.getItem('stackedDecksOrder')) || [];

        // Find the index of the current stack in the stored order
        const stackIndex = existingStackedDecksOrder.findIndex(stack => stack.id === stackId);

        if (stackIndex === -1) {
            // If the stack is not present, add it with the current deck classes
            existingStackedDecksOrder.push({
                id: stackId,
                decksClassName: decks.map(deck => deck.classList.value),
            });
        } else {
            // If the stack is present, update its deck classes
            existingStackedDecksOrder[stackIndex].decksClassName = decks.map(deck => deck.classList.value);
        }

        window.localStorage.setItem('stackedDecksOrder', JSON.stringify(existingStackedDecksOrder));
    }

    //Build the list of className for each deck
    buildDeckClassNames = (decks, stackId) => {
        let classNames = [];
        // Retrieve existing stacked decks order from localStorage or initialize an empty array
        const existingStackedDecksOrders = JSON.parse(window.localStorage.getItem('stackedDecksOrder')) || [];
        const currentStackedDecksOrder = existingStackedDecksOrders.find(sdo => sdo.id == stackId);

        //push the existing stacked decks order class names to the classNames array
        if (currentStackedDecksOrder) {
            currentStackedDecksOrder.decksClassName.map((className) => {
                classNames.push(className);
            })
        }
        else {
            decks.map((deck, index) => {
                classNames.push(`component-deck ${deck.grade} deck-${index + 1}`);
            })
        }
        return classNames;
    };

    renderStackedDecks() {
        const {decks} = this.state;
        const stackedDecks = this.stackDecks(decks)
        const defaultThemesOrder = Object.keys(stackedDecks);
        const userThemesOrder = JSON.parse(window.localStorage.getItem('userThemesOrder'));

        if (userThemesOrder) {
            userThemesOrder.map(theme => {
                if (defaultThemesOrder.includes(theme)) {
                    defaultThemesOrder.splice(defaultThemesOrder.indexOf(theme), 1);
                    defaultThemesOrder.unshift(theme);
                }
            })
        }

        return (
            <div className="stacked-decks-grid">
                {defaultThemesOrder.map((theme, index) => (
                    <div key={index} className="stacked-decks" id={theme}>
                        {this.renderDeck(stackedDecks[theme], theme)}
                    </div>
                ))}
            </div>
        )
    };

    renderDeck(decks, stackId) {
        const {
            openResetModal,
            refreshDecks,
            openHiddenCardsModal,
            openEditPage,
            openDeleteModal
        } = this.props;

        decks = this.orderDecksByGrade(decks).flat();
        const classNames = this.buildDeckClassNames(decks, stackId);

        return (
            decks.map((deck, index) => (
                <Deck key={index}
                    deck={deck}
                    className={classNames[index]}
                    refreshDecks={refreshDecks}
                    saveStackedDecksOrder={this.saveStackedDecksOrder}
                    openResetModal={openResetModal}
                    openHiddenCardsModal={openHiddenCardsModal}
                    openDeleteModal={openDeleteModal}
                    openEditPage={openEditPage} />
            ))
        )
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
                {decks.map((deck, index) => (
                    <Deck key={index}
                        deck={deck}
                        refreshDecks={refreshDecks}
                        className={'component-deck custom'}
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
        )
    };

    render() {
        const { isCustomDeck }= this.props;
        const { decks } = this.state;

        return (
            <div className="component-decks-list">
                {isCustomDeck && this.renderCustomDeck()}
                {!isCustomDeck && decks.length > 0 && this.renderStackedDecks()}
            </div>
        )
    }
}