function l(){var o=document.getElementById("message"),t=JSON.parse(sessionStorage.getItem("cart"))||[],e="",s=0;t.forEach(r=>{s++,e+="Card "+s+`
`,e+="Name: "+r.name+`
`;var a="";r.color.split("").forEach(n=>{switch(n){case"W":a+="White ";break;case"U":a+="Blue ";break;case"B":a+="Black ";break;case"R":a+="Red ";break;case"G":a+="Green ";break;default:a+="Colorless "}}),e+="Color: "+a+`
`,e+="Expansion: "+r.set+`
`,e+="Quantity: "+r.quantity+`

`}),e=e.slice(0,-2),o.value=e}export{l as a};
