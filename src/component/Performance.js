import React, { useEffect, useRef } from 'react'
import * as d3 from 'd3';
import PropTypes from 'prop-types';

/**
 * get props uses to draw performance graphic
 * @param {object} kind 
 * @param {array} kindValues 
 *
 * @component
 * @example
 * kind ={
 *    1 : "cardio"
 *    2 : "energy"
 *    3 : "endurance"
 *    4 : "strength"
 *    5 : "speed"
 *    6 : "intensity"
 * }
 * 
 * kindValues = [
 *    {value: 180, kind: 1}
 *    {value: 220, kind: 2}
 *    {value: 240, kind: 3}
 *    {value: 250, kind: 4}
 *    {value: 210, kind: 5}
 *    {value: 290, kind: 6}
 * ]
 *  @returns {component}
 */
function Performance({ kindValues, kind }) {
  //console.log(kindValues);
  const d3chart = useRef();

  useEffect(() => {
    const h = 258;
    const w = 263;

    /**
     * initialise svg element
     */
    const svg = d3.select(d3chart.current)
      .attr("viewBox", `0 0 ${h} ${w}`);

    /**
     * create a svg group that contain all the polygons
     */
    const groupPolygon = svg.append("g")
      .attr("class", "group-polygon");

    const pw = w / 2;
    const ph = h / 3;
    const originPadding = 20;
    const padding = 40;
    const secondPaddingPolyg = padding + 20;
    const thirdPaddingPolyg = secondPaddingPolyg + 20;
    const fourPaddingPolyg = thirdPaddingPolyg + 20;
    const fivePaddingPolyg = fourPaddingPolyg + 20;

    /**
     * the array contain objects
     * each object the [x, y] coordinates for each polygon
     * we need to draw
     */
    const fourDivid = 2.7;
    const fiveDivid = 2.45;
    const polygon = [
      {// ORIGIN
        firstLeftPoint: [originPadding, ph - (originPadding / 2)],
        secondLeftPoint: [originPadding, (ph * 2) + (originPadding / 2)],
        lowPoint: [pw, h - originPadding],
        secondRightPoint: [w - originPadding, ph * 2 + (originPadding / 2)],
        firstRightPoint: [w - originPadding, ph - (originPadding / 2)],
        highPoint: [pw, originPadding]
      },
      {// FIRST POLYGON
        firstLeftPoint: [padding, ph],
        highPoint: [pw, padding],
        firstRightPoint: [w - padding, ph],
        secondRightPoint: [w - padding, ph * 2],
        lowPoint: [pw, h - padding],
        secondLeftPoint: [padding, (ph * 2)]
      },
      {// SECOND POLYGON
        firstLeftPoint: [secondPaddingPolyg, ph + (secondPaddingPolyg / 6)],
        highPoint: [pw, secondPaddingPolyg],
        firstRightPoint: [w - secondPaddingPolyg, ph + (secondPaddingPolyg / 6)],
        secondRightPoint: [w - secondPaddingPolyg, (ph * 2) - (secondPaddingPolyg / 6)],
        lowPoint: [pw, h - secondPaddingPolyg],
        secondLeftPoint: [secondPaddingPolyg, (ph * 2) - (secondPaddingPolyg / 6)]
      },
      {// THIRD POLYGON
        firstLeftPoint: [thirdPaddingPolyg, ph + (secondPaddingPolyg / 3)],
        highPoint: [pw, thirdPaddingPolyg],
        firstRightPoint: [w - thirdPaddingPolyg, ph + (secondPaddingPolyg / 3)],
        secondRightPoint: [w - thirdPaddingPolyg, (ph * 2) - (secondPaddingPolyg / 3)],
        lowPoint: [pw, h - thirdPaddingPolyg],
        secondLeftPoint: [thirdPaddingPolyg, (ph * 2) - (secondPaddingPolyg / 3)]
      },
      {// FOUR POLYGON
        firstLeftPoint: [fourPaddingPolyg, ph + (thirdPaddingPolyg / fourDivid)],
        highPoint: [pw, fourPaddingPolyg],
        firstRightPoint: [w - fourPaddingPolyg, ph + (thirdPaddingPolyg / fourDivid)],
        secondRightPoint: [w - fourPaddingPolyg, (ph * 2) - (thirdPaddingPolyg / fourDivid)],
        lowPoint: [pw, h - fourPaddingPolyg],
        secondLeftPoint: [fourPaddingPolyg, (ph * 2) - (thirdPaddingPolyg / fourDivid)]
      },
      {// FIVE POLYGON
        firstLeftPoint: [fivePaddingPolyg, ph + (fourPaddingPolyg / fiveDivid)],
        highPoint: [pw, fivePaddingPolyg],
        firstRightPoint: [w - fivePaddingPolyg, ph + (fourPaddingPolyg / fiveDivid)],
        secondRightPoint: [w - fivePaddingPolyg, (ph * 2) - (fourPaddingPolyg / fiveDivid)],
        lowPoint: [pw, h - fivePaddingPolyg],
        secondLeftPoint: [fivePaddingPolyg, (ph * 2) - (fourPaddingPolyg / fiveDivid)]
      }
    ];

    /**
     * we use a forEach loop on 
     * the polygon array to draw every polygon
     */
    polygon.forEach((polyg, i) => {
      return (i !== 0) ? groupPolygon.append('polygon')
        .attr('points',
          `${polyg.firstLeftPoint[0]} ${polyg.firstLeftPoint[1]},
    ${polyg.highPoint[0]} ${polyg.highPoint[1]},
    ${polyg.firstRightPoint[0]} ${polyg.firstRightPoint[1]},
    ${polyg.secondRightPoint[0]} ${polyg.secondRightPoint[1]},
    ${polyg.lowPoint[0]} ${polyg.lowPoint[1]},
    ${polyg.secondLeftPoint[0]} ${polyg.secondLeftPoint[1]}
    `)
        .attr("fill", "none")
        .attr("stroke", "white")
        .attr("stroke-width", 1) : null;
    })

    /**
     * kind values of the red polygon
     * we transform the object into an array
     */
    const valuesKind = Object.values(kindValues);
    //console.log(valuesKind)
    const halfHeight = h / 2;
    const graphicCenter = [pw, halfHeight];
    const end = 300; // 3

    /**
     * this array contain values that help stay on
     * invisible lines from the center, to the corner of the polygons
     */
    const kindLines = [
      [(pw - polygon[1].firstLeftPoint[0]) / 100, (halfHeight - polygon[1].firstLeftPoint[1]) / 100],
      [(pw - polygon[1].secondLeftPoint[0]) / 100, (polygon[1].secondLeftPoint[1] - halfHeight) / 100],
      [0, (polygon[1].lowPoint[1] - halfHeight) / 100],
      [(polygon[1].secondRightPoint[0] - pw) / 100, (polygon[1].secondRightPoint[1] - halfHeight) / 100],
      [(polygon[1].firstRightPoint[0] - pw) / 100, (halfHeight - polygon[1].firstRightPoint[1]) / 100],
      [0, (halfHeight - polygon[1].highPoint[1]) / 100]
    ];

    /**
     * this function made all the math that help to draw
     * each point of the red polygon and stay on the invisible lines
     * @returns {array}
     */
    const kindPercentCalc = () => {
      return valuesKind.map((kindVal) => {
        const currentPercent = (kindVal.value / end) * 100;
        const index = kindVal.kind - 1;
        const initCalc = [
          kindLines[index][0] * currentPercent,
          kindLines[index][1] * currentPercent
        ];
        const calc = [];
        switch (index) {
          case 0:
            [calc[0], calc[1]] = [graphicCenter[0] - initCalc[0], graphicCenter[1] - initCalc[1]]
            break;
          case 4:
            [calc[0], calc[1]] = [graphicCenter[0] + initCalc[0], graphicCenter[1] - initCalc[1]]
            break;
          case 1:
            [calc[0], calc[1]] = [graphicCenter[0] - initCalc[0], graphicCenter[1] + initCalc[1]]
            break;
          case 3:
            [calc[0], calc[1]] = [graphicCenter[0] + initCalc[0], graphicCenter[1] + initCalc[1]]
            break;
          case 2:
            [calc[0], calc[1]] = [graphicCenter[0], graphicCenter[1] + initCalc[1]]
            break;
          case 5:
            [calc[0], calc[1]] = [graphicCenter[0], graphicCenter[1] - initCalc[1]]
            break;
          default:
            break;
        }
        return calc
      })
    }
    const vP = kindPercentCalc();
    //console.log(vP)
    /**
     * draw the red polygon with the kindValues
     */
    groupPolygon.append('polygon')
      .attr('points',
        `${vP[0][0]} ${vP[0][1]},
      ${vP[5][0]} ${vP[5][1]},
      ${vP[4][0]} ${vP[4][1]},
      ${vP[3][0]} ${vP[3][1]},
      ${vP[2][0]} ${vP[2][1]},
      ${vP[1][0]} ${vP[1][1]}
    `)
      .attr("fill", "red")
      .attr("fill-opacity", 0.5)
      .attr("stroke", "none")
      .attr("stroke-width", 1);

    /**
     * write the text in the corners of the polygon
     */
    const groupText = svg.append("g")
      .attr("class", "group-text");

    const capitalizeFirstLetter = (str) => {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const textPos = Object.values(polygon[0]);
    const translateKind = {
      "cardio": "cardio",
      "energy": "énergie",
      "endurance": "endurance",
      "strength": "force",
      "speed": "vitesse",
      "intensity": "intensité"
    }

    const newKind = Object.keys(kind).reduce((newObj, key) => {
      newObj[key] = translateKind[kind[key]];
      return newObj;
    }, {});

    const kinds = Object.values(newKind);
    //console.log(kinds)
    //console.log(textPos)
    groupText
      .selectAll("text")
      .data(kinds)
      .enter()
      .append("text")
      .text((d) => capitalizeFirstLetter(d))
      .attr("x", (d, i) => textPos[i][0] - 19)
      .attr("y", (d, i) => textPos[i][1])
      .attr("font-size", 10)
      .attr("font-weight", "400")
      .attr("fill", "white");
  });

  return (
    <div className="performance">
      <svg ref={d3chart}></svg>
    </div>
  )
}

Performance.propTypes = {
  kindValues: PropTypes.arrayOf(
    PropTypes.exact({
      value: PropTypes.number,
      kind: PropTypes.number
    }).isRequired
  ),
  kind: PropTypes.objectOf(PropTypes.string),
}

export default Performance