import { createNavigator } from "./scripts/navigator.js";
import { generateFetchComponent } from "./scripts/generateFetchComponent.js";
import { createMap } from "./scripts/createMap.js";

//Binding
const navigator = createNavigator(document.querySelector("#pages"));
const fetchCache = generateFetchComponent();
const mapElement = document.querySelector("#map");
const map = createMap(mapElement);

+
fetchCache.build("/config.json", "cache").then(() => {
    fetchCache.setData("ArrayDict").then(() => {
        fetchCache.getPostData("Madrid, Spain").then((r) => {
            console.log(r);
        });
    })
}).catch(console.error);

map.build();