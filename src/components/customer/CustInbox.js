import React from 'react';
import PropTypes from 'prop-types';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FilterListIcon from '@material-ui/icons/FilterList';
import {format} from 'date-fns'

import IconButton from '@material-ui/core/IconButton';
import MarkunreadIcon from '@material-ui/icons/Markunread';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import DeleteIcon from '@material-ui/icons/Delete';

import { connect } from 'react-redux';
import axios from 'axios';
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import { setUserMessages } from '../../redux/actions/data.actions'
import PageNotFound from '../main/404';

// import './../../styles/CustStyle/custInbox.style.css';
import './../../../node_modules/bootstrap/dist/css/bootstrap.css'

async function getAllMessagesForCurrentUser(userId, adminToken, setUserMessages) {
    let curUrl = "https://localhost:951/api/administrators/messages/" + userId
    const res = await axios.get(curUrl, {
        headers: {
            //'Access-Control-Allow-Headers': 'Authorization',
            'Access-Control-Allow-Origin': "*",
            'Authorization': `Bearer ${adminToken}`
        }
    })
    setUserMessages(res.data)
}

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => 
    el[0]
);
}

const headCells = [
//   { id: 'SenderName', numeric: false, disablePadding: false, label: 'From' },
//   { id: 'Title', numeric: false, disablePadding: false, label: 'Title' },
//   { id: 'Body', numeric: false, disablePadding: false, label: 'Body' },
//   { id: 'CreateDate', numeric: false, date: true, disablePadding: false, label: 'Create Date' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow style={{borderBottom: '5px darkslategray solid'}}>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;
  return (
    <Toolbar
      /* className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })} */
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          Messages
        </Typography>
      )}

      {numSelected > 0 ? (
          <>
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Mark As Read/Unread">
          <IconButton aria-label="mark-as-read">
            <MarkunreadIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Marked">
          <IconButton aria-label="mark">
            <StarIcon />
          </IconButton>
        </Tooltip>
        </>
      ) : (
        <Tooltip title="Filter list">
          <IconButton aria-label="filter list">
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '90%',
    alignSelf: 'center',
    borderRadius: '35px',
    marginTop: '10px',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
    backgroundColor:'darkslategray',
    boxShadow: '1px 1px 10px 6px rgb(0 50 60 / 100%), 0px 1px 20px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  },
  table: {
    minWidth: 750,
    marginLeft: 'auto',
    marginRight: 'auto',
    backgroundColor: 'darkgray',
    width: '97%',
    borderTopLeftRadius: '20px',
    borderTopRightRadius: '20px',
    textAlign: '-webkit-center',
  },
  iconRow: {
    padding: '10px 0px 6px 0px',
    cursor:'pointer',
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

function CustInbox(props) {

    const classes = useStyles();
    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('MsgId');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(true);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    
    console.log(props)
    if (props.curCustomer === undefined) {
        return (
            <PageNotFound />
      );
    }
    if (props.userMessages === undefined || props.userMessages.length < 1) {
        getAllMessagesForCurrentUser(props.curCustomer.Id, props.adminToken, props.setUserMessages)
      }
    const rows = props.userMessages

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
        console.log(rows)
      const newSelecteds = rows.map((n) => n.MsgId);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);
  
  console.log(rows)
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            className={classes.table}
            /* style={{backgroundColor: 'darkgray', width: 'auto', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', textAlign: '-webkit-center'}} */
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.MsgId);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  const createDate = format(new Date(row.CreateDate), 'dd-MM-yyyy');
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.MsgId}
                      selected={isItemSelected}
                      style={{cursor:'pointer'}}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                        onClick={(event) => handleClick(event, row.MsgId)}
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="auto" align="left">
                      {(row.IsReaded == 'Y') ? row.SenderName : <strong>{row.SenderName}</strong>}
                      </TableCell>
                      <TableCell align="center">{(row.IsReaded === 'Y') ? row.Title : <strong>{row.Title}</strong>}</TableCell>
                      <TableCell align="left">{(row.IsReaded === 'Y') ? (row.Body.slice(0,75)+'...') : <strong>{row.Body.slice(0,65)}...</strong>}</TableCell>
                      <TableCell align="left" className={classes.iconRow}><IconButton><DeleteIcon/></IconButton></TableCell>
                      <TableCell align="center" className={classes.iconRow}>{row.IsReaded  === 'Y'? <IconButton><MailOutlineIcon/></IconButton> : <IconButton><MarkunreadIcon/></IconButton>}</TableCell>
                      <TableCell align="center" className={classes.iconRow}>{row.IsMarked  === 'Y'? <IconButton><StarIcon/></IconButton> : <IconButton><StarBorderIcon/></IconButton>}</TableCell>
                      <TableCell align="center" style={{fontSize: '10px'}}>{(row.IsReaded === 'Y') ? createDate : <strong>{createDate}</strong>}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      />
    </div>
  );
}

export default connect(
    (state) => ({
        curCustomer: state.identity.curCustomer,
        adminToken: state.identity.adminToken,
        userToken: state.identity.userToken,
        userMessages: state.data.userMessages
    }),
    {
        setUserMessages
    }
)(CustInbox);