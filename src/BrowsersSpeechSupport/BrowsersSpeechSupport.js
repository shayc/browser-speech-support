import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import BrowserDetails from '../BrowserDetails/BrowserDetails';
import chromeLogo from '../logos/chrome.svg';
import firefoxLogo from '../logos/firefox.svg';
import edgeLogo from '../logos/edge.svg';



const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  chrome: PropTypes.array,
  safari: PropTypes.array
};

function BrowsersSpeechSupport(props) {
  const { classes, chrome, safari } = props;
  return (
    <div className="BrowsersSpeechSupport">
      <BrowserDetails details={chrome} />
      <BrowserDetails details={safari} />
    </div>
  );
}

BrowsersSpeechSupport.propTypes = propTypes;

export default withStyles(styles)(BrowsersSpeechSupport);
