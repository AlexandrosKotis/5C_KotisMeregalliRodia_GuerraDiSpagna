import { createNavigator } from "./scripts/navigator.js";
import { generateFetchComponent } from "./scripts/generateFetchComponent.js";
import { createTable } from "./scripts/createTable.js"; 
import { createMap } from "./scripts/createMap.js";
import { createForm } from "./scripts/createForm.js";

//Binding
const navigator = createNavigator(document.querySelector("#pages"));

const mapElement = document.querySelector("#map");
const tableElement = document.querySelector("#table");


const map = createMap(mapElement);
const table = createTable(tableElement);

fetchCache.build("/config.json", "cache").then(() => {
    fetchCache.setData("ciao").then(() => {
        fetchCache.getPostData().then((r) => {
            console.log(r);
        });
    })
}).catch(console.error);

const formElement = document.querySelector("#form"); // prendi il div form 
const form = createForm(formElement); // crea l'elemento form
let dati=["titolo","descrizione","anni","longitudine","latitudine","contendenti","morti","vincitore","foto"];//dati da inserire nella form x kotis se riesci a prenderli dal config sarebbe meglio
form.setLabels(dati);// inseriscili nella form
let fin={};//dizionario dove troveremo i valori della form dopo aver premuto submit ATTENZIONE! Ricordarsi di pulirlo dopo aver caricato i valori nella cache 
let finlogin={};//dizionario dove troveremo i valori della login dopo aver premuto submit ATTENZIONE! Ricordarsi di pulirlo dopo cpntrollato l'accesso 
function dizzForm(res){// funzione che popolerà il dizionario finale 
   
    for(let i=0;i<dati.length;i++){
        fin[dati[i]]=res[i]
    }
    fin["anni"]=fin["anni"].split("-");
    fin["coordinate"]=[fin["longitudine"],fin["latitudine"]];
    fin["contendenti"]=fin["contendenti"].split("-");
    fin["foto"]=fin["foto"].split(";");


}
form.onsubmit(dizzForm);// carichiamo la funzione all onclik 
form.render();// renderiziamo

const loginElement = document.querySelector("#login");// prendi il div inerente 
const login = createForm(loginElement);//crea il log in
let datilogin=["username","password"];// dati log in x kotis se riesci a prenderli dal config sarebbe meglio
login.setLabels(datilogin);// inerisci i dati
function dizzLogin(res){// funzione che popolerà il dizionario finale login
    for(let i=0;i<datilogin.length;i++){
        finlogin[datilogin[i]]=res[i];
    }
}
login.onsubmit(dizzLogin);// carichiamo la funzione all onclik 
login.render();//renderiziamo