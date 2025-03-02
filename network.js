// Set Canvas Size to Fullscreen
const width = window.innerWidth;
const height = window.innerHeight;

// Number of nodes
const numNodes = 50;

// Create SVG (Now Fullscreen)
const svg = d3.select("#network")
    .attr("width", width)
    .attr("height", height);

// Generate Random Nodes (Spread Across Entire Screen)
const nodes = d3.range(numNodes).map(() => ({
    x: Math.random() * width,
    y: Math.random() * height
}));

// Generate Random Links
const links = d3.range(numNodes * 1.5).map(() => ({
    source: Math.floor(Math.random() * numNodes),
    target: Math.floor(Math.random() * numNodes)
}));

// Force Simulation
const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(-60)) // Spread out more
    .force("link", d3.forceLink(links).distance(120).strength(0.15)) // Looser structure
    .force("center", d3.forceCenter(width / 2, height / 2)) // Keep balanced
    .force("x", d3.forceX(width / 2).strength(0.03))
    .force("y", d3.forceY(height / 2).strength(0.03))
    .alphaDecay(0.008); // Slower decay for smooth animation

// Draw Links (Edges) - Now Electric Blue
const link = svg.append("g")
    .attr("stroke", "#0088FF") // 🔥 Brighter contrast
    .attr("stroke-opacity", 0.6)
    .attr("stroke-width", 1.2)
    .selectAll("line")
    .data(links)
    .enter().append("line");

// Draw Nodes (Points) - Now Electric Blue
const node = svg.append("g")
    .selectAll("circle")
    .data(nodes)
    .enter().append("circle")
    .attr("r", 3)
    .attr("fill", "#0088FF") // 🔥 Matching color
    .attr("opacity", 0.8); // Slight glow effect

// Simulation Update
simulation.on("tick", () => {
    link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

    node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
});