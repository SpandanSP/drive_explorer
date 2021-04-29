import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import {
  onInitDashboard,
  handleselectedDrive,
  onSubmit,
  viewDetails
} from '../actions/dashboard';




const useStyles = theme => ({
  root: {
    flexGrow: 1,
    height: "100vh",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontSize: "30px",
    textAlign: "center",
    color: "#F1F6F5",
    fontFamily: "Lucida Console"
  },
  content: {
    height: "89vh",
    width: "100%"
  },
  step1: {
    width: "auto",
    textAlign: "center",
    fontSize: "22px",
    fontFamily: "Lucida Console",
    paddingTop: "50px"
  },
  paper: {
    padding: theme.spacing(1),
    paddingTop: "25px",
    textAlign: 'center',
    height: "70vh",
    color: theme.palette.text.secondary,
    overflowY: "scroll"
  },
  paperTitle: {
    color: "#fff",
    backgroundColor: "#4984CC",
    padding: theme.spacing(1),
  }
});


class Dashboard extends Component {
  componentDidMount() {
    this.props.onInitDashboard();

  }
  render() {
    const { classes } = this.props;
    const drives = [{
      value: "D:/",
      label: "D",
    },
    {
      value: "F:/",
      label: "F",
    },
    {
      value: "E:/",
      label: "E",
    }
    ];

    let {
      selectedDrive,
      driveFetchStatus,
      driveDetails,
      drivePath,
      previousPath
    } = this.props.Dashboard;

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title}>
              Drive Explorer
            </Typography>
          </Toolbar>

        </AppBar>
        <Paper className={classes.content}>
          {
            driveFetchStatus === false ?
              <div className={classes.step1}>
                Please enter drive to continue..
            <br />
                <br />
                <form
                  className={classes.form}
                  noValidate
                  onClick={(e) => e.preventDefault()}
                >
                  <TextField
                    id="drive"
                    select
                    required
                    variant="outlined"
                    label="Select"
                    value={selectedDrive}
                    onChange={(event) => this.props.handleselectedDrive(event)}
                    helperText="Please select drive.."
                  >
                    {drives.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                  <br />
                  <br />
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={() => { this.props.onSubmit(this.props.Dashboard, "next") }}
                  >
                    Next
                  </Button>
                </form>
              </div>
              :
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <Typography className={classes.paperTitle}>
                        Directory Level
                      </Typography>
                      <br />
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => { this.props.onSubmit(this.props.Dashboard, "home") }}
                      >
                        Home
                      </Button>
                  &nbsp; &nbsp;
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={() => { this.props.onSubmit(this.props.Dashboard, "back") }}
                      >
                        Back
                  </Button>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell> {
                                drivePath
                              }</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {driveDetails.map((detail) => (
                              <TableRow key={detail.fileName}
                                onClick={() => { this.props.viewDetails(detail, this.props.Dashboard) }}>
                                <TableCell component="th" scope="row">
                                  {detail.fileName}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                  <Grid item xs={6}>
                    <Paper className={classes.paper}>
                      <Typography className={classes.paperTitle}>
                        File Details
                      </Typography>
                      <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                          <TableHead>
                            <TableRow>
                              <TableCell>Name</TableCell>
                              <TableCell align="right">Type</TableCell>
                              <TableCell align="right">Size</TableCell>
                              <TableCell align="right">Last Modified</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {driveDetails.map((detail) => (
                              <TableRow key={detail.fileName}
                                onClick={() => { this.props.viewDetails(detail, this.props.Dashboard) }}>
                                <TableCell component="th" scope="row">
                                  {detail.fileName}
                                </TableCell>
                                <TableCell align="right">{detail.isDir ? "Folder" : detail.fileName.split(".")[1]}</TableCell>
                                <TableCell align="right">{detail.fileSize}</TableCell>
                                <TableCell align="right">{detail.dateModified}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </Grid>
                </Grid>
              </div>
          }
        </Paper>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    Dashboard: state.Dashboard
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onInitDashboard: () => {
      return dispatch(onInitDashboard());
    },
    handleselectedDrive: (event) => {
      return dispatch(handleselectedDrive(event));
    },
    onSubmit: (props, key) => {
      return dispatch(onSubmit(props, key));
    },
    viewDetails: (detail, props) => {
      return dispatch(viewDetails(detail, props));
    },

  };

}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(useStyles, { withTheme: true })(Dashboard));