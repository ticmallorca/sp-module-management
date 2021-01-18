/**
 * ticmEntityFeed - entitites
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

$(window).on('load', async function () {

    // Init caches
    await init_ticmManagement();

    // Load entities from cache
    var entities = getCache(cache_ticmManagement).entity;
    ticmManagement_entities_print_getEntities(entities);

    // Change module list
    $(".listbox-module").change(() => {
        ticmManagement_entity_panel_setModules($(".listbox-module").val());
    });

    $(".tab-content input").change(function () {
        var data = {
            "name": $("#inputEntityName").val(),
            "phone": $("#inputEntityPhone").val(),
            "news": $("#inputEntityNews").val(),
            "rss": $("#inputEntityRss").val(),
            "description": $("#inputEntityDescription").val(),
            "status": true,
            "image": ""
        }
        ticmManagement_entity_updateEntity(data);
    });
});

// Multiple selection of Module
$(".listbox-module").bootstrapDualListbox({
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