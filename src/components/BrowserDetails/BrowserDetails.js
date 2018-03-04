import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Paper from 'material-ui/Paper';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import classNames from 'classnames';
import './BrowserDetails.css';

const styles = theme => ({
  root: theme.mixins.gutters({
    paddingTop: 16,
    paddingBottom: 16,
    marginTop: theme.spacing.unit * 3
  }),
  divider: {
    margin: '1rem 0'
  }
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
  const { className, classes, name, version, logo, details } = props;

  return (
    <div className={classNames('BrowserDetails', className)}>
      <div className="BrowserDetails__logo-container">
        <img className="BrowserDetails__logo" src={logo} alt="" />
      </div>
      <Typography
        className="BrowserDetails__name"
        variant="headline"
        component="h3"
      >
        {name}
      </Typography>
      <Divider className={classes.divider} />
      {details.map(detail => {
        return [
          <Typography variant="title" component="p">
            {detail.osFamily} {detail.osVersion}
          </Typography>,
          <Typography paragraph component="dl">
            <dt>Languages</dt>
            <dd>{detail.langs}</dd>
            <dt>Voices</dt>
            <dd>{detail.voices}</dd>
          </Typography>
        ];
      })}
    </div>
  );
}

BrowserDetails.propTypes = propTypes;

export default withStyles(styles)(BrowserDetails);
