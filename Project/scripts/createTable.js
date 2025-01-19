import { generateFetchComponent } from "./fetch.js";

export const createTable = (parentElement) => {
    let fetchComp;
    let searchCallback = null;
    let callback=null; 
    return {
         onsubmit:(callbackinput)=>{
            callback=callbackinput;
         },
        render: (newList) => {
            if(newList===null || newList===undefined || newList===""){
            return new Promise((resolve, reject) => {
                fetchComp
                    .getPostData()
                    .then((data) => {
                        const listToShow = JSON.parse(data);

                        const html = `
                        <div class="container shadow p-4 rounded">
                            <div class="d-flex justify-content-end mb-3">
                                <input
                                    type="text"
                                    id="table-search"
                                    class="form-control w-50"
                                    placeholder="Cerca un evento"
                                />
                                <button id="search-table" class="btn btn-primary ms-2">Cerca</button>
                            </div>
                            <table class="table table-striped table-hover text-center">
                                <thead class="table-light sticky-top">
                                    <tr>
                                        <th scope="col">Evento</th>
                                        <th scope="col">Dettagli</th>
                                    </tr>
                                </thead>
                                <tbody id="table-body">
                                    ${listToShow
                                        .map(
                                            (item) => `
                                            <tr>
                                                <td>${item.evento}</td>
                                                <td>
                                                    <button class="btn btn-primary">${item.dettagli}</button>
                                                </td>
                                            </tr>`
                                        )
                                        .join("")}
                                </tbody>
                            </table>
                        </div>`;

                        parentElement.innerHTML = html;

                        const searchInput = document.getElementById("table-search");
                        const searchButton = document.getElementById("search-table");

                        searchButton.onclick = () => {

                          //  console.info(this.searchCallback);
                           // if (searchCallback) {
                           const result=searchInput.value;
                            callback(result);
                            searchInput.value="";
                           // }
                        };

                        resolve();
                    })
                    .catch(reject);
            });
        }else{

          const listToShow = newList;

            const html = `
            <div class="container shadow p-4 rounded">
                <div class="d-flex justify-content-end mb-3">
                    <input
                        type="text"
                        id="table-search"
                        class="form-control w-50"
                        placeholder="Cerca un evento"
                    />
                    <button id="search-table" class="btn btn-primary ms-2">Cerca</button>
                </div>
                <table class="table table-striped table-hover text-center">
                    <thead class="table-light sticky-top">
                        <tr>
                            <th scope="col">Evento</th>
                            <th scope="col">Dettagli</th>
                        </tr>
                    </thead>
                    <tbody id="table-body">
                        ${listToShow
                            .map(
                                (item) => `
                                <tr>
                                    <td>${item.evento}</td>
                                    <td>
                                        <button class="btn btn-primary">${item.dettagli}</button>
                                    </td>
                                </tr>`
                            )
                            .join("")}
                    </tbody>
                </table>
            </div>`;
        
            parentElement.innerHTML = html;
        
            const searchInput = document.getElementById("table-search");
            const searchButton = document.getElementById("search-table");
        
            searchButton.onclick = () => {
        
              //  console.info(this.searchCallback);
               // if (searchCallback) {
               const result=searchInput.value;
                callback(result);
                searchInput.value="";
               // }
            };
        }
        },


        build: () => {
            return new Promise((resolve, reject) => {
                fetchComp = generateFetchComponent();
                fetchComp.build().then(resolve).catch(reject);
            });
        },

       
    };
};




   

