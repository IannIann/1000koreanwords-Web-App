import React from "react";
import '@app/style/optionsMenu.css';
import OptionsButton from "./OptionsButton";
import { Menu } from 'primereact/menu';
import { showResetConfirmDialog } from './ResetDialog'
import { showDeleteDeckConfirmDialog } from "./DeleteDeckDialog";
import { BanListDialog } from './BanListDialog'

export default class OptionsMenu extends React.Component {
  menu = React.createRef();

  state = {
    items: [
      { label: 'Reset', icon: 'pi pi-fw pi-replay', command: () => { this.resetClickHandler(); } },
      { label: 'Modes', icon: 'pi pi-fw pi-book', command: () => { this.modesClickHandler(); } },
      { label: 'Hidden words', icon: 'pi pi-fw pi-eye-slash', command: () => { this.banListClickHandler(); } },
      { label: 'Delete', icon: 'pi pi-fw pi-trash', command: () => { this.deleteClickHandler(); }, visible: this.props.isCustomDeck }],
    banListDialogIsVisible: false
  };

  resetClickHandler = () => {
    const{ deckState, refreshDecks } = this.props
    showResetConfirmDialog(deckState, refreshDecks);
  };

  banListClickHandler = () => {
    this.showBanList();
  };

  modesClickHandler = () => {
    console.log("Modes");
  };

  deleteClickHandler = () => {
    const { deck, refreshDecks } = this.props
    showDeleteDeckConfirmDialog(deck.id, refreshDecks)
  };

  showBanList = () => {
    this.setState({ banListDialogIsVisible: true });
  };

  hideBanList = () => {
    this.setState({ banListDialogIsVisible: false })
  };

  toggleMenu = (event) => {
    if (this.menu.current) {
      this.menu.current.toggle(event);
    }
  };

  renderElement() {
    const { items, banListDialogIsVisible } = this.state;
    const { deck, deckState, refreshDecks } = this.props;
    return (
      <>
        <OptionsButton name="..."  clickHandler={this.toggleMenu}/>
        <Menu model={items} popup ref={this.menu} />
        <BanListDialog hideBanList={this.hideBanList}
          isVisible={banListDialogIsVisible}
          deck={deck}
          deckState={deckState}
          refreshDecks={refreshDecks} />
      </>
    )
  }

  render() {
    return (
      <div className="component-option-menu">
        {this.renderElement()}
      </div>
    )
  }
}