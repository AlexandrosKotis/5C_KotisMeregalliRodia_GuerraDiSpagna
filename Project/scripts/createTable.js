import { generateFetchComponent } from "./generateFetchComponent.js";

export const createTable = (parentElement, pubSub) => {
  const fetchComp = generateFetchComponent();
  let callback = null;
  return {
    onsubmit: (callbackinput) => {
      callback = callbackinput;
    },
    render: (newList) => {
      if (newList === null || newList === undefined || newList === "") {
        return new Promise((resolve, reject) => {
          fetchComp.getPostData()
          .then((data) => {
              const listToShow = JSON.parse(data);

              let html = `
                        <div class="container">
    <div class="row">
        <b><label for="table-search" class="sr-only">Search</label></b>
        <div class="col d-flex align-items-center">
            <input type="text" id="table-search" class="form-control me-2">
            <button id="search-table" type="button" class="btn btn-light">Search</button>
        </div>                                                                    
    </div>

    
    <div class="mt-4" id="tab">
        <table class="table table-striped">
            <thead class="">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Titolo
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Dettagli
                    </th>
                </tr>
            </thead>
            <tbody>`;

              for (const element in listToShow) {
                html +=
                  `
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
                  listToShow[element].titolo +
                  `</th>
                                        <td class="px-6 py-4">
                                    <button type="button" class="btn btn-info"><a href="#pagina3" class="text-dark">Dettagli</a></button>
                                    </td>
                                    </tr>`;
              }

              html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                        `;

              parentElement.innerHTML = html;

              const searchInput = document.getElementById("table-search");
              const searchButton = document.getElementById("search-table");

              searchButton.onclick = () => {
                const result = searchInput.value;
                callback(result);
                searchInput.value = "";
              };

              pubSub.publish("tableRendered");

              resolve();
            })
            .catch(reject);
        });
      } else {
        const listToShow = newList;

        let html = `
                        <div class="container">
    <div class="row">
        <b><label for="table-search" class="sr-only">Search</label></b>
        <div class="col d-flex align-items-center">
            <input type="text" id="table-search" class="form-control me-2">
            <button id="search-table" type="button" class="btn btn-light">Search</button>
        </div>                                                                    
    </div>

    
    <div class="mt-4">
        <table class="table table-striped">
            <thead class="">
                <tr>
                    <th scope="col" class="px-6 py-3">
                        Titolo
                    </th>
                    <th scope="col" class="px-6 py-3">
                        Dettagli
                    </th>
                </tr>
            </thead>
            <tbody>`;

              for (const element in listToShow) {
                html += `
                                    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">` +
                  listToShow[element].titolo +
                  `</th>
                                        <td class="px-6 py-4">
                                    <button type="button" class="btn btn-info"><a href="#pagina3" class="text-dark">Dettagli</a></button>
                                    </td>
                                    </tr>`;
              }

              html += `
                                </tbody>
                            </table>
                        </div>
                    </div>
                        `;

              parentElement.innerHTML = html;

              const searchInput = document.getElementById("table-search");
              const searchButton = document.getElementById("search-table");

              searchButton.onclick = () => {
                const result = searchInput.value;
                callback(result);
                searchInput.value = "";
              };

              pubSub.publish("tableRendered");

              return new Promise((resolve) => resolve());
      }
    },
    build: (fetchComponent) => {
      fetchComp = fetchComponent;
    },
  };
};
