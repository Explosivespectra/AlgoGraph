import React, { useState, useRef } from 'react';
import { BarGraph } from './d3/BarGraph';
import { Button, IconButton, AppBar, Toolbar, Dialog, DialogTitle, DialogActions, DialogContent, Menu, MenuItem, Slider, Typography, Grid } from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune';
import BarChartIcon from '@material-ui/icons/BarChart';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useInterval } from '../hooks/useInterval'

const useStyles = makeStyles(theme => ({

}));

const randomData = (range, count) => {
  let len = count;
  return [...Array(len).keys()].map((num) => {
    return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
  });
}

const sortParam = {
  insertion: {
    pos: 1,
    ind: 1,
    completed: false,
  },
  selection: {
    pos: 1,
    posSmall: 0,
    ind: 0,
    completed: false,
  },
  bubble: {
    pos: 0,
    changes: false,
    completed: false,
  }
}

const insertionStep = (arr, param) => {
  if ( param.pos > 0 && arr[param.pos] < arr[param.pos - 1]) {
    let copy = arr[param.pos - 1];
    arr[param.pos - 1] = arr[param.pos];
    arr[param.pos] = copy;
    param.pos--;
  }
  else {
    param.ind = param.ind + 1;
    param.pos = param.ind;
  }
  if (param.ind >= arr.length) {
    param.completed = true;
  }
  return {arr, param};
}

const selectionStep = (arr, param) => {
  console.log(param);
  if (param.pos < arr.length) {  
    if ( arr[param.pos] < arr[param.posSmall]) {
      param.posSmall = param.pos;
    }
    param.pos = param.pos + 1;
  }
  else {
    let copy = arr[param.ind];
    arr[param.ind] = arr[param.posSmall];
    arr[param.posSmall] = copy;
    param.ind = param.ind + 1;
    param.posSmall = param.ind;
    param.pos = param.ind + 1;
  }
  if ( param.ind >= arr.length - 1) {
    param.completed = true;
  }
  return {arr, param};
}

const bubbleStep = (arr, param) => {
  if (param.pos < arr.length - 1) {
    if (arr[param.pos] > arr[param.pos + 1]) {
      param.changes = true;
      let copy = arr[param.pos + 1];
      arr[param.pos + 1] = arr[param.pos];
      arr[param.pos] = copy;
    }
    param.pos += 1;
  }
  else {
    if (param.changes) {
      param.pos = 0;
      param.changes = false;
    }
    else {
      param.completed = true;
    }
  }
  return {arr, param};
}

const sortStep = {
  insertion: (arr, param) => {return insertionStep(arr, param)},
  selection: (arr, param) => {return selectionStep(arr, param)},
  bubble: (arr, param) => {return bubbleStep(arr, param)},
}

const callSortStep = (arr, param, sortType) => {
  return (sortStep[sortType])(arr, param);
}

const NumberDialog = ({ defRange, defCount, isOpen, handleClose, handleConfirm }) => {

	const [range, setRange] = useState(defRange);
	const [count, setCount] = useState(defCount);

	const close = () => {
		setRange(defRange);
		setCount(defCount);
		handleClose();
	}

	return (
		<Dialog open={isOpen} onClose={close}>
			<DialogTitle>Number Generation Settings</DialogTitle>
			<DialogContent>
				<Typography gutterBottom>Range</Typography>
				<Slider defaultValue={defRange} value={range} min={0} max={50} onChange={(event, newValue) => { setRange(newValue) }} valueLabelDisplay="auto" />
				<Typography gutterBottom>Count</Typography>
				<Slider defaultValue={defCount} value={count} min={2} max={40} onChange={(event, newValue) => { setCount(newValue) }} valueLabelDisplay="auto" />
			</DialogContent>
			<DialogActions>
				<Button onClick={close}>Cancel</Button>
				<Button onClick={() => { handleConfirm(range, count) }}>Confirm</Button>
			</DialogActions>
		</Dialog>
	)
}
const StyleDialog = ({styles, setStyle, isOpen, handleClose}) => {
	return (
		<Dialog open={isOpen} onClose={() => {handleClose()}}>
			<DialogTitle>Themes</DialogTitle>
			<DialogContent>
				{Object.keys(styles).map((styleName) => {
					return (<Button key={styleName} onClick={() => {setStyle(styleName)}}>{styleName}</Button>)
				})}
			</DialogContent>
			<DialogActions>

			</DialogActions>
		</Dialog>
	)
}
const BodyContent = ({styles, setStyle}) => {
	const [dummyData, setDummy] = useState([16, 4, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 13]);
	const [range, setRange] = useState([0, 17]);
	const [count, setCount] = useState(15)
	const [numDialogOpen, setNumDialog] = useState(false);
  const [styleDialogOpen, setStyleDialog] = useState(false);
  const [sortMenuAnchor, setSortMenu] = useState(null);
  const [sortType, setSortType] = useState("insertion");
  const [sortIndex, setSortIndex] = useState(0);
  const [tick, setTick] = useState(0);

  const originalData = useRef([...dummyData]);
  const sortInfo = useRef({...(sortParam.insertion)});

	const theme = useTheme();
	console.log(theme);

	const setNumbers = (newRange, newCount) => {
		setNumDialog(false);
		setRange(newRange);
		setCount(newCount);
	}

  const startInterval = () => {
    setTick(900);
  }

  const resetInterval = () => {
    setTick(0);
    sortInfo.current = {...(sortParam[sortType])};
  }

  useInterval(() => {
    if (!sortInfo.current.completed) {
      let result = callSortStep([...dummyData],sortInfo.current,sortType);
      setDummy(result.arr);
      sortInfo.current = result.param;
    }
    else {
      setTick(0);
    }
  }, tick);

	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton color="inherit" onClick={(event) => { setSortMenu(event.currentTarget) }}>
						<BarChartIcon />
					</IconButton>
          <Menu 
            keepmounted open={Boolean(sortMenuAnchor)} 
            anchorEl={sortMenuAnchor}
            onClose={() => { setSortMenu(null) }}
          >
            {Object.keys(sortParam).map((sort, index) => {
              return (
                <MenuItem key={sort} selected={index === sortIndex} onClick={() => { resetInterval(); setSortType(sort); setSortIndex(index); setDummy(originalData.current); sortInfo.current = {...(sortParam[sort])} }}>
                  {sort}
                </MenuItem>
              )
            })}
          </Menu>
					<IconButton color="inherit" onClick={() => { setNumDialog(true) }}>
						<TuneIcon />
					</IconButton>
					<IconButton color="inherit" onClick={() => { setStyleDialog(true) }}>
						<ColorLensIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
			<Toolbar />
			<Grid container direction="row" justify="space-evenly" alignItems="center">
				<Grid item>
					<Grid container direction="column" justify="center" alignItems="center" spacing={1}>
						<Grid item>
              <Button onClick={() => { resetInterval(); let newData = randomData(range, count); setDummy(newData); originalData.current = [...newData] }} variant="contained" color="primary">Randomize</Button>
						</Grid>
						<Grid item>
							<Button onClick={() => { resetInterval(); let newData = [...dummyData]; setDummy(newData.sort((a, b) => a - b)) }} variant="contained" color="primary">Sort</Button>
						</Grid>
						<Grid item>
							<Button onClick={() => {(tick === 0) ? (startInterval()) : (setTick(0))}} variant="contained" color="primary">Begin Sort</Button>
						</Grid>		
					</Grid>
				</Grid>
				<Grid item>
					<BarGraph
						data={dummyData} colors={{ axis: theme.palette.primary.main, bar: theme.palette.primary.main }} />
				</Grid>
			</Grid>
			<NumberDialog defRange={range} defCount={count} isOpen={numDialogOpen} handleClose={() => { setNumDialog(false) }} handleConfirm={setNumbers} />
			<StyleDialog styles={styles} setStyle={(styleName) => {setStyle(styleName)}} isOpen={styleDialogOpen} handleClose={() => { setStyleDialog(false)}}/>
		</>
	) 
}

export default BodyContent;