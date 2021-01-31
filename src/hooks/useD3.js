import {useEffect, useRef} from 'react';
import * as d3 from 'd3';

const useD3 = (graphFn, dependencies) => {
    const d3Ref = useRef();

    useEffect(() => {
        graphFn(d3.select(d3Ref.current));
        return () => {};
    }, dependencies);

    return d3Ref;
} 
export {useD3};