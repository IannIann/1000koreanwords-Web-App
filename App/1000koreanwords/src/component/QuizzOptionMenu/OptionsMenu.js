import React from "react";
import '@app/style/optionsMenu.css';
import { Menu } from 'primereact/menu';
import { showResetConfirmDialog } from './ResetDialog'
import { BanListDialog } from './BanListDialog'

export default class OptionsMenu extends React.Component {
  menu = React.createRef();

  state = {
    items: [
      { label: 'Reset', icon: 'pi pi-fw pi-replay', command: () => { this.resetClickHandler(); } },
      { label: 'Modes', icon: 'pi pi-fw pi-book', command: () => { this.modesClickHandler(); } },
      { label: 'Ban List', icon: 'pi pi-fw pi-trash', command: () => { this.banListClickHandler(); } }],
    banListDialogIsVisible: false
  };

  resetClickHandler = () => {
    showResetConfirmDialog(this.props.deck.deckState, this.props.updateDeckStateDisplay);
  };

  banListClickHandler = () => {
    this.showBanList();
  };

  modesClickHandler = () => {
    console.log("Modes");
  };

  showBanList = () => {
    this.setState({ banListDialogIsVisible: true });
  }

  hideBanList = () => {
    this.setState({ banListDialogIsVisible: false })
  }

  renderElement() {
    return (
      <>
        <button onClick={(event) => this.menu.current.toggle(event)}>...</button>
        <Menu model={this.state.items} popup ref={this.menu} />
        <BanListDialog hideBanList={this.hideBanList} isVisible={this.state.banListDialogIsVisible} deck={this.props.deck} updateDeckStateDisplay={this.props.updateDeckStateDisplay} />
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