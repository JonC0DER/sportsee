import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';

function Score({data}) {
  
  //console.log(data)
  const d3chart = useRef();

  useEffect(() => {
    const h = 258;
    const w = 263;
    const padding = 60;
    const colorPolice = "#20253A";

    const svg = d3.select(d3chart.current)
    .attr("width", w)
    .attr("height", h);
 
    // TEXT TITLE
    svg.append('text')
    .text("Score")
    .attr("x", 30)
    .attr("y", h - (h - 24))
    .attr("font-size", 18)
    .attr("font-weight", "bold")
    .attr("fill", colorPolice);

    const group = svg.append('g');
    const x = w / 2;
    const y = h /2;
    
    // WHITE CENTER CIRCLE
    group.append('circle')
    .attr("cx", x)
    .attr("cy", y)
    .attr("r", 90)
    .attr("stroke", "none")
    .attr("fill", "white"); 

    // TEXT PERCENT
    group.append("text")
    .text(`${data * 100}%`)
    .attr("x", x - 15)
    .attr("y", y)
    .attr("font-size", 30)
    .attr("font-weight", "bold")
    .attr("fill", colorPolice);

    // TEXT OBJECTIF GOAL
    group.append("text")
    .text(`de votre objectif`)
    .attr("x", x - padding/1.3)
    .attr("y", y + padding/2)
    .attr("font-size", 15)
    .attr("font-weight", "bold")
    .attr("fill", "#74798C");

    const hundredPercent = Math.PI * 2;
    const onePercent = hundredPercent / 100;
    const scorePercent = data * 100;
    const score = scorePercent * onePercent;
    var arc = d3.arc()
    .innerRadius(90)
    .outerRadius(100)
    .endAngle(score)
    .startAngle(0);
    
    group.append("path")
    .attr("transform", "translate("+ x +","+ y +")")
    .attr("class", "arc")
    .attr("d", arc)
    .attr("fill","red");


  });
    
  return (
    <div className="score">
      <svg ref={d3chart}></svg>
    </div>
  )
}

export default Score