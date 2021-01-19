import {useD3} from '../../hooks/useD3';
import React from 'react';

const BarGraph = ({data}) => {
    const ref = useD3(
        (svg) => {
            const update = svg.append('g')
                .selectAll('text')
                .data(data);
            update.enter()
                .append('text')
                .attr('x', (d, i) => i * 25)
                .attr('y', 40)
                .style('font-size', 24)
                .text((d) => d);
            update.exit()
                .remove();
        }
    ,[data]);

    return (
        <svg
            ref = {ref}
            style={{
                height: 500,
                width: "100%"
            }}
        />
    )
}

export {BarGraph};