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
  details: PropTypes.shape({
    name: PropTypes.string,
    version: PropTypes.string,
    logo: PropTypes.string
  })
};

function BrowserDetails(props) {
  const { classes, details } = props;
  return (
    <Paper className={classes.root}>
      <Typography variant="headline" component="h3">
        {details[0].browserName}
      </Typography>
      <dl>
        {details.map(detail => {
          return [
            <p>
              {detail.os} {detail.osFamily}
            </p>,
            <dt>Languages</dt>,
            <dd>{detail.langs}</dd>,
            <dt>Voices</dt>,
            <dd>{detail.voices}</dd>
          ];
        })}
      </dl>
    </Paper>
  );
}

BrowserDetails.propTypes = propTypes;

export default withStyles(styles)(BrowserDetails);
