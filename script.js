const containerGrid = document.querySelector("body > section > div.container-grid > div");

const heightSquares = 50
let fragment = document.createDocumentFragment();

 for(let x = 0;x < heightSquares   ; x++){
    for(let i = 0;i < heightSquares   ; i++){
      let littlePixel = document.createElement("div");
      littlePixel.setAttribute("class","pixel")
      littlePixel.setAttribute("style",`height:${100/heightSquares}%`)
      /* littlePixel.textContent="1" */
      fragment.appendChild(littlePixel);
  }

}

containerGrid.appendChild(fragment)

const pixeles = document.querySelectorAll("body > section > div.container-grid > div>div")

function pintarEnNegro(div){
  div.style="color-background: black"
}

function pintarRandom(div){

  div.style="color-background: rgb"
}