/**
 * ticmManagement - users
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

$(window).on("load", async function () {







	// Init caches
	await init_ticmManagement();

	// Load users from cache
	var users = getCache(cache_ticmManagement).user;
	ticmManagement_users_print_getUsers(users);

	// Change entity list
	$(".listbox-entity").change(() => {
		ticmManagement_users_panel_setEntities($(".listbox-entity").val());
	});

	// Change entity-module list
	$(".select-entity-module").change(() => {
		ticmManagement_users_panel_getEntityModules($(".select-entity-module").val());
	});
	$(".listbox-module").change(() => {
		ticmManagement_users_panel_setEntityModules($(".listbox-module").val());
	});
});



// Multiple selection of Entity
$(".listbox-entity").bootstrapDualListbox({
	moveOnSelect: true,
	moveSelectedLabel: "Añadir los seleccionados",
	moveAllLabel: "Añadirlos todos",
	removeSelectedLabel: "Quitar los selecionados",
	removeAllLabel: "Quitarlos todos",
	nonSelectedListLabel: "Sin asignar",
	selectedListLabel: "Asignado",
	infoText: "{0} entidades",
	infoTextFiltered: "<span class=\"badge bg-warning-400\">Filtrando</span> {0} de {1}",
	infoTextEmpty: "0 entidades",
	filterPlaceHolder: "Filtro",
	filterTextClear: "Filtrado",
});
// Multiple selection of Module
$(".listbox-module").bootstrapDualListbox({
	showFilterInputs: false,
	moveOnSelect: true,
	moveSelectedLabel: "Añadir los seleccionados",
	moveAllLabel: "Añadirlos todos",
	removeSelectedLabel: "Quitar los selecionados",
	removeAllLabel: "Quitarlos todos",
});


// Select with search
$(".select-entity-module").select2({
	minimumResultsForSearch: Infinity,
	placeholder: 'Elige una entidad'
});

