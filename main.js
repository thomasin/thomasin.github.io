document.addEventListener('DOMContentLoaded', start)

function start () {
  createHexGrid()
}

function calculatePoints (svg) {
  const radius = (Math.floor(Math.random() * 48) + 16) // If the hexes get too small the page is too slow
  // Dimensions of svg
  const width = svg.node().clientWidth
  const height = svg.node().clientHeight
  // How many hexes
  const columns = Math.ceil(height / (radius * Math.sqrt(3)) * 2.5) + radius
  const rows = Math.ceil(width / (radius * 2)) + radius
  const points = createPointsArr(rows, columns, radius)
  return { points, radius }
}

function createPointsArr (rows, columns, radius) {
  let points = [];
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      points.push([radius * j * 1.75, radius * i * 1.5]);
    }//for j
  }//for i
  return points
}

function createHexGrid () {
  let svg = d3.select('.landing')
              .append('svg')
  const stroke = ((Math.floor(Math.random() * 8) + 2)) // Random hex thickness
  const {points, radius} = calculatePoints(svg)
  const hexbin = d3.hexbin()
                  .radius(radius)
  drawHexgrid(svg, hexbin, points, stroke)
  applyHexTransition()
}

function drawHexgrid (svg, hexbin, points, stroke) {
  svg.append("g")
    .attr('class', 'svgBackground')
    .selectAll(".hexagon")
    .data(hexbin(points))
    .enter().append("path")
    .attr("class", "hexagon")
    .attr("d", (d) => "M" + d.x + "," + d.y + hexbin.hexagon())
    .attr("stroke-width", `${stroke}px`)
}

function applyHexTransition () {
  d3.selectAll('.hexagon')
    .on("mouseover", mover)
    .on("mouseout", mout)
}

// Mouse over function
function mover (d) {
  d3.select(this)
		.transition()
		.duration(10)
		.style("fill", "#ffa3a3")
}

// Mouse out function
function mout (d) {
	d3.select(this)
	   .transition()
	   .duration(1500)
	   .style("fill", "#ff9999")
}

// function setWaypoint () {
//   new Waypoint({
//   element: document.getElementById('navBar'),
//   offset: 50,
//   handler: (direction) => {
//     direction == 'down'
//     ? console.log('down')
//     : console.log('up')
//   }
// })
// }
