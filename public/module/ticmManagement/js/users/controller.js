/**
 * ticmManagement - controller
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */


function ticmManagement_users_panel_getEntityModules(id) {

	var apiURL = `${path_ticmManagement}/module/entity/${id}`;
	$.ajax({
		type: "GET",
		url: apiURL

	}).done(function (response) {
		if (response.status) {
			setCache(cache_ticmManagement, "module", response.data);
			ticmManagement_users_print_listbox_entityModule_build();
		} else {
			ticmManagement_users_print_listbox_entityModule_empty();
		}
	});
}

function ticmManagement_user_panel_editUser(id) {

	var apiURL = `${path_ticmManagement}/user/id/${id}`;
	$.ajax({
		type: "GET",
		url: apiURL

	}).done(function (response) {
		if (response.status && response.size === 1) {
			setCache(cache_ticmManagement, "userEdit", response.data[0]);
			ticmManagement_users_print_editUser();

		} else {
			console.log(response);
		}
	});

}

function ticmManagement_users_panel_setEntities(entityList) {

	var userId = getCache(cache_ticmManagement).userEdit.id;

	var apiURL = `${path_ticmManagement}/user/entities`;
	$.ajax({
		type: "POST",
		url: apiURL,
		data: {
			user: userId,
			entity: entityList
		}
	}).done(function (response) {
		if (response.status) {
			setCache(cache_ticmManagement, "userEdit", response.data[0]);
			ticmManagement_users_print_editUser();
		} else {
			console.log(response);
		}
	});

}

function ticmManagement_users_panel_setEntityModules(moduleList) {

	const userId = getCache(cache_ticmManagement).userEdit.id;
	const entityId = $(".select-entity-module").val();

	var apiURL = `${path_ticmManagement}/user/modules`;
	$.ajax({
		type: "POST",
		url: apiURL,
		data: {
			user: userId,
			entity: entityId,
			module: moduleList
		}
	}).done(function (response) {
		if (response.status) {
			setCache(cache_ticmManagement, "userEdit", response.data[0]);
		} else {
			console.log(response);
		}
	});

}

function ticmManagement_users_panel_importUsersFromLDAP() {

	var apiURL = `${path_ticmManagement}/user/sync/LDAP`;
	$.ajax({
		type: "GET",
		url: apiURL
	}).done(function (response) {
		if (response.status) {
			ticmManagement_getUsers();
			setTimeout(() => {
				var users = getCache(cache_ticmManagement).user;
				ticmManagement_users_print_getUsers(users);
			}, 500);
		}
	});
}
