import React, { useState } from 'react';
import {BarGraph} from './d3/BarGraph';
import { Button } from '@material-ui/core'
const BodyContent = () => {
    const [dummyData, setDummy] = useState([16,4,1,2,3,4,5,6,7,8,10,11,12,13]);
    const [sortedData, setSorted] = useState(dummyData);
    const [dataChanged, changedData] = useState(false);

    const randomData = () => {
        let len = Math.floor(Math.random()*17) + 2;
        return [...Array(len).keys()].map( (num) => {
            return Math.floor(Math.random() * 17)
        });
    }

    return (
        <>
            <Button onClick={ () => {setDummy(randomData); changedData(!dataChanged)}}>Randomize</Button>
            <Button onClick={ () => {let newData = [...dummyData]; setSorted(newData.sort((a,b) => a - b))}}>Sort</Button>
            <BarGraph
                data={dummyData} sortedData={sortedData} dataChanged={dataChanged}/>
        </>
    )
}

export default BodyContent;