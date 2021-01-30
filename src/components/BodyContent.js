import React, { useState } from 'react';
import {BarGraph} from './d3/BarGraph';
//import { Button } from '@material-ui/core'
const BodyContent = () => {
    const [dummyData, setDummy] = useState([4,1,2,3,4,5,6,7,8,10,11,12,13,16]);

    return (
        <>
            <Button/>
            <BarGraph
                data={dummyData}/>
        </>
    )
}

export default BodyContent;