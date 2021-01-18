/**
 * ticmManagement - controller.js
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */


async function ticmManagement_getEntities() {

    await caller("GET", `${path_ticmManagement}/entity/list`, "json", true, "entity");

}

async function ticmManagement_getUsers() {

    await  caller("GET", `${path_ticmManagement}/user/list`, "json", true, "user");
}

async function ticmManagement_getModules() {

    await caller("GET", `${path_ticmManagement}/module/list`, "json", true, "module");

}

async function caller(method, path, dataType, saveOnCache, cacheName) {

    const result = await $.ajax({
        type: method,
        url: path,
        dataType: dataType
    }).done(function (response) {
        if (response.status) {
            if (saveOnCache) {
                setCache(cache_ticmManagement, cacheName, response.data);
            }
        } else {
            console.log(response);
        }
    });
    return;
}