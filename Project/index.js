import { createPubSub } from "./scripts/createPubSub.js"; 
import { createNavigator } from "./scripts/navigator.js";
import { generateFetchComponent } from "./scripts/generateFetchComponent.js";
import { createMap } from "./scripts/createMap.js";
import { createForm } from "./scripts/createForm.js";
import { createTable } from "./scripts/createTable.js";

//Binding
const pubSub = createPubSub();
const fetchCache = generateFetchComponent();
const navigator = createNavigator(document.querySelector("#pages"));
const mapElement = document.querySelector("#map");
const tableElement = document.getElementById("tab"); // Div dove verrà inserita la tabella
const tableComponent = createTable(tableElement, pubSub); 

const map = createMap(mapElement, pubSub); 
map.build();

// Aggiungi l'emissione dell'evento mapRendered dopo il rendering della mappa
map.render().then(() => {
  pubSub.publish("mapRendered", "La mappa è stata renderizzata!");
});

const formElement = document.querySelector("#form"); // prendi il div form
const form = createForm(formElement, pubSub); 

let dati = [
  "titolo",
  "descrizione",
  "anni",
  "longitudine",
  "latitudine",
  "contendenti",
  "morti",
  "vincitore",
  "foto",
]; //dati da inserire nella form

form.setLabels(dati); // inseriscili nella form
let fin = {}; // dizionario dove troveremo i valori della form dopo aver premuto submit ATTENZIONE! Ricordarsi di pulirlo dopo aver caricato i valori nella cache
let finlogin = {}; // dizionario dove troveremo i valori della login dopo aver premuto submit ATTENZIONE! Ricordarsi di pulirlo dopo controllo dell'accesso

//FUNZIONA
function dizzForm(res) {

  return new Promise((resolve, reject) => {
    return fetchCache
      .build("/config.json", "cache")
      .then(() => {
        return fetchCache
          .getPostData()
          .then((r) => {
            r = JSON.parse(r);
            console.log(r);
            if (!r[res[0]]) {
              r[res[0]] = {
                titolo: [res[0]],
                descrizione: [res[1]],
                anni: [res[2]],
                longitudine: [res[3]],
                latitudine: [res[4]],
                contendenti: [res[5]],
                morti: [res[6]],
                vincitore: [res[7]],
                foto: [res[8]],
              };
              return fetchCache
                .setData(r)
                .then(() => {
                  return map
                    .render()
                    .then(() => {
                      location.href = "#pagina0";
                      resolve();
                    })
                    .catch(reject);
                })
                .catch(reject);
            } else {
              reject("già esistente");
            }
          })
          .catch(reject);
      })
      .catch(reject);
  });
}

form.onsubmit(dizzForm); // carichiamo la funzione all'onsubmit
form.render(); // renderizziamo

const loginElement = document.querySelector("#login"); // prendi il div inerente
const login = createForm(loginElement, pubSub); // Passa pubSub anche qui

let datilogin = ["username", "password"]; // dati login

login.setLabels(datilogin); // inserisci i dati

function dizzLogin(res) {

  return new Promise((resolve, reject) => {
    return fetchCache
      .build("/config.json", "credential")
      .then(() => {
        return fetchCache.login(res[0], res[1]).then((r) => {
          if (r) {
            finlogin = r;
            console.log(finlogin);
            resolve();
            location.href = "#pagina2";
          } else {
            reject("credenziali non validi");
          }
        });
      })
      .catch(reject);
  });
}
login.onsubmit(dizzLogin); // carichiamo la funzione all'onsubmit
login.render(); // renderizziamo

// Funzione di callback per la ricerca nella tabella
function callback(valore) {
  const fetchComponent = generateFetchComponent();
  let reSearch = [];

  if (valore.trim() === "") {
    return new Promise((resolve, reject) => {
      return fetchComponent.build("/config.json", "cache").then(() => {
        return fetchComponent.getPostData().then((stringstaticData) => {
          const staticData = JSON.parse(stringstaticData);
          let key = Object.keys(staticData);

          for (let i = 0; i < key.length; i++) {
            reSearch.push(staticData[key[i]]);
          }

          tableComponent.render(reSearch);
          resolve();
        });
      }).catch(reject);
    });
  } else {
    valore = valore.toLowerCase();
    return new Promise((resolve, reject) => {
      return fetchComponent.build("/config.json", "cache").then(() => {
        return fetchComponent.getPostData().then((stringstaticData) => {
          const staticData = JSON.parse(stringstaticData);
          let key = Object.keys(staticData);

          for (let i = 0; i < key.length; i++) {
            let littletitle = staticData[key[i]]["titolo"][0].toLowerCase();
            if (littletitle.includes(valore)) {
              reSearch.push(staticData[key[i]]);
            }
          }

          tableComponent.render(reSearch);
          resolve();
        }).catch(reject);
      });
    });
  }
}

//Carica i dati iniziali all'interno della Cache
const fetchComponent = generateFetchComponent();
fetchComponent.build("/config.json", "cache")
  .then(() => {
    return fetchComponent.getPostData().then((stringstaticData) => {
      const staticData = JSON.parse(stringstaticData);
      let reSearch = [];
      let key = Object.keys(staticData);

      for (let i = 0; i < key.length; i++) {
        reSearch.push(staticData[key[i]]);
      }

      tableComponent.render(reSearch); 
    });
  });


tableComponent.onsubmit(callback);

pubSub.subscribe("formSubmitted", () => {
  console.log("Form inviato!");
});

pubSub.subscribe("tableRendered", () => {
  console.log("Tabella renderizzata!");
});