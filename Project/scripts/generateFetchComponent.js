import {parseConfiguration} from "./jsonParser.js"


export function generateFetchComponent() {
    let config;
    let configKey;
    return {
        build: (pathConfig, keyConfig) => {
            return new Promise(function (resolve, reject) {
                parseConfiguration(pathConfig).then((c) => {
                    config = c;
                    configKey = keyConfig;
                    resolve("ok");
                }).catch(reject);
            })
        },

        setData: (data) => {
            return new Promise((resolve, reject) => {
                if(config[configKey].set == undefined || config[configKey].token == undefined || config[configKey].key== undefined){
                    return reject("config errato") ;
                }
                fetch(config[configKey].set, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            "key": config[configKey].token
                        },
                        body: JSON.stringify({
                            key: config[configKey].key,
                            value: JSON.stringify(data)
                        })
                    })
                    .then(r => r.json())
                    .then(data => resolve(data.result))
                    .catch(err => reject(err.result));
            });
        },

        /*Metodo da utilizzare per la Cache remota, prendere le cose salvate i cache*/ 
        getPostData: () => {
            return new Promise((resolve, reject) => {
                if(config[configKey].get == undefined || config[configKey].token == undefined || config[configKey].key == undefined){
                    return reject("config errato") ;
                }
                fetch(config[configKey].get, {
                        method: "POST",
                        headers: {
                            "content-type": "application/json",
                            "key": config[configKey].token
                        },
                        body: JSON.stringify({
                            key: config[configKey].key
                        })
                    })
                    .then(r => r.json())
                    .then(data => resolve(data.result))
                    .catch(err => reject(err.result));
            })
        },

        login: (username, password) => {
            return new Promise((resolve, reject) => {
                if(config[configKey].login == undefined || config[configKey].token == undefined){
                    return reject("config errato") ;
                }
                fetch(config[configKey].login, { 
                  method: "POST",
                  headers: {
                     "content-type": "application/json",
                     "key": config[configKey].token
                  },
                  body: JSON.stringify({
                     username: username,
                     password: password
                  })
                })
                .then(r => r.json())
                .then(data => {
                    if(data.result === true) {
                        Cookies.set('isLogged', 'true', { expires: 365 })
                        resolve(data.result)
                    }
                    else reject(data.result);
                })
                .catch(reject);
              })
            
        },

        register: (username, password) => {
            return new Promise((resolve, reject) => {
                if(config[configKey].register == undefined || config[configKey].token == undefined){
                    return reject("config errato") ;
                }
                fetch(config[configKey].register, { 
                  method: "POST",
                  headers: {
                     "content-type": "application/json",
                     "key": config[configKey].token
                  },
                  body: JSON.stringify({
                     username: username,
                     password: password
                  })
                })
                .then(r => r.json())
                .then(data => resolve(data))
                .catch(reject);
              })
        }
    };
}