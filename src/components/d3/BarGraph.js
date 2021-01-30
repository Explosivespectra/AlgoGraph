import {useD3} from '../../hooks/useD3';
import React, {useEffect, useRef} from 'react';
import * as d3 from "d3"; 

const BarGraph = ({data}) => {
    /*
    *Prior changes not using useD3 hook*
    let dimensions = {width: 500, height: 500};
    let margin = {top: 20, right: 20, bottom: 30, left: 40}

    let x = d3.scaleBand()
    .domain(data)
    .range([margin.left, dimensions.width - margin.right])
    .padding(0.1);

    let y = d3.scaleLinear()
    .domain([d3.min([...data,0], d => d), d3.max(data, d => d)]).nice()
    .range([dimensions.height - margin.bottom, margin.top]);

    const createBottomAxis = () => {
        console.log("yes");
        let xAxis = d3.axisBottom(x).ticks(dimensions.width / 80 ).tickSizeOuter(0);
        let xTransform = 'translate(0, '  + (dimensions.height - margin.bottom) + ')';

        const xAxisRef = axis => {
            axis && xAxis(d3.select(axis));
        };
        return (
            <g transform ={xTransform} ref={xAxisRef}>

            </g>
        )
    }
    */

    const currentData = useRef(data);
    const dimensions = useRef({width: 500, height: 500});
    const margin = useRef({top: 20, right: 20, bottom: 30, left: 40});
    const xScale = useRef(d3.scaleBand()
    .domain(data)
    .range([margin.current.left, dimensions.current.width - margin.current.right])
    .padding(0.1));
    const yScale = useRef(d3.scaleLinear()
    .domain([d3.min([...data,0], d => d), d3.max(data, d => d)]).nice()
    .range([dimensions.current.height - margin.current.bottom, margin.current.top]));

    const xAxis = (g) => {
        let d = dimensions.current;
        let m = margin.current;
        let x = xScale.current;
        g.attr("transform", `translate(0,${d.height - m.bottom})`)
            .call(d3.axisBottom(x).ticks(d.width / 80 ).tickSizeOuter(0))
            .call(g => g.append("text")
            .attr("x", d.width - m.right)
            .attr("y", -4)
            .attr("fill", "currentcolor")
            .attr("font-weight", "bold")
            .attr("text-anchor", "end")
            .text("Hello"));
    }
    /*
    const yAxis = (g) => {
        g.attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(dimensions.height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
            .attr("x", 4)
            .attr("text-anchor", "start")
            .attr("font-weight", "bold")
            .text("World"));
    }
    */
    //Initializing the graph
    const ref = useD3(
        (svg) => {
            /*
            let x = d3.scaleBand()
                .domain(data)
                .range([margin.left, dimensions.width - margin.right])
                .padding(0.1);
        
            let y = d3.scaleLinear()
                .domain([d3.min([...data,0], d => d), d3.max(data, d => d)]).nice()
                .range([dimensions.height - margin.bottom, margin.top]);
        
            let xAxis = (g) => g
            .attr("transform", `translate(0,${dimensions.height - margin.bottom})`)
            .call(d3.axisBottom(x).ticks(dimensions.width / 80 ).tickSizeOuter(0))
            .call(g => g.append("text")
                .attr("x", dimensions.width - margin.right)
                .attr("y", -4)
                .attr("fill", "currentcolor")
                .attr("font-weight", "bold")
                .attr("text-anchor", "end")
                .text("Hello"));
            let yAxis = (g) => g
            .attr("transform", `translate(${margin.left},0)`)
            .call(d3.axisLeft(y).ticks(dimensions.height / 40))
            .call(g => g.select(".domain").remove())
            .call(g => g.select(".tick:last-of-type text").clone()
                .attr("x", 4)
                .attr("text-anchor", "start")
                .attr("font-weight", "bold")
                .text("World"));
            */
            let x = xScale.current;
            let y = yScale.current;

            const updateRect = svg.selectAll('rect')
                .data(data);
            updateRect.join("rect")
                .attr("x", d => x(d))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d))
                .attr("height", d => y(0) - y(d))
                .attr("fill", "steelblue");

            svg.append("g")
                .call(xAxis);
            /*
            svg.append("g")
                .call(yAxis);
            */
        }
    ,[data]);
    useEffect(() => {

    },[]);
    return (
        <svg
            ref={ref}
            style={{
                height: 500,
                width: 500
            }}
        />
    )
    /*
    *For prior changes not using D3 Hook*
                {createBottomAxis()}
            {data.map((num) => (
                <rect x={x(num)} width={dimensions.width / (2 * data.length)} y={y(num)} height={y(0) - y(num)} fill="steelblue"/>
            ))}
    
    */
}

export {BarGraph};