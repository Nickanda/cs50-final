import * as React from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Input from '@mui/material/Input';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import TextField from '@mui/material/TextField';

import RemovableAlert from './Alert';

export default function AntManageDialog({
  data,
  values: {
    openUpload,
    openAlert,
    confirmationError,
    antData
  },
  functions: {
    handleOpenUpload,
    handleAlertRemoval,
    handleUpdateValue,
    handleRadioUpload,
    handleSpecialUpload,
    handleImageUpload,
    confirmUpload,
    confirmSave
  },
  save = false
}) {
  return (
    <Dialog
      open={openUpload}
      onClose={handleOpenUpload}
      maxWidth='sm'
      fullWidth
      scroll='paper'
    >
      <DialogTitle>{save ? "Update Data" : "Upload Data"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please complete all parts of the form below to {save ? "save" : "upload"} the ant.
        </DialogContentText>

        <RemovableAlert open={openAlert} text={confirmationError} onClick={handleAlertRemoval} />

        <TextField
          autoFocus
          margin="dense"
          id="species"
          label="Species"
          type="text"
          required
          fullWidth
          variant="standard"
          onChange={handleUpdateValue}
          value={save ? data.species : undefined}
        />
        <TextField
          margin="dense"
          id="caste"
          label="Caste"
          type="text"
          required
          fullWidth
          variant="standard"
          onChange={handleUpdateValue}
          value={save ? data.caste : undefined}
        />

        <FormControl sx={{
          mt: 2,
        }}>
          <FormLabel id="feigns-death-label" required>Feigns Death?</FormLabel>
          <RadioGroup
            row
            aria-labelledby="feigns-death-label"
            name="feigns-death"
            onChange={handleRadioUpload}
            value={save ? JSON.stringify(data.feignsDeath) : undefined}
          >
            <FormControlLabel value="true" control={<Radio />} label="True" />
            <FormControlLabel value="false" control={<Radio />} label="False" />
          </RadioGroup>
        </FormControl>

        {save ? null : (
          <Button variant="contained" component="label" sx={{
            mt: 2,
            mb: 2
          }} fullWidth>
            Upload Image (JPG, JPEG, PNG Only)
            <Input
              type="file"
              id="image"
              onChange={handleImageUpload}
              sx={{
                display: 'none'
              }}
              inputProps={{
                accept: ".jpg,.jpeg,.png"
              }} />
          </Button>
        )}

        {['HL', 'HH', 'EL', 'WL', 'MH', 'PL', 'PH', 'GL', 'TL'].map((item, index) => (
          <TextField
            key={index}
            margin="dense"
            id={item}
            label={item}
            type="number"
            required
            fullWidth
            variant="standard"
            onChange={handleSpecialUpload}
            onWheel={(e) => e.target.blur()}
            value={save ? data[item] : undefined}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button color='error' onClick={() => handleOpenUpload(antData || null)}>Cancel</Button>
        {save ? <Button onClick={confirmSave}>Save</Button> : <Button onClick={confirmUpload}>Upload</Button>}
      </DialogActions>
    </Dialog>
  )
}