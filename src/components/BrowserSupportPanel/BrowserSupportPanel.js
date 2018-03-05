import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
// import Paper from 'material-ui/Paper';
// import Typography from 'material-ui/Typography';

import BrowserDetails from '../BrowserDetails/BrowserDetails';
import chromeLogo from '../../logos/chrome.svg';
import firefoxLogo from '../../logos/firefox.svg';
import edgeLogo from '../../logos/edge.svg';
import safariLogo from '../../logos/safari.svg';
import './BrowserSupportPanel.css';

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
  edge: PropTypes.array,
  firefox: PropTypes.array,
  safari: PropTypes.array
};

function BrowserSupportPanel(props) {
  const { chrome, safari, edge, firefox } = props;

  return (
    <div className="BrowserSupportPanel">
      <BrowserDetails
        className="BrowserSupportPanel__details"
        name="Chrome"
        logo={chromeLogo}
        details={chrome}
      />
      <BrowserDetails
        className="BrowserSupportPanel__details"
        name="Edge"
        logo={edgeLogo}
        details={edge}
      />
      <BrowserDetails
        className="BrowserSupportPanel__details"
        name="Firefox"
        logo={firefoxLogo}
        details={firefox}
      />
      <BrowserDetails
        className="BrowserSupportPanel__details"
        name="Safari"
        logo={safariLogo}
        details={safari}
      />
    </div>
  );
}

BrowserSupportPanel.propTypes = propTypes;

export default withStyles(styles)(BrowserSupportPanel);
