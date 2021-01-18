/**
 * ticmEntityFeed - controller
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

function ticmManagement_entity_updateEntity(data) {
	var entityCache = getCache(cache_ticmManagement).entityEdit;
	var apiURL = `${path_ticmManagement}/entity/id/${entityCache.id}`;
	$.ajax({
		type: "PUT",
		url: apiURL,
		data: data
	}).done(function (response) {
		console.log(response.message);
	});

}

function ticmManagement_entity_panel_setModules(moduleList) {

	var entity = getCache(cache_ticmManagement).entityEdit;

	var apiURL = `${path_ticmManagement}/entity/modules`;
	$.ajax({
		type: "POST",
		url: apiURL,
		data: {
			entity: entity.id,
			module: moduleList
		}
	}).done(function (response) {
		if (response.status) {
			setCache(cache_ticmManagement, "entityEdit", response.data[0]);
			// ticmManagement_users_print_editUser();
		} else {
			console.log(response);
		}
	});

}

function ticmManagement_entity_panel_getEntityModules(entityId) {

	var entityCache = undefined;
	for (const key in getCache(cache_ticmManagement).entity) {
		if (getCache(cache_ticmManagement).entity[key].id === entityId) {
			entityCache = getCache(cache_ticmManagement).entity[key];
			break;
		}
	}

	if (entityCache !== undefined) {
		var apiURL = `${path_ticmManagement}/entity/id/${entityId}/modules`;
		$.ajax({
			type: "GET",
			url: apiURL
		}).done(function (response) {
			if (response.status) {

				entityCache.module = response.data;
				setCache(cache_ticmManagement, "entityEdit", entityCache);

				ticmManagement_entity_panel_print_editEntity();
			} else {
				console.log(response);
			}
		});
	}else{
		console.log("Error: ticmManagement_entity_panel_getEntityModules: entityId not found.");
	}

}