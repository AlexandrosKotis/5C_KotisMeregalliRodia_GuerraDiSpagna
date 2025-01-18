export const createForm = (parentElement) =>{
  let data = [];
  let callback = null;
  return {  
    setLabels: (labels) => { data = labels; },  
    onsubmit: (callbackInput) => { callback = callbackInput},
    render: () => { 
      //console.info("Entro nella render della form");
      parentElement.innerHTML = 
        data.map((name) => {
          //è stato modificato l'imput mettendo prima il label poi l'input
            return `<form class="max-w-md mx-auto">
                      <div class="relative z-0 w-full mb-5 group">
                      <b><label for="` + name + `" class="">` + name + `</label></b>
                      <input type="text" id="` + name + `"class="form-control" placeholder= "inserisci ` + name + `" required />
                          
                      </div>`
              ;
          }).join('\n')
          //è stata aggiunto il secondo bottone e i link per il navigator
          + "<button type='button' class='btn btn-outline-secondary' id='back'>Annulla</button><button type='button' class='btn btn-outline-info' id='submit'>Invia</button>";  
      
          document.getElementById("back").onclick = () => location.href = "#pagina0";
          document.querySelector("#submit").onclick = () => {
        const result = data.map((name) => {
          if(document.querySelector("#" + name).value===""||document.querySelector("#" + name).value===null||document.querySelector("#" + name).value===undefined){
              console.log("MANCANO DATI")//da aggiungere errore mancata compilazione
              return;
          }
          return document.querySelector("#" + name).value;
        });
        data.forEach((element) => {
          document.querySelector("#" + element).value = "";
        });
        callback(result);
      }  
               
    },
  };
};