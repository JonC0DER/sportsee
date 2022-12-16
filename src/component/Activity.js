import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/**
 * get props uses to draw activity graphic
 * @param {*} param0 
 * @returns 
 */
function Activity({data}) {
  //console.log(data)
  const d3chart = useRef();
  useEffect(()=>{
    const h = 320;
    const w = 835;
    const padding = 30;

    /**
     * initialise svg element
     */
    const svg = d3.select(d3chart.current)
    .attr("width", w)
    .attr("height", h);

    // TITLE
    svg.append("text")
    .text("Activité quotidienne")
    .attr("x", 32)
    .attr("y", h - (h - 24));  

    const legend = svg.append("g");

    // FISRT ELEMENT LEGEND
    const firstElemLegend = legend.append("g");
      // FISRT ELEMENT LEGEND CIRLCE
      firstElemLegend
      .append("circle")
      .attr("cx", 526)
      .attr("cy", h - (h - 28))    
      .attr("r", 3)    
      .attr("stroke", "black")    
      .attr("stroke-width", 1)    
      .attr("fill", "black");

      // FISRT ELEMENT LEGEND TEXT
      firstElemLegend
      .append("text")
      .text("Poids (kg)")
      .attr("x", 532)
      .attr("y", h - (h - 32))    
      .attr("fill", "#74798C") 
      .attr("font-family", "Roboto")
      .attr("font-size", 14)
      .attr("font-weight", 500)
      .attr("line-height", 24);
      
    // SECOND ELEMENT LEGEND
    const secondElemLegend = legend.append("g")
      // SECOND ELEMENT LEGEND CIRLCE
      secondElemLegend
      .append("circle")
      .attr("cx", 646)
      .attr("cy", h - (h - 28))    
      .attr("r", 3)    
      .attr("stroke", "red")    
      .attr("stroke-width", 1)    
      .attr("fill", "red");
    
      // SECOND ELEMENT LEGEND TEXT
      secondElemLegend
      .append("text")
      .text("Calories brûlées (kCal)")
      .attr("x", 666)
      .attr("y", h - (h - 32))    
      .attr("fill", "#74798C") 
      .attr("font-family", "Roboto")
      .attr("font-size", 14)
      .attr("font-weight", 500)
      .attr("line-height", 24);

    /**
     * create group that contain all graphics bars
     */
    const group = svg.selectAll("g.show-me")
    .data(data.sessions)
    .enter()
    .append("g")
    .attr("class","show-me");
    
    // GROS RECTANGLE GRIS
    const rectGreyWidth = 58;
    group
    .append("rect")
    .attr("x", (d,i) => ((i) * (rectGreyWidth * 2)) + padding/2 )
    .attr("y", (d) => (d.kilogram * 1.5 > d.calories/2)
      ?h - ((d.kilogram * 1.5) + padding + 10)
      :h - ((d.calories/2) + padding + 10))
    .attr("width", rectGreyWidth)
    .attr("height", (d) => (d.kilogram * 1.5 > d.calories/2)
      ?(d.kilogram * 1.5) + 10
      :(d.calories/2) + 10)
    .attr("fill", "#C4C4C4")
    .attr("fill-opacity", "0.5")
    .attr("class","show-me-big");

    const ticket = group
    .append("g")
    .attr("class","show-me-litle");

    // PETIT RECTANGLE ROUGE
    const redTicketX = (rectGreyWidth * 2);
    const redTicketXPlus = 80;
    ticket
    .append("rect")
    .attr("width", 50)
    .attr("height", 60)
    .attr("x", (d,i) => (i * redTicketX) + redTicketXPlus)
    .attr("y", (d) => h - ((d.calories/2) + (padding * 2)))
    .attr("fill", "red");

    const text = ticket
    .append("text")
    .attr("x", (d,i) => (i * redTicketX) + redTicketXPlus)
    .attr("y", (d) => h - ((d.calories/2) + (padding * 2)))
    .attr("fill", "white") // white in prod | black to dev
    .attr("font-size", 12)
    .attr("font-weight", "bold");

    // PREMIER TSPAN : KILOS
    text
    .append("tspan")
    .attr("x", (d,i) => (i * redTicketX) + 92)
    .attr("y", (d) => h - ((d.calories/2) + ((padding + 15))) )
    .text((d) => `${d.kilogram}kg`);
    
    // DEUXIEME TSPAN : CALORIES
    text
    .append("tspan")
    .attr("x", (d,i) => (i * redTicketX) + 84)
    .attr("y", (d) => h - ((d.calories/2) + (padding - 20)) )
    .text((d) => `${d.calories}kCal`);
  
    // BARRE NOIRE GRAPHIQUE KILOGRAM
    group
    .append("rect")
    .attr("x", (d,i) => ((i + 1) * (rectGreyWidth * 2)) - (padding * 2.8))
    .attr("y", (d,i) => h - ((d.kilogram * 1.5) + padding))
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("width", 7)
    .attr("height", (d) => d.kilogram * 1.5)
    .attr("fill", "black");
    
    // BARRE ROUGE GRAPHIQUE CALORIES
    group
    .append("rect")
    .attr("x", (d,i) => (((i + 1) * (rectGreyWidth * 2)) - (padding * 2.8)) + 17)
    .attr("y", (d,i) => h - ((d.calories/2) + padding))
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("width", 7)
    .attr("height", (d) => d.calories/2)
    .attr("fill", "red");

    // AXIS
    /**
     * create x axis bar
     */
    const xData = data.sessions.map((elem, k)=> k);
    const xlogScale = d3.scaleLog();
    xlogScale
	  .domain([d3.min(xData, d => d + 1), d3.max(xData, d => d + 1)])
    .range([padding, w - padding]);

    svg.append('g')
    .selectAll('text')
	  .data(xData)
	  .join('text')
	  .attr('x', d => d * (rectGreyWidth * 2))
    .attr("transform", "translate("+ (padding * 1.4) +"," + (h - (padding - 20)) + ")")
	  .text(d => d + 1)
    .attr("fill","gray");
   
    /**
     * create y axis bar
     */
    const yData = data.sessions.map((elem)=> elem.kilogram);
    const yDataMax = d3.max(yData, d => d);
    const newData = [yDataMax - 1, yDataMax, yDataMax + 1].reverse();
    const ylogScale = d3.scaleLog();
    //console.log(yData)
    ylogScale
	  .domain([yDataMax - 1, yDataMax + 1])
    .range([h - (padding * 3), padding]);

    svg.append('g')
    .selectAll('text')
	  .data(newData)
	  .join('text')
	  .attr('y', (d,i) => i * (rectGreyWidth * 2))
    .attr("transform", "translate("+ (w - padding) + ","+ (h - (h - (padding * 2))) +")")
	  .text(d => d)
    .attr("fill","gray");

  });

  return(  
    <div className="activity">
      <svg ref={d3chart}></svg>
    </div>
  )
}

Activity.propTypes = {
  data: PropTypes.exact({
    userId: PropTypes.number,
    sessions: PropTypes.arrayOf(
      PropTypes.exact({
        day: PropTypes.string,
        kilogram: PropTypes.number,
        calories: PropTypes.number,
      })
    ),
  })
}

export default Activity