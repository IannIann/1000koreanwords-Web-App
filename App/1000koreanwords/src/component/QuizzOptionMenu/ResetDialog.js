import React from "react";
import AuthService from '@app/service/auth.service'
import userdeckstatesData from '@app/data/userdeckstates.data';
import { ConfirmDialog } from 'primereact/confirmdialog'
import { confirmDialog } from 'primereact/confirmdialog'

function showResetConfirmDialog(deckState, updateDeckStateDisplay) {
  confirmDialog({
      message: 'Do you want to reset your progression ?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => acceptFunc(deckState, updateDeckStateDisplay)
  });
}

function acceptFunc(deckState, updateDeckStateDisplay) 
{
  if(deckState)
  {
    let userId = AuthService.getCurrentUser().id
    let newDeckState = {...deckState};
    newDeckState.correctCards = [];
    userdeckstatesData.resetDeckProgression(userId, newDeckState)
    updateDeckStateDisplay(newDeckState);
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

export {ResetDialog, showResetConfirmDialog}