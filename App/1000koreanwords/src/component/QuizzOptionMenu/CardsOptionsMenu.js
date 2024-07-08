import React from "react";
import "@app/style/optionsMenu.css";
import OptionsButton from "./OptionsButton";
import { Menu } from "primereact/menu";
import { showBanConfirmDialog } from "./BanCardDialog";
import { CustomDecksDialog } from "./CustomDecksDialog";

export default class CardsOptionsMenu extends React.Component {
  menu = React.createRef();

  state = {
    items: [
      {
        label: "Hide this word",
        icon: "pi pi-fw pi-eye-slash",
        command: () => {
          this.banClickHandler();
        }
      },
      {
        label: "Copy to my deck",
        icon: "pi pi-fw pi-copy",
        command: () => {
          this.customDecksClickHandler();
        },
        visible: this.props.isCustomDeck
      }
    ],
    customDecksDialogIsVisible: false
  };

  customDecksClickHandler = () => {
    this.showCustomDecks();
  };

  banClickHandler = () => {
    showBanConfirmDialog(this.props.banCardClickHandler);
  };

  showCustomDecks = () => {
    this.setState({ customDecksDialogIsVisible: true });
  };

  hideCustomDecks = () => {
    this.setState({ customDecksDialogIsVisible: false });
  };

  toggleMenu = event => {
    if (this.menu.current) {
      this.menu.current.toggle(event);
    }
  };

  renderElement() {
    const { items, customDecksDialogIsVisible } = this.state;
    const { card } = this.props;

    return (
      <>
        <OptionsButton name="..." clickHandler={this.toggleMenu} />
        <Menu model={items} popup ref={this.menu} />
        <CustomDecksDialog
          hideCustomDecks={this.hideCustomDecks}
          isVisible={customDecksDialogIsVisible}
          card={card}
        />
      </>
    );
  }

  render() {
    return (
      <div className="component-quizz-option-menu">
        {this.renderElement()}
      </div>
    );
  }
}