import React, { useState } from 'react';
import {BarGraph} from './d3/BarGraph';

const BodyContent = () => {
    const [dummyData, setDummy] = useState([1,2,3,4,5]);

    return (
        <>
            <BarGraph
                data={dummyData}/>
        </>
    )
}

export default BodyContent;