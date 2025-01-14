import { createNavigator } from "./scripts/navigator.js";
import { createForm } from "./scripts/createform.js";
import { createMap } from "./scripts/createMap.js";
import { generateFetchComponent } from "./scripts/generateFetchComponent.js";

const form = createForm(document.querySelector('#app'));
const map = createMap(document.getElementById("map"));
const fetchComp = generateFetchComponent();
const navigator = createNavigator(document.querySelector("#pages"));

form.setLabels(["Place"]);
form.render();

fetchComp.build("../../config.json").then(()=>{
    form.onsubmit((value) => {
        fetchComp.getData(value[0]).then((data)=>{
            map.addPlace(value[0], data).then(i => map.render(i)).catch(i => map.render(i));
        }).catch(console.error);
    });
    document.getElementById("map").innerHTML =
    `<div class="flex-col gap-4 w-full flex items-center justify-center" id="loading">
        <div class="w-28 h-28 border-8 text-blue-400 text-4xl animate-spin border-gray-300 flex items-center justify-center border-t-blue-400 rounded-full">
          <svg viewBox="0 0 24 24" fill="currentColor" height="1em" width="1em" class="animate-ping">
            <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"></path>
          </svg>
        </div>
      </div>`
    ;
    map.build();
}).catch(console.error);