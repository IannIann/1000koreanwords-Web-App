import React from "react";
import AuthService from '@app/service/auth.service'
import userdeckstatesData from '@app/data/userdeckstates.data';
import { ConfirmDialog } from 'primereact/confirmdialog'
import { confirmDialog } from 'primereact/confirmdialog'

function showResetConfirmDialog(deckState, refreshDecks) {
  confirmDialog({
    message: 'Do you want to reset your progression ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => acceptFunc(deckState, refreshDecks)
  });
}

function acceptFunc(deckState, refreshDecks) {
  if (deckState) {
    const newDeckState = { ...deckState, correctCards: [] };
    userdeckstatesData.resetDeckProgression(newDeckState)
      .then(refreshDecks);
  }
}

class ResetDialog extends React.Component {
  render() {
    return (
      <div className="component-reset-dialog">
        <ConfirmDialog />
      </div>
    );
  }
}

export { ResetDialog, showResetConfirmDialog }