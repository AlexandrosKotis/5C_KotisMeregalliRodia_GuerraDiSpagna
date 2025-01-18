import { generateFetchComponent } from "./fetchCache.js";

export const createTable = (parentElement) => {
    let fetchComp;
    let searchCallback = null;

    return {
        render: () => {
            return new Promise((resolve, reject) => {
                return fetchComp.getPostData().then((d) => {
                    let data = JSON.parse(d);
                    let listToShow = data;
                    let html = `
                <div class="container shadow p-4 rounded">
    <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4">
        <div></div>
        <label for="table-search" class="visually-hidden">Search</label>
        <div class="position-relative">
            <div class="position-absolute top-50 start-0 translate-middle-y ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search text-secondary" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.42.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                </svg>
            </div>
            <input type="text" id="table-search" class="form-control ps-5" placeholder="Search for items">
            <button id="search-table" type="button" class="btn btn-primary position-absolute top-50 end-0 translate-middle-y">
                Search
            </button>
        </div>
    </div>

    <div id="tab">
        <table class="table table-striped table-hover">
            <thead class="table-light sticky-top">
                <tr>
                    <th scope="col">Indirizzo</th>
                    <th scope="col">Targhe</th>
                    <th scope="col">Morti</th>
                    <th scope="col">Feriti</th>
                    <th scope="col">Data/Ora</th>
                </tr>
            </thead>
            <tbody>
                <!-- Popolato dinamicamente -->
                <script>
                    let html = "";
                    for (const element in listToShow) {
                        html += 
                        <tr>
                            <td>${listToShow[element].address.display_name}</td>
                            <td>${listToShow[element].targhe}</td>
                            <td>${listToShow[element].morti}</td>
                            <td>${listToShow[element].feriti}</td>
                            <td>${new Date(listToShow[element].dataora).toUTCString()}</td>
                        </tr>;
                    }
                    document.write(html);
                </script>
            </tbody>
        </table>
    </div>
</div>
                `;
                    parentElement.innerHTML = html;
                    document.getElementById("search-table").onclick = () => searchCallback(document.getElementById("table-search"));
                    return resolve(html);
                }).catch(reject);
            });
        },
        renderFiltered: (filtered) => {
            return new Promise((resolve, reject) => {
                return fetchComp.getPostData().then((d) => {
                    filtered = filtered === " " ? "Milano" : filtered;
                    let data = JSON.parse(d);
                    let listToShow = data;
                    let html = `
                <div class="container shadow p-4 rounded">
    <div class="d-flex flex-column flex-sm-row align-items-center justify-content-between mb-4">
        <div></div>
        <label for="table-search" class="visually-hidden">Search</label>
        <div class="position-relative">
            <div class="position-absolute top-50 start-0 translate-middle-y ps-3">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-search text-secondary" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.415l-3.85-3.85a1.007 1.007 0 0 0-.115-.098zm-5.42.656a5.5 5.5 0 1 1 0-11 5.5 5.5 0 0 1 0 11z"/>
                </svg>
            </div>
            <input type="text" id="table-search" class="form-control ps-5" placeholder="Search for items">
            <button id="search-table" type="button" class="btn btn-primary position-absolute top-50 end-0 translate-middle-y">
                Search
            </button>
        </div>
    </div>

    <div id="tab">
        <table class="table table-striped table-hover text-center">
            <thead class="table-light sticky-top">
                <tr>
                    <th scope="col">Indirizzo</th>
                    <th scope="col">Targhe</th>
                    <th scope="col">Morti</th>
                    <th scope="col">Feriti</th>
                    <th scope="col">Data/Ora</th>
                </tr>
            </thead>
            <tbody>
                <!-- Contenuto dinamico -->
                <script>
                    let html = "";
                    for (const element in listToShow) {
                        html += 
                        <tr>
                            <td>${listToShow[element].address.display_name}</td>
                            <td>${listToShow[element].targhe}</td>
                            <td>${listToShow[element].morti}</td>
                            <td>${listToShow[element].feriti}</td>
                            <td>${new Date(listToShow[element].dataora).toUTCString()}</td>
                        </tr>;
                    }
                    document.write(html);
                </script>
            </tbody>
        </table>
    </div>
</div>`;
                    for (const element in listToShow) {
                        if (((listToShow[element].address.display_name).toLowerCase()).includes((filtered.toLowerCase()))) {
                            html += `
                                <tr class="table-light border-bottom">
    <th scope="row" class="px-4 py-3 fw-semibold text-dark text-nowrap">
        ${listToShow[element].address.display_name}
    </th>
    <td class="px-4 py-3">
        ${listToShow[element].targhe}
    </td>
    <td class="px-4 py-3">
        ${listToShow[element].morti}
    </td>
    <td class="px-4 py-3">
        ${listToShow[element].feriti}
    </td>
    <td class="px-4 py-3">
        ${new Date(listToShow[element].dataora).toUTCString()}
    </td>
</tr>`;
                        }
                    }
                    html += `
    </tbody>
</table>
</div>
</div>`;
                    parentElement.innerHTML = html;
                    document.getElementById("search-table").onclick = () => searchCallback(document.getElementById("table-search"));
                    return resolve(html);
                }).catch(reject);
            });
        },
        build: () => {
            return new Promise((resolve, reject) => {
                feetchComp = gnerateFetchComponent();
                fetchComp.build("../../config.json", "cache").then(resolve).catch(reject);
            });
        },
        searchCallback: (callback) => {
            searchCallback = callback;
        }
    };
};