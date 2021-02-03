import React, { useState } from 'react';
import {BarGraph} from './d3/BarGraph';
import { Button, IconButton, AppBar, Toolbar, Dialog, DialogTitle, DialogActions, DialogContent, Slider, Typography } from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune';
import BarChartIcon from '@material-ui/icons/BarChart';
import ColorLensIcon from '@material-ui/icons/ColorLens';

const NumberDialog = ({defRange, defCount, isOpen, handleClose, handleConfirm}) => {

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
                <Slider defaultValue={defRange} value={range} min={0} max={1000} onChange={(event, newValue) => {setRange(newValue)}} valueLabelDisplay="auto"/>
                <Typography gutterBottom>Count</Typography>
                <Slider defaultValue={defCount} value={count} min={2} max={1000} onChange={(event, newValue) => {setCount(newValue)}} valueLabelDisplay="auto"/>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={() => {handleConfirm(range, count)}}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}
const PaletteChooser = () => {

}
const BodyContent = () => {
    const [dummyData, setDummy] = useState([16,4,1,2,3,4,5,6,7,8,10,11,12,13,13]);
    const [range, setRange] = useState([0,17]);
    const [count, setCount] = useState(15)
    const [numDialogOpen, setNumDialog] = useState(false); 

    const randomData = () => {
        let len = count;
        return [...Array(len).keys()].map( (num) => {
            return Math.floor(Math.random() * (range[1] - range[0])) + range[0];
        });
    }

    const setNumbers = (newRange, newCount) => {
        setNumDialog(false);
        setRange(newRange);
        setCount(newCount);
    }

    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton color="inherit">
                        <BarChartIcon/>
                    </IconButton>
                    <IconButton color="inherit" onClick={() =>{setNumDialog(true)}}>
                        <TuneIcon/>
                    </IconButton>
                    <IconButton color="inherit">
                        <ColorLensIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Toolbar/>
            <Button onClick={ () => {setDummy(randomData)}}>Randomize</Button>
            <Button onClick={ () => {let newData = [...dummyData]; setDummy(newData.sort((a,b) => a - b))}}>Sort</Button>
            <BarGraph
                data={dummyData}/>
            <NumberDialog defRange={range} defCount={count} isOpen={numDialogOpen} handleClose={() => {setNumDialog(false)}} handleConfirm={setNumbers}/>
        </>
    )
}

export default BodyContent;