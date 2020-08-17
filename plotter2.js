function spiro(t, r1, r2, s1, s2, theta, xscale) {
  x = r1 * sin(t * s1) + r2 * sin(t * s2)
  y = r1 * cos(t * s1) + r2 * cos(t * s2)
  y = y - r1 - r2 // start at 0,0

  x = x * xscale
  // rotate
  xnew = x * cos(theta) - y * sin(theta)
  ynew = x * sin(theta) + y * cos(theta)

  x = xnew
  y = ynew
  return [x, y]
}


function squaroid(t, r, s, mix, theta, xscale) {
  // rotating circle, points projected onto enclosing square
  // 
  x = sin(t * s)
  y = cos(t * s)
  xc=x
  yc=y
  
  // squarify
  angle=atan2(y,x)/PI
  
  if ((angle>=0 && angle < 1/4) || (angle < 0 && angle >= -1/4)){x=1}
  else if (angle>=1/4 && angle < 3/4) {y=1}
  else if (angle<-1/4 && angle >= -3/4 ) {y=-1}
  else {x=-1}
  
  x=(mix*x + (1-mix)*xc)*r
  y=(mix*y + (1-mix)*yc)*r
  y = y - r // start at 0,0
  
  x = x * xscale
  
  // rotate
  xnew = x * cos(theta) - y * sin(theta)
  ynew = x * sin(theta) + y * cos(theta)

  x = xnew
  y = ynew
  return [x, y]
}


function spiro_true(t, R, r, d, speed, theta) {
  x = (R - r) * cos(t * r / R * speed) + d * cos(t * (1 - r / R) * speed)
  y = (R - r) * sin(t * r / R * speed) - d * sin(t * (1 - r / R) * speed)
  x = x - R - r + d // start at 0,0
  // rotate
  xnew = x * cos(theta) - y * sin(theta)
  ynew = x * sin(theta) + y * cos(theta)
  x = xnew
  y = ynew
  return [x, y]
}


function rotatePlane(coords, i, rotationSpeed) {
  x = coords[0]
  y = coords[1]
  xnew = x * cos(i * rotationSpeed) - y * sin(i * rotationSpeed)
  ynew = x * sin(i * rotationSpeed) + y * cos(i * rotationSpeed)
  return [xnew, ynew]
}


function shiftPlane(coords, i, rotationSpeed, xshift, yshift) {
  x = coords[0]
  y = coords[1]
  xnew = x + xshift * i * rotationSpeed
  ynew = y + yshift * i * rotationSpeed
  return [xnew, ynew]
}

function doTheDrawing(x0, y0, arm1fun, arm2fun, planexform, nrot, samplesPerRot, color1, color2) {

  if (!color2) {
    color2 = color1
  }

  y = y0
  x = x0
  xscale1 = 1.3
  xscale2 = 1.3

  rotationSpeed = 2 * PI / samplesPerRot

  for (let i = 0; i < nrot * samplesPerRot; i++) {
    yold = y
    xold = x

    arm1 = arm1fun(i, rotationSpeed)
    arm2 = arm2fun(i, rotationSpeed)

    x = x0 + arm1[0] + arm2[0]
    y = y0 + arm1[1] + arm2[1]

    coords = planexform([x, y], i, rotationSpeed)
    x = coords[0]
    y = coords[1]

    strokeWeight(1.5 + randomGaussian(0, 0.3))
    stroke(lerpColor(color1, color2, int(i / (nrot * samplesPerRot))))
    line(xold, yold, x, y)
  }
}

function setup() {
  // Create the canvas
  W = 2000
  H = 2000
  createCanvas(W, H);

  // Set colors 1
  background("#211");
  stroke(180, 160, 120, 70);

  // colors 2
  background("#f3f2f0");

  // origin at center
  translate(W / 2, H / 2);
  noFill();

  /*
  doTheDrawing(x0=500, y0=500, 
               arm1fun = (i, rotationSpeed) => spiro(i, 115, 110, rotationSpeed*300, rotationSpeed*304, 0, 1.3),
               arm2fun = (i, rotationSpeed) => spiro(i, 50, 51, rotationSpeed*2, rotationSpeed*2, 35/2/PI, 1.3),
               planexform = rotatePlane,
               nrot=1,
               samplesPerRot=300000,
               color(80, 150, 200, 100))
  */

  
  /*
  doTheDrawing(x0=350, y0=350, 
               arm1fun = (i, rotationSpeed) => spiro(i, 55, 50, rotationSpeed*200, rotationSpeed*201, 0, 2.5),
               arm2fun = (i, rotationSpeed) => spiro(i, 10, 55, rotationSpeed*3, rotationSpeed/2, 55/2/PI, 1.1),
               planexform = rotatePlane,
               nrot=2,
               samplesPerRot=30000,
               color(80, 150, 200, 100))
  */

  
  /*
  // el batato
  doTheDrawing(x0 = 0, y0 = 1000,
    arm1fun = (i, rotationSpeed) => spiro(i, 55, 50, rotationSpeed * 300, rotationSpeed * 303, 0, 1.5),
    arm2fun = (i, rotationSpeed) => spiro(i, 10, 155, rotationSpeed * 6, rotationSpeed / 3, 55 / 2 / PI, 1.1),
    planexform = (coords, i, rotationSpeed) => shiftPlane(coords, i, rotationSpeed, 0, -300),
    nrot = 2,
    samplesPerRot = 30000,
    color(80, 150, 200, 100))
  */
  
  /*
  // 3 musselia
    doTheDrawing(x0 = 100, y0 = 300,
    arm1fun = (i, rotationSpeed) => spiro(i, 50, 51, rotationSpeed * 300, rotationSpeed * 303, 0, 2.5),
    arm2fun = (i, rotationSpeed) => spiro(i, 0, 0, rotationSpeed * 6, rotationSpeed / 3, 55 / 2 / PI, 1.1),
    planexform = rotatePlane,
    nrot = 1,
    samplesPerRot = 30000,
    color(80, 150, 200, 100))
  */
  
  /*
    // 4 nusselia
    doTheDrawing(x0 = 200, y0 = 500,
    arm1fun = (i, rotationSpeed) => spiro(i, 103, 101, rotationSpeed * 300, rotationSpeed * 304, 0, 1.7),
    arm2fun = (i, rotationSpeed) => spiro(i, 0, 0, rotationSpeed * 6, rotationSpeed / 3, 55 / 2 / PI, 1.1),
    planexform = rotatePlane,
    nrot = 1,
    samplesPerRot = 30000,
    color(80, 150, 200, 100))
  */
  
  /*
    // loop
    doTheDrawing(x0 = 500, y0 = 0,
    arm1fun = (i, rotationSpeed) => spiro(i, 51, 51, -rotationSpeed * 400, rotationSpeed * 403, 0, 1.5),
    arm2fun = (i, rotationSpeed) => spiro(i, 55, 55, rotationSpeed * 2,rotationSpeed*3, 40/ 2 / PI, 1.1),
    planexform = rotatePlane,
    nrot = 1,
    samplesPerRot = 30000,
    color(80, 150, 200, 100))
  */
  
  /*
    // loop #2
    doTheDrawing(x0 = 400, y0 = 400,
    arm1fun = (i, rotationSpeed) => spiro(i, 31, 32, -rotationSpeed * 400, rotationSpeed * 405, 0, 2.1),
    arm2fun = (i, rotationSpeed) => spiro(i, 150, 0, rotationSpeed * 7/3, rotationSpeed*2/3, 40/ 2 / PI, 1.1),
    planexform = rotatePlane,
    nrot = 3,
    samplesPerRot = 30000,
    color(80, 150, 200, 100))
  */
  
  /*
  // loop #3
    doTheDrawing(x0 = 400, y0 = 400,
    arm1fun = (i, rotationSpeed) => spiro(i, 31, 32, -rotationSpeed * 400, rotationSpeed * 402, 0, 2.1),
    arm2fun = (i, rotationSpeed) => spiro(i, 300, 0, rotationSpeed * 2/3, rotationSpeed*2/3, 40/ 2 / PI, 1.1),
    planexform = rotatePlane,
    nrot = 3,
    samplesPerRot = 30000,
    color(80, 150, 200, 100))
  */
  
  /*
  // flower #1
    doTheDrawing(x0 = 250, y0 = 0,
    arm1fun = (i, rotationSpeed) => spiro(i, 31, 32, rotationSpeed * 400, -rotationSpeed * 403, 0, 2.1),
    arm2fun = (i, rotationSpeed) => spiro(i, 180, 51, rotationSpeed * 2/3, rotationSpeed*2, 40/ 2 / PI, 1.1),
    planexform = rotatePlane,
    nrot = 3,
    samplesPerRot = 30000,
    color(80, 150, 200, 100))
    */
  /*
  translate(500,0)
  rotate(90)
  stroke(200, 100, 150, 70);
  doTheDrawing(50, 100)
  */
  /*
  translate(250,0)
  rotate(90)
  stroke(200, 150, 50, 70);
  doTheDrawing(50, 100)
  */
  
}
