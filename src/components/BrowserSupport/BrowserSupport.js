import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

import BrowserDetailReport from '../BrowserDetailReport/BrowserDetailReport';
import chromeLogo from '../../logos/chrome.svg';
import firefoxLogo from '../../logos/firefox.svg';
import edgeLogo from '../../logos/edge.svg';
import './BrowserSupport.css';

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

function BrowserSupport(props) {
  const { classes, chrome, safari, edge, firefox } = props;

  return (
    <div className="BrowserSupport">
      <BrowserDetailReport
        className="BrowserSupport__detail-report"
        name="Chrome"
        details={chrome}
        logo={chromeLogo}
      />
      <BrowserDetailReport
        className="BrowserSupport__detail-report"
        name="Safari"
        details={safari}
        logo="{safariLogo}"
      />
      <BrowserDetailReport
        className="BrowserSupport__detail-report"
        name="Edge"
        details={edge}
        logo={edgeLogo}
      />
      <BrowserDetailReport
        className="BrowserSupport__detail-report"
        name="Firefox"
        details={firefox}
        logo={firefoxLogo}
      />
    </div>
  );
}

BrowserSupport.propTypes = propTypes;

export default withStyles(styles)(BrowserSupport);
