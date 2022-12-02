import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';

function AverageSessions({data}) {

  //console.log(data)
  const d3chart = useRef();

  useEffect(() => {
    const h = 258;
    const w = 263;
    const padding = 30;
    
    const svg = d3.select(d3chart.current)
    .attr("width", w)
    .attr("height", h);
    
    // TITLE
    svg.append("text")
    .text("Durée moyenne des sessions")
    .attr("x", 34)
    .attr("y", h - (h - 29))
    .attr("fill", "#FFFFFF")
    .attr("fill-opacity", 0.5);
    
    // PATH
    const points = data.sessions.map(el => [ el.day, el.sessionLength ]);
    const lineGenerator = d3.line()
    .x((p) => p[0] * padding)
    .y((p) => (h/1.5) - p[1])
    //.curve(d3.curveLinear);
    .curve(d3.curveCardinal);
    
    //const pathData = lineGenerator

    svg.append('path')
	  .attr('d', lineGenerator(points))
    .attr("fill", "none")
    .attr("stroke-width", "none")
    .attr("stroke","white");

    const group = svg.selectAll("g")
	  .data(points)
    .enter()
	  .append('g')
    .attr("class","show-points");

    const lilteGroup = group
    .append("g")
    .attr("x", (d) => d[0] * padding)
    .attr("y", (d) => ((h/1.5) - (d[1] + padding)))
    .attr("class", "litle-group");

    // RECTANGLE
    lilteGroup
    .append("rect")
    .attr("x", (d) => d[0] * padding)
    .attr("y", (d) => ((h/1.5) - (d[1] + padding)))
    .attr("width", 39)
    .attr("height", 25)
    .attr("fill", "#FFFFFF");

    // TEXT OF LITLE RECTANGLE
    lilteGroup
    .append("text")
    .text(d => `${d[1]} min`)
    .attr("x", (d) => (d[0] * padding) + 3)
    .attr("y", (d) => ((h/1.5) - (d[1] + padding)) + 15)
    .attr("font-size", 12)
    .attr("font-weight", "bold")
    .attr("fill", "black");

	  group
    .append('circle')
	  .attr('cx', d => d[0] * padding)
	  .attr('cy', d => (h/1.5) - d[1])
    .attr('r', 3)
    .attr("fill", "white")
    .attr("class", "show-circle")
    .attr("stroke","white")
    .attr("stroke-opacity", 0.5)
    .attr("stroke-width", 6);

    // AXIS
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
    .attr("transform", "translate("+ (padding * 1) +"," + (h - (padding - 20)) + ")")
	  .text(d => d )
    .attr("fill", "#FFFFFF")
    .attr("fill-opacity", 0.5);
  });

  return (
    <div className="average-session">
      <svg ref={d3chart}></svg>
    </div>
  )
}

export default AverageSessions