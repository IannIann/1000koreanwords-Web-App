import React from "react";
import { ConfirmDialog } from 'primereact/confirmdialog'
import { confirmDialog } from 'primereact/confirmdialog'

function showBanConfirmDialog(banCardClickHandler) {
  const command = "Ban";

  confirmDialog({
    message: 'Do you want to hide this word ?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    accept: () => banCardClickHandler(command)
  });
}

class BanCardDialog extends React.Component {
  render() {
    return (
      <div className="component-ban-card-dialog">
        <ConfirmDialog />
      </div>
    );
  }
}

export { BanCardDialog, showBanConfirmDialog }