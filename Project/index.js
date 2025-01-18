import { createNavigator } from "./scripts/navigator.js";
import { generateFetchComponent } from "./scripts/generateFetchComponent.js";
import { createMap } from "./scripts/createMap.js";
import { createForm } from "./scripts/createForm.js";

//Binding
const navigator = createNavigator(document.querySelector("#pages"));
const mapElement = document.querySelector("#map");
const tableElement = document.querySelector("#table");



const map = createMap(mapElement);
map.build();
map.render();

const formElement = document.querySelector("#form"); // prendi il div form 
const form = createForm(formElement); // crea l'elemento form

let dati = ["titolo", "descrizione", "anni", "longitudine", "latitudine", "contendenti", "morti", "vincitore", "foto"];//dati da inserire nella form x kotis se riesci a prenderli dal config sarebbe meglio

form.setLabels(dati);// inseriscili nella form
let fin = {};//dizionario dove troveremo i valori della form dopo aver premuto submit ATTENZIONE! Ricordarsi di pulirlo dopo aver caricato i valori nella cache 
let finlogin = {};//dizionario dove troveremo i valori della login dopo aver premuto submit ATTENZIONE! Ricordarsi di pulirlo dopo cpntrollato l'accesso 

//FUNZIONA 
function dizzForm(res) {// funzione che popolerà il dizionario finale 
    const fetchCache = generateFetchComponent();

    return new Promise((resolve, reject) => {

        return fetchCache.build("/config.json", "cache").then(() => {
            return fetchCache.getPostData().then((r) => {
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
                        foto: [res[8]]
                    };
                    return fetchCache.setData(r).then(()=>{
                        return map.render().then(()=>{
                            location.href ="#pagina0";
                            resolve();
                        }).catch(reject);
                    }).catch(reject);
                } else {
                    reject("già esistente");
                }
            }).catch(reject);
        }).catch(reject);
    });

}

form.onsubmit(dizzForm);// carichiamo la funzione all onclik 
form.render();// renderiziamo

const loginElement = document.querySelector("#login");// prendi il div inerente 
const login = createForm(loginElement);//crea il log in

let datilogin = ["username", "password"];// dati log in x kotis se riesci a prenderli dal config sarebbe meglio

login.setLabels(datilogin);// inerisci i dati

function dizzLogin(res) {// funzione che popolerà il dizionario finale login
    const fetchCache = generateFetchComponent();

    return new Promise ((resolve, reject)=>{

        return fetchCache.build("/config.json", "credential").then(() => {
            return fetchCache.login(res[0],res[1]).then((r) => {
                if(r){
                    finlogin = r;
                    console.log(finlogin);
                    resolve();
                    location.href ="#pagina2"
                }else{
                    reject("credenziali non validi");
                }
            })
        }).catch(reject);
    });
}
login.onsubmit(dizzLogin);// carichiamo la funzione all onclik 
login.render();//renderiziamo
