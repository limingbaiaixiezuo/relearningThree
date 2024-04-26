import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const D3Test: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const data = [10, 20, 30, 40, 50, 80, 120];
    const svg = d3.select(svgRef.current)
      .attr('width', 300)
      .attr('height', 160);

    svg.selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => i * 50)
      .attr('width', 40)
      .attr('height', d => d)
      .attr('fill', 'steelblue');
  }, []);

  return (
    <div>
      <svg ref={svgRef} />
    </div>
  );
};

export default D3Test;