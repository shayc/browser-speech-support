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
  data: PropTypes.array
};

function SimpleTable(props) {
  const { classes, data } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Language Code</TableCell>
            <TableCell numeric>Name</TableCell>
            <TableCell numeric>Default</TableCell>
            <TableCell numeric>LocalService</TableCell>
            <TableCell numeric>Voice URI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(voice => {
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

export default withStyles(styles)(SimpleTable);
