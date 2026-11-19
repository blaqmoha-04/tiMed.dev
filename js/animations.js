const geometryDesigns = [
  { type: "circle", width: 15, height: 15, opacity: 0.58 },
  {
    type: "square",
    width: 19,
    height: 19,
    rotation: "clockwise",
    duration: "20s",
    opacity: 0.66
  },
  {
    type: "triangle",
    width: 18,
    height: 17,
    rotation: "counterclockwise",
    duration: "16s",
    opacity: 0.64
  },
  {
    type: "hexagon",
    width: 23,
    height: 21,
    rotation: "clockwise",
    duration: "24s",
    opacity: 0.68,
    float: true,
    floatDuration: "9s"
  },
  {
    type: "diamond",
    width: 16,
    height: 16,
    rotation: "counterclockwise",
    duration: "18s",
    opacity: 0.62
  },
  {
    type: "irregular",
    width: 25,
    height: 23,
    rotation: "clockwise",
    duration: "21s",
    opacity: 0.66,
    float: true,
    floatDuration: "8s"
  }
];

const shapePositions = [
  [
    ["8%", "17%"], ["76%", "12%"], ["88%", "64%"],
    ["43%", "80%"], ["22%", "48%"], ["61%", "26%"]
  ],
  [
    ["84%", "26%"], ["12%", "56%"], ["49%", "18%"],
    ["73%", "82%"], ["39%", "70%"], ["19%", "30%"]
  ],
  [
    ["25%", "12%"], ["60%", "73%"], ["88%", "44%"],
    ["15%", "36%"], ["74%", "16%"], ["44%", "85%"]
  ],
  [
    ["67%", "23%"], ["24%", "76%"], ["52%", "54%"],
    ["84%", "18%"], ["8%", "33%"], ["74%", "83%"]
  ]
];

const geometryPolygons = {
  triangle: "12,2 22,21 2,21",
  hexagon: "6,2 18,2 23,12 18,22 6,22 1,12",
  diamond: "12,2 22,12 12,22 2,12",
  irregular: "4,2 19,1 23,9 18,21 8,23 1,13"
};

function createGeometryShape(shapeData, position) {
  const shape = document.createElement("span");
  const points = geometryPolygons[shapeData.type];
  let artwork;

  if (points) {
    artwork = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    artwork.setAttribute("viewBox", "0 0 24 24");
    artwork.setAttribute("aria-hidden", "true");

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", points);
    artwork.appendChild(polygon);
    artwork.classList.add("geometry-vector");
  } else {
    artwork = document.createElement("span");
  }

  shape.classList.add("geometry-shape", `geometry-${shapeData.type}`);
  shape.style.left = position[0];
  shape.style.top = position[1];
  shape.style.width = `${shapeData.width}px`;
  shape.style.height = `${shapeData.height}px`;
  shape.style.setProperty("--geometry-opacity", shapeData.opacity);
  artwork.classList.add("geometry-art");

  if (shapeData.rotation) {
    artwork.classList.add(`geometry-spin-${shapeData.rotation}`);
    artwork.style.setProperty("--geometry-speed", shapeData.duration);
  }

  if (shapeData.float) {
    shape.classList.add("geometry-float");
    shape.style.setProperty("--geometry-float-speed", shapeData.floatDuration);
  }

  shape.appendChild(artwork);
  return shape;
}

function initAnimations() {
  const surfaces = document.querySelectorAll(
    "body, .site-header, .primary-nav, .home-work, .home-profile, .home-contact, .work, .page-intro, .site-footer"
  );

  // Use different positions in each section so the shapes do not form a repeated grid.
  surfaces.forEach(function (surface, surfaceIndex) {
    if (surface.classList.contains("geometry-surface")) {
      return;
    }

    surface.classList.add("geometry-surface");

    const field = document.createElement("div");
    const layout = shapePositions[surfaceIndex % shapePositions.length];
    field.className = "geometry-field";
    field.setAttribute("aria-hidden", "true");

    geometryDesigns.forEach(function (shapeData, shapeIndex) {
      field.appendChild(createGeometryShape(shapeData, layout[shapeIndex]));
    });

    surface.appendChild(field);
  });
}
