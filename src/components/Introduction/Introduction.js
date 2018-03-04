import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

const styles = {
  root: {
    textAlign: 'center'
  }
};

const propTypes = {};

function Introduction(props) {
  const { classes } = props;
  return (
    <div className="Introduction">
      <Typography className={classes.root} variant="headline">
        Speech Synthesis API support across browsers and OS.
      </Typography>
    </div>
  );
}

Introduction.propTypes = propTypes;

export default withStyles(styles)(Introduction);
