import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table';
import Paper from 'material-ui/Paper';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  }
});

const propTypes = {
  classes: PropTypes.object.isRequired,
  voices: PropTypes.arrayOf(
    PropTypes.shape({
      /**
       * A BCP 47 language tag indicating the language of the voice.
       */
      lang: PropTypes.string,
      /**
       * A human-readable name that represents the voice.
       */
      name: PropTypes.string,
      /**
       * A Boolean indicating whether the voice is the default voice for the
       * current app language (true), or not (false.)
       */
      default: PropTypes.bool,
      /**
       * A Boolean indicating whether the voice is supplied by a local
       * speech synthesizer service (true), or a remote speech
       * synthesizer service (false.)
       */
      localService: PropTypes.bool,
      /**
       * The type of URI and location of the speech synthesis service for this
       * voice.
       */
      voiceURI: PropTypes.string
    })
  )
};

const defaultProps = {
  voices: []
};

function SimpleTable(props) {
  const { classes, voices } = props;

  if (!voices.length) {
    return null;
  }

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Language Code</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Default</TableCell>
            <TableCell>Local Service</TableCell>
            <TableCell>Voice URI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {voices.map(voice => {
            return (
              <TableRow key={voice.voiceURI}>
                <TableCell>{voice.lang}</TableCell>
                <TableCell>{voice.name}</TableCell>
                <TableCell>{voice.default ? 'True' : 'False'}</TableCell>
                <TableCell>{voice.localService ? 'True' : 'False'}</TableCell>
                <TableCell>{voice.voiceURI}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = propTypes;
SimpleTable.defaultProps = defaultProps;
export default withStyles(styles)(SimpleTable);
