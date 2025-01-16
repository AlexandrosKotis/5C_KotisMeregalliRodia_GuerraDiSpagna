import { createNavigator } from "./scripts/navigator.js";
import { generateFetchComponent } from "./scripts/generateFetchComponent.js";

const navigator = createNavigator(document.querySelector("#pages"));
const fetchCache = generateFetchComponent();

fetchCache.build("/config.json", "cache").then(() => {
    fetchCache.setData("ciao").then(() => {
        fetchCache.getPostData().then((r) => {
            console.log(r);
        });
    })
}).catch(console.error);