const containerGrid = document.querySelector("body > section > div.container-grid > div");

let fragment = document.createDocumentFragment();

 for(let x = 0;x < 16   ; x++){
    for(let i = 0;i < 16   ; i++){
      let littlePixel = document.createElement("div");
      littlePixel.setAttribute("class","pixel")
      /* littlePixel.textContent="1" */
      fragment.appendChild(littlePixel);
  }

}

containerGrid.appendChild(fragment)
console.log(fragment)