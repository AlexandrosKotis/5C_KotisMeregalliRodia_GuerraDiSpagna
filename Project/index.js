import { createNavigator } from "./scripts/navigator.js";
import { generateFetchComponent } from "./scripts/generateFetchComponent.js";
import { createTable } from "./scripts/createTable.js"; 
import { createMap } from "./scripts/createMap.js";
import { createForm } from "./scripts/createForm.js";

//Binding
const navigator = createNavigator(document.querySelector("#pages"));
const formElement = document.querySelector("#form");
const mapElement = document.querySelector("#map");
const tableElement = document.querySelector("#table");

const form = createForm(formElement);
const map = createMap(mapElement);
const table = createTable(tableElement);

fetchCache.build("/config.json", "cache").then(() => {
    fetchCache.setData("ciao").then(() => {
        fetchCache.getPostData().then((r) => {
            console.log(r);
        });
    })
}).catch(console.error);