const slider = document.querySelector(".slider");
const output = document.querySelector(".output");

function updateOutput() {
  output.innerHTML = slider.value;
}

slider.addEventListener("input", updateOutput);

function makeGrid() {
  const containerGrid = document.querySelector(".container-grid");
  containerGrid.removeChild(containerGrid.lastChild);

  const fragment = document.createDocumentFragment();

  for (let x = 0; x < +output.innerHTML; x += 1) {
    for (let i = 0; i < +output.innerHTML; i += 1) {
      const estilo = `background-color: rgb(255, 255, 255);
                  aspect-ratio: 1 / 1;
                  border: black solid 1px;
                  height:${100 / +output.innerHTML}%`;
      const littlePixel = document.createElement("div");
      littlePixel.setAttribute("class", "pixel");
      littlePixel.setAttribute("style", estilo);
      fragment.appendChild(littlePixel);
    }
  }

  const grid = document.createElement("div");
  grid.setAttribute("class", "grid");
  containerGrid.appendChild(grid);
  grid.appendChild(fragment);

  const pixeles = document.querySelectorAll(".pixel");

  let isDrawing = false;

  function setDrawingVariable() {
    if (isDrawing) {
      isDrawing = false;
    } else {
      isDrawing = true;
    }
  }

  containerGrid.addEventListener("click", setDrawingVariable);

  function paintBlack() {
    if (isDrawing === true) {
      const style = `background-color: rgb(0, 0, 0);
                  aspect-ratio: 1 / 1;
                  border: black solid 1px;
                  height:${100 / +output.innerHTML}%`;

      this.style = style;
    }
  }

  function paintRandom() {
    if (isDrawing === true) {
      const red = Math.floor(Math.random() * 255);
      const green = Math.floor(Math.random() * 255);
      const blue = Math.floor(Math.random() * 255);
      const style = `background-color: rgb(${red}, ${green}, ${blue});
                 aspect-ratio: 1 / 1;
                border: black solid 1px;
                height:${100 / +output.innerHTML}%`;
      this.style.cssText = style;
    }
  }

  function substractColor(color) {
    if (color - 12 > 0) {
      return color - 12;
    }
    if (color - 12 < 12) {
      return 1;
    }
    return color;
  }

  function addColor(color) {
    if (color + 12 < 255) {
      return color + 12;
    }
    if (color + 12 > 255) {
      return 255;
    }
    return color;
  }

  function shadeOfGrays() {
    if (isDrawing === true) {
      const estiloDelElemento = getComputedStyle(this);
      const backColor = estiloDelElemento.backgroundColor;
      const completeBackColor = backColor.match(/[^()]+\d/g);
      const RGBlist = completeBackColor[0].split(", ");
      const newStyle = `background-color: rgb(${substractColor(
        +RGBlist[0]
      )}, ${substractColor(+RGBlist[1])}, ${substractColor(+RGBlist[2])});
                  aspect-ratio: 1 / 1;
                  border: black solid 1px;
                  height:${100 / +output.innerHTML}%`;
      this.setAttribute("style", newStyle);
    }
  }

  function lighten() {
    if (isDrawing === true) {
      const estiloDelElemento = getComputedStyle(this);
      const backColor = estiloDelElemento.backgroundColor;
      const completeBackColor = backColor.match(/[^()]+\d/g);
      const RGBlist = completeBackColor[0].split(", ");
      const newStyle = `background-color: rgb(${addColor(
        +RGBlist[0]
      )}, ${addColor(+RGBlist[1])}, ${addColor(+RGBlist[2])});
                  aspect-ratio: 1 / 1;
                  border: black solid 1px;
                  height:${100 / +output.innerHTML}%`;
      this.setAttribute("style", newStyle);
    }
  }

  function erase() {
    if (isDrawing === true) {
      const style = `background-color: rgb(255, 255, 255);
                  aspect-ratio: 1 / 1;
                  border: black solid 1px;
                  height:${100 / +output.innerHTML}%`;

      this.style = style;
    }
  }

  function removelisteners() {
    pixeles.forEach((e) => e.removeEventListener("mouseover", paintRandom));
    pixeles.forEach((e) => e.removeEventListener("mouseover", paintBlack));
    pixeles.forEach((e) => e.removeEventListener("mouseover", shadeOfGrays));
    pixeles.forEach((e) => e.removeEventListener("mouseover", lighten));
    pixeles.forEach((e) => e.removeEventListener("mouseover", erase));
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

  function activateLighten() {
    pixeles.forEach((e) => e.addEventListener("mouseover", lighten));
  }

  function activateEraser() {
    pixeles.forEach((e) => e.addEventListener("mouseover", erase));
  }

  function reset() {
    const style = `background-color: rgb(255, 255, 255);
                 aspect-ratio: 1 / 1;
                border: black solid 1px;
                height:${100 / +output.innerHTML}%`;
    pixeles.forEach((element) => (element.style = style));
  }

  function buttonDesactivated(button) {
    buttons.forEach((ele) =>
      ele.setAttribute("style", "background-color:white")
    );
  }

  buttons.forEach((element) => {
    element.addEventListener("click", (e) => {
      if (e.target.value === "grey") {
        buttonDesactivated();
        e.target.setAttribute("style", "background-color:grey");
        removelisteners();
        activateGrey();
      } else if (e.target.value === "random") {
        buttonDesactivated();
        e.target.setAttribute("style", "background-color:grey");
        removelisteners();
        activateRandom();
      } else if (e.target.value === "black") {
        buttonDesactivated();
        e.target.setAttribute("style", "background-color:grey");
        removelisteners();
        activateBlack();
      } else if (e.target.value === "reset") {
        buttonDesactivated();
        e.target.setAttribute("style", "background-color:grey");
        removelisteners();
        reset();
      } else if (e.target.value === "light") {
        buttonDesactivated();
        e.target.setAttribute("style", "background-color:grey");
        removelisteners();
        activateLighten();
      } else if (e.target.value === "eraser") {
        buttonDesactivated();
        e.target.setAttribute("style", "background-color:grey");
        removelisteners();
        activateEraser();
      }
    });
  });
}
makeGrid();

slider.addEventListener("input", makeGrid);
