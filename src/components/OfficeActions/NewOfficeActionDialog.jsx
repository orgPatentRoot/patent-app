import React from 'react';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid'

import StatusSelector from './StatusSelector';

const styles = theme => ({
    dialogContainer: {
        minWidth: 700
    },
    appNumTextField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 300,
    },
    searchAppNum: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputFieldsContainer: {
        margin: theme.spacing.unit * 3
    }
});

class NewAppDialog extends React.Component {
    state = {
        uspto_mailing_date: '',
        response_sent_date: '',
        uspto_status: '',
        status_id: null,
    };
    clearForm = () => {
        this.setState({
            uspto_mailing_date: '',
            response_sent_date: '',
            uspto_status: '',
            status_id: null,
        });
    }
    handleChange = name => event => {
        this.setState({
            ...this.state,
            [name]: event.target.value,
        });
    };
    handleAdd = () => {
        // cannot send empty string for date. Instead, send null
        const responseSentDate = this.state.response_sent_date ? this.state.response_sent_date : null;
        this.props.dispatch({
            type: 'POST_OFFICE_ACTION',
            payload: {
                ...this.state,
                response_sent_date: responseSentDate,
                application_id: this.props.appId,
            }
        });
        this.props.handleClose();
    };
    handleStatusChange = (statusId) => {
        this.setState({
            status_id: statusId,
        });
    };
    handleDialogClose = () => {
        this.clearForm();
        this.props.handleClose();
    };
    render() {
        const { classes } = this.props;
        return (
            <Dialog
                maxWidth='lg'
                open={this.props.open}
                className={classes.dialogContainer}
                onClose={this.handleDialogClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle align='center' id="form-dialog-title">New Office Action
                </DialogTitle>
                <DialogContent>
                    <Grid container direction='column' alignItems='center'>
                        <Grid item className={classes.inputFieldsContainer}>
                            <Grid container justify='space-between'>
                                <Grid item>
                                    <Grid container direction='column'>
                                        <TextField
                                            id="outlined-usptoMailingDate"
                                            label="USPTO Mailing Date"
                                            className={classes.appNumTextField}
                                            value={this.state.uspto_mailing_date}
                                            type="date"
                                            onChange={this.handleChange('uspto_mailing_date')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={{ shrink: true, }}
                                        />
                                        <TextField
                                            id="outlined-responseSentDate"
                                            label="Response Sent Date"
                                            className={classes.appNumTextField}
                                            value={this.state.response_sent_date}
                                            type="date"
                                            onChange={this.handleChange('response_sent_date')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={{ shrink: true, }}
                                        />
                                        <TextField
                                            id="outlined-usptoStatus"
                                            label="USPTO Status"
                                            className={classes.appNumTextField}
                                            value={this.state.uspto_status}
                                            onChange={this.handleChange('uspto_status')}
                                            margin="normal"
                                            variant="outlined"
                                            margin='dense'
                                            InputLabelProps={this.state.uspto_status && {
                                                shrink: true,
                                            }}
                                        />
                                        <StatusSelector 
                                            handleStatusChange={this.handleStatusChange}
                                            statusId={this.state.status_id}
                                        />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDialogClose} variant='contained' color="default">
                        Cancel
                    </Button>
                    <Button 
                        onClick={this.handleAdd} 
                        variant='contained' color="primary"
                        disabled={!this.state.uspto_mailing_date}
                    >Add Office Action
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

const mapStateToProps = reduxState => ({
    reduxState,
});

export default connect(mapStateToProps)(withStyles(styles)(NewAppDialog));