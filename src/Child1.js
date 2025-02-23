import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

const Child1 = ({ data }) => {
  const svgRef = useRef();

  useEffect(() => {
    if (data.length === 0) return;

    const width = 500, height = 300, margin = 40;
    
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .style("background", "#f4f4f4")
      .style("overflow", "visible");

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.total_bill)])
      .range([margin, width - margin]);

    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.tip)])
      .range([height - margin, margin]);

    svg.selectAll("circle")
      .data(data)
      .enter().append("circle")
      .attr("cx", d => xScale(d.total_bill))
      .attr("cy", d => yScale(d.tip))
      .attr("r", 4)
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
      .text("Total Bill");

    svg.append("text")
      .attr("transform", "rotate(-90)")
      .attr("x", -height / 2)
      .attr("y", 15)
      .attr("text-anchor", "middle")
      .text("Tips");

    svg.append("text")
      .attr("x", width / 2)
      .attr("y", 20)
      .attr("text-anchor", "middle")
      .attr("font-size", "16px")
      .text("Total Bill vs Tips");
  }, [data]);

  return <svg ref={svgRef}></svg>;
};

export default Child1;
