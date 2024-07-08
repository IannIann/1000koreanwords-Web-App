import React from "react";
import AuthService from '@app/service/auth.service'
import customdecksData from '@app/data/customdecks.data';
import { ConfirmDialog } from 'primereact/confirmdialog'
import { confirmDialog } from 'primereact/confirmdialog'

function showDeleteDeckConfirmDialog(deckId, refreshDecks) {
  confirmDialog({
      message: 'Do you want to delete this deck ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptFunc(deckId, refreshDecks)
  });
}

function acceptFunc(deckId, refreshDecks) 
{
  const userId = AuthService.getCurrentUser().id;
  if (deckId) {
    customdecksData.deleteCustomDeck(userId, deckId)
      .then(refreshDecks);
  }
}

class DeleteDeckDialog extends React.Component {
  render() {
    return (
      <div className="component-delete-deck-dialog">
         <ConfirmDialog /> 
      </div>
    );
  }
}

export {DeleteDeckDialog, showDeleteDeckConfirmDialog}