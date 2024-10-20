import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { sendActionToServer } from '../server';
import { FormControl, FormLabel, FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import ChipInput from 'material-ui-chip-input'


export default function EditFunctionDialog( { currentDialogParameters, setCurrentDialog, playerState, setPlayerState, open = true }) {
  const [functionSettings, setFunctionSettings] = React.useState(currentDialogParameters);

  const handleClose = () => {
    setCurrentDialog('');
  };

  function save() {
    
    console.error("Going to save with settings:", functionSettings);
    // const newPlayerState = {...playerState, paused:false};
    // setPlayerState(newPlayerState);

    const payload = {
      category: 'edit_function',
      state: functionSettings
    };
    sendActionToServer(payload);
    handleClose();
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit Function</DialogTitle>
        <DialogContent>
          <DialogContentText>
            
          </DialogContentText>
          <form noValidate autoComplete="off">
            <TextField onChange={(e)=> setFunctionSettings({...functionSettings, func_name:e.target.value})} value={functionSettings?.func_name} style={{display:'block'}} id="standard-basic" label="Name" fullWidth />
            <TextField onChange={(e)=> setFunctionSettings({...functionSettings, export_path:e.target.value})} value={functionSettings?.export_path || "/functions/"+functionSettings?.func_name+".s"} fullWidth style={{display:'block'}} id="standard-basic" label="Export Path" />
            <TextField style={{display:'block'}} id="standard-basic" label="Parameter Count" type="number" min={0} />
          </form>

          {JSON.stringify(functionSettings)}
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="error">
            Cancel
          </Button>
          <Button onClick={save} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}