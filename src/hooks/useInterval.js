import {useEffect, useRef} from 'react';

const useInterval = (callback, interval) => {
    const currCallback = useRef();

    useEffect(() =>  {
        currCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        if (interval !== null && interval !== 0) {
            let id = setInterval(() => {currCallback.current()}, interval);
            return () => {clearInterval(id)};
        }
    }, [interval]);
}

export {useInterval};