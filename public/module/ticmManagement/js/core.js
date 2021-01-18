/**
 * ticmManagement - init.js
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

// Cache
const cache_ticmManagement = "ticmManagement";

// Paths
const path_ticmManagement = "/api/ticmManagement";

async function init_ticmManagement(){
    removeCache("ticmManagement");
    await ticmManagement_getEntities();
    await ticmManagement_getModules();
    await ticmManagement_getUsers();

}
