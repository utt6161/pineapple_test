import { useState, useEffect, useCallback } from 'react';

export default function useLongPress(callback = () => {}, ms = 300) {
    const [startLongPress, setStartLongPress] = useState(false);

    useEffect(() => {
        let timerId: NodeJS.Timeout;
        if (startLongPress) {
            timerId = setTimeout(()=>{
                stop()
                callback()
            }, ms);
        } else {
            // @ts-ignore
            clearTimeout(timerId);
        }

        return () => {
            clearTimeout(timerId);
        };
    }, [callback, ms, startLongPress]);

    const start = useCallback(() => {
        setStartLongPress(true);
    }, []);
    const stop = useCallback(() => {
        setStartLongPress(false);
    }, []);

    return {
        onMouseDown: start,
        // onMouseUp: stop,
        onMouseLeave: stop,
        onTouchStart: start,
        // onTouchEnd: stop,
    };
}