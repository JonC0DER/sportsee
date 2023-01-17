import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/**
 * get props uses to draw average session graphic
 * @param {object} data
 * 
 * @component
 * @example
 * data ={
 *    sessions : [ 
 *        {
 *          day: 1, 
 *          sessionLength: 30
 *        }
 *        {day: 2, sessionLength: 23}
 *        {day: 3, sessionLength: 45}
 *        {...}
 *        {...}
 *        {...}
 *        {...}
 *    ]
 *    userId : 42
 * }
 * @returns {component}
 */
function AverageSessions({ data }) {
  //console.log(data)
  const d3chart = useRef();

  useEffect(() => {
    const h = 258;
    const w = 263;
    const padding = 30;

    /**
     * initialise svg element
     */
    const svg = d3.select(d3chart.current)
      .attr("width", w)
      .attr("height", h);

    /**
     * set TITLE in the svg
     */
    svg.append("text")
      .text("Durée moyenne des sessions")
      .attr("x", 34)
      .attr("y", h - (h - 29))
      .attr("fill", "#FFFFFF")
      .attr("fill-opacity", 0.5);

    /**
     * map the data.sessions to got points for the smooth svg line
     */
    const points = data.sessions.map(el => [el.day, el.sessionLength]);
    /**
     * creating the generator for the svg line
     */
    const lineGenerator = d3.line()
      .x((p) => p[0] * padding)
      .y((p) => (h / 1.5) - p[1])
      //.curve(d3.curveLinear);
      .curve(d3.curveCardinal);

    //const pathData = lineGenerator
    /**
     * draw the smooth line in the svg
     */
    svg.append('path')
      .attr('d', lineGenerator(points))
      .attr("fill", "none")
      .attr("stroke-width", "none")
      .attr("stroke", "white");

    /**
     * set the line points in all the groups svg that we creating
     */
    const group = svg.selectAll("g")
      .data(points)
      .enter()
      .append('g')
      .attr("class", "show-points");

    const lilteGroup = group
      .append("g")
      .attr("x", (d) => d[0] * padding)
      .attr("y", (d) => ((h / 1.5) - (d[1] + padding)))
      .attr("class", "litle-group");

    /** 
     * draw every rectangle that will contain our data
    */
    lilteGroup
      .append("rect")
      .attr("x", (d) => d[0] * padding)
      .attr("y", (d) => ((h / 1.5) - (d[1] + padding)))
      .attr("width", 39)
      .attr("height", 25)
      .attr("fill", "#FFFFFF");

    /**
     * draw TEXT OF every LITLE RECTANGLE
     */
    lilteGroup
      .append("text")
      .text(d => `${d[1]} min`)
      .attr("x", (d) => (d[0] * padding) + 3)
      .attr("y", (d) => ((h / 1.5) - (d[1] + padding)) + 15)
      .attr("font-size", 12)
      .attr("font-weight", "bold")
      .attr("fill", "black");

    /**
     * draw circle on :hover of the line
     */
    group
      .append('circle')
      .attr('cx', d => d[0] * padding)
      .attr('cy', d => (h / 1.5) - d[1])
      .attr('r', 3)
      .attr("fill", "white")
      .attr("class", "show-circle")
      .attr("stroke", "white")
      .attr("stroke-opacity", 0.5)
      .attr("stroke-width", 6);

    // AXIS
    /**
     * draw X axis on the bottom
     */
    const xData = ["L", "M", "M", "J", "V", "S", "D"];
    //const xData = data.sessions.map((elem, k)=> week[k]);
    const xlogScale = d3.scaleLog();
    xlogScale
      .domain([xData[0], xData[xData.length]])
      .range([padding, w - padding]);

    svg.append('g')
      .selectAll('text')
      .data(xData)
      .join('text')
      .attr('x', (d, i) => i * (padding))
      .attr("transform", "translate(" + (padding * 1) + "," + (h - (padding - 20)) + ")")
      .text(d => d)
      .attr("fill", "#FFFFFF")
      .attr("fill-opacity", 0.5);
  });

  return (
    <div className="average-session">
      <svg ref={d3chart}></svg>
    </div>
  )
}

AverageSessions.propTypes = {
  data: PropTypes.shape({
    sessions: PropTypes.arrayOf(
      PropTypes.exact({
        day: PropTypes.number,
        sessionLength: PropTypes.number
      })).isRequired,
  })
}

export default AverageSessions