import { generateFetchComponent } from "./generateFetchComponent.js";

export function createMap(parentElement, pubSub) {
    const zoom = 12;
    const maxZoom = 19;
    const places = new Array();
    let map;

    return {
        build: () => {
            return new Promise((resolve, reject) => {
                const fetchCache = generateFetchComponent();
                fetchCache.build("../../config.json", "cache").then(() => {
                    fetchCache.getPostData().then((d) => {
                        let data = JSON.parse(d);
                        if (map) map.remove();
                        map = L.map(parentElement).setView([40.416775, -3.703790], zoom);
                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: maxZoom,
                            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }).addTo(map);
                        for (const key in data) {
                            places.push({ name: ("Nome Evento: " + data[key].titolo + ", Data: " + data[key].anni), coords: [data[key].latitudine, data[key].longitudine] });
                            const marker = L.marker({ lat: data[key].latitudine, lon: data[key].longitudine }).addTo(map);
                            marker.bindPopup("<b>" + ("Nome Evento: " + data[key].titolo + ", Data: " + data[key].anni) + "</b>");
                        }
                        resolve();
                        
                        pubSub.publish("mapBuilt");
                    }).catch(reject);
                }).catch(reject);
            })
        },
        render: (index) => {
            const fetchCache = generateFetchComponent();
            return new Promise((resolve, reject) => {
                return fetchCache.build("../../config.json", "cache").then(() => {
                    return fetchCache.getPostData().then((data) => {
                        data = JSON.parse(data);
                        if (!index) index = 0;
                        if (map) map.remove();
                        map = L.map(parentElement).setView([40.416775, -3.703790], zoom);
                        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                            maxZoom: maxZoom,
                            attribution: '© <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        }).addTo(map);
                        for (const key in data) {
                            places.push({ name: ("Nome Evento: " + data[key].titolo + ", Data: " + data[key].anni), coords: [data[key].latitudine, data[key].longitudine] });
                            const marker = L.marker({ lat: data[key].latitudine, lon: data[key].longitudine }).addTo(map);
                            marker.bindPopup("<b>" + ("Nome Evento: " + data[key].titolo + ", Data: " + data[key].anni) + "</b>");
                        }
                        resolve();
                        pubSub.publish("mapRendered");
                    }).catch(reject);
                }).catch(reject);
            })
        },
        addPlace: (name, coords) => {
            console.log(places);
            return new Promise((resolve, reject) => {
                if (places.some(place => place.name === name)) {
                    return reject(places.length - 1);
                }
                places.push({
                    name: name,
                    coords: coords
                });
                resolve(places.length - 1);
            });
        }
    }
}
