const grid = document.querySelector(".grid");

const heightSquares = 30;
const fragment = document.createDocumentFragment();

for (let x = 0; x < heightSquares; x += 1) {
  for (let i = 0; i < heightSquares; i += 1) {
    const estilo = `
                  aspect-ratio: 1 / 1;
                  border: black solid 1px;
                  height:${100 / heightSquares}%`;
    const littlePixel = document.createElement("div");
    littlePixel.setAttribute("class", "pixel");
    littlePixel.setAttribute("style", estilo);
    fragment.appendChild(littlePixel);
  }
}

grid.appendChild(fragment);

const pixeles = document.querySelectorAll(".pixel");

function paintBlack() {
  this.setAttribute("class", "pintado");
}

function paintRandom() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  const style = `background-color: rgb(${red}, ${green}, ${blue});
                 aspect-ratio: 1 / 1;
                border: black solid 1px;
                height:${100 / heightSquares}%`;
  this.style.cssText = style;
}

function substractColor(color) {
  if (color === 0) {
    return 255;
  }
  if (color - 12 > 0) {
    return color - 12;
  }
  if (color - 12 < 0) {
    return 1;
  }
}

function shadeOfGrays() {
  const estilo = `background-color: rgb(${120}, ${120}, ${120});
                  aspect-ratio: 1 / 1;
                  border: black solid 1px;
                  height:${100 / heightSquares}%`;
  const estiloDelElemento = getComputedStyle(this);
  const backColor = estiloDelElemento.backgroundColor;
  const completeBackColor = backColor.match(/[^()]+\d/g);
  const RGBlist = completeBackColor[0].split(", ");

  const newStyle = `background-color: rgb(${substractColor(
    +RGBlist[0]
  )}, ${substractColor(+RGBlist[1])}, ${substractColor(+RGBlist[2])});
                  aspect-ratio: 1 / 1;
                  border: black solid 1px;
                  height:${100 / heightSquares}%`;
  this.setAttribute("style", newStyle);
}

function removelisteners() {
  pixeles.forEach((e) => e.removeEventListener("mouseover", paintRandom));
  pixeles.forEach((e) => e.removeEventListener("mouseover", paintBlack));
  pixeles.forEach((e) => e.removeEventListener("mouseover", shadeOfGrays));
}

function activateRandom() {
  pixeles.forEach((e) => e.addEventListener("mouseover", paintRandom));
}

function activateBlack() {
  pixeles.forEach((e) => e.addEventListener("mouseover", paintBlack));
}

function activateGrey() {
  pixeles.forEach((e) => e.addEventListener("mouseover", shadeOfGrays));
}

const buttons = document.querySelectorAll(".button");

buttons.forEach((element) => {
  element.addEventListener("click", (e) => {
    if (e.target.value === "grey") {
      removelisteners();
      activateGrey();
    } else if (e.target.value === "random") {
      removelisteners();
      activateRandom();
    } else {
      removelisteners();
      activateBlack();
    }
  });
});

/* function reset() {} */
