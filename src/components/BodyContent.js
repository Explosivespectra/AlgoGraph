import React, { useState, useRef } from 'react';
import { BarGraph } from './d3/BarGraph';
import { Button, IconButton, AppBar, Toolbar, Dialog, DialogTitle, DialogActions, DialogContent, Slider, Typography, Grid } from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune';
import BarChartIcon from '@material-ui/icons/BarChart';
import ColorLensIcon from '@material-ui/icons/ColorLens';
import { useTheme, makeStyles } from '@material-ui/core/styles';
import { useInterval } from '../hooks/useInterval'

const useStyles = makeStyles(theme => ({

}));

const insertionStep = (arr, ind) => {
  let x = ind;
  while ( x > 0 && arr[x] < arr[x - 1]) {
    let copy = arr[x - 1];
    arr[x - 1] = arr[x];
    arr[x] = copy;
    x--;
  }
  return arr;
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
				<Slider defaultValue={defRange} value={range} min={0} max={1000} onChange={(event, newValue) => { setRange(newValue) }} valueLabelDisplay="auto" />
				<Typography gutterBottom>Count</Typography>
				<Slider defaultValue={defCount} value={count} min={2} max={1000} onChange={(event, newValue) => { setCount(newValue) }} valueLabelDisplay="auto" />
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
  const [tick, setTick] = useState(0);

  const ind = useRef(1);

	const theme = useTheme();
	console.log(theme);

	const randomData = () => {
		let len = count;
		return [...Array(len).keys()].map((num) => {
			return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
		});
	}

	const setNumbers = (newRange, newCount) => {
		setNumDialog(false);
		setRange(newRange);
		setCount(newCount);
	}

  const startInterval = () => {
    ind.current = 1;
    setTick(1000);
  }

  const resetInterval = () => {
    setTick(0);
    ind.current = 1;
  }

  useInterval(() => {
    if (ind.current < dummyData.length) {
      setDummy(insertionStep([...dummyData],ind.current));
      ind.current = ind.current + 1;
    }
    else {
      setTick(0);
    }
  }, tick);

	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					<IconButton color="inherit">
						<BarChartIcon />
					</IconButton>
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
							<Button onClick={() => { resetInterval(); setDummy(randomData) }} variant="contained" color="primary">Randomize</Button>
						</Grid>
						<Grid item>
							<Button onClick={() => { resetInterval(); let newData = [...dummyData]; setDummy(newData.sort((a, b) => a - b)) }} variant="contained" color="primary">Sort</Button>
						</Grid>
						<Grid item>
							<Button onClick={() => {(tick === 0) ? (setTick(1000)) : (setTick(0))}} variant="contained" color="primary">Begin Sort</Button>
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