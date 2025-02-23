import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Child2 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const width = 500, height = 300, margin = 40;

    const avgTipsByDay = d3.rollup(
      data,
      v => d3.mean(v, d => d.tip),
      d => d.day
    );

    const xScale = d3.scaleBand()
      .domain([...avgTipsByDay.keys()])
      .range([margin, width - margin])
      .padding(0.2);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(avgTipsByDay.values())])
      .range([height - margin, margin]);

    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f4f4f4")
      .style("overflow", "visible");

    svg.selectAll("rect")
      .data([...avgTipsByDay])
      .enter().append("rect")
      .attr("x", d => xScale(d[0]))
      .attr("y", d => yScale(d[1]))
      .attr("width", xScale.bandwidth())
      .attr("height", d => height - margin - yScale(d[1]))
      .style("fill", "#69b3a2");

    svg.append("g")
      .attr("transform", `translate(0, ${height - margin})`)
      .call(d3.axisBottom(xScale));

    svg.append("g")
      .attr("transform", `translate(${margin}, 0)`)
      .call(d3.axisLeft(yScale));

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", height - 5)
      .attr("text-anchor", "middle")
      .text("Day");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Average Tip");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .text("Average Tip by Day");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Child2;
