import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  })
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  summary: PropTypes.shape({
    browserName: PropTypes.string,
    browserVersion: PropTypes.string,
    osFamily: PropTypes.string,
    osVersion: PropTypes.string,
    langs: PropTypes.number,
    voices: PropTypes.number
  })
};

function PlatformSummary(props) {
  const { classes, summary } = props;

  return (
    <Paper className={classes.root}>
      <Typography variant="headline" component="h3">
        Summary
      </Typography>

      <Typography component="dl">
        <dt>Browser</dt>
        <dd>
          {summary.browserName} {summary.browserVersion}
        </dd>
        <dt>Operating System</dt>
        <dd>
          {summary.osFamily} {summary.osVersion}
        </dd>
        <dt>Languages</dt>
        <dd>{summary.langs}</dd>
        <dt>Voices</dt>
        <dd>{summary.voices}</dd>
        <dt>Local Services</dt>
        <dd>{summary.localServices}</dd>
      </Typography>
    </Paper>
  );
}

PlatformSummary.propTypes = propTypes;

export default withStyles(styles)(PlatformSummary);
