/**
 * ticmEntityFeed - view
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

function ticmManagement_entities_print_getEntities(data) {
    if (data.length >= 1) {
        $(".datatable-basic").DataTable().destroy();
        var fullArray = [];
        var dataArray = [];
        for (var ele in data) {
            var element = data[ele];
            dataArray.push(`<td class="text-center">
                                <div class="list-icons">
                                    <div class="dropdown">
                                        <a href="#" class="list-icons-item" data-toggle="dropdown">
                                            <i class="icon-menu9"></i>
                                        </a>

                                        <div class="dropdown-menu dropdown-menu-right">
                                            <a href="#" class="dropdown-item"  onClick="ticmManagement_entity_panel_getEntityModules(${element.id})"><i class="icon-file-eye"></i> View</a>
                                        </div>
                                    </div>
                                </div>
                            </td>`);

            dataArray.push(element.id);
            dataArray.push(`<img src="/resources/images/entities/${element.image}" height="40" alt="">`);
            dataArray.push(element.name);
            dataArray.push(element.description);

            var status = "Inactiu";
            if (element.status) {
                status = "Actiu";
            }
            dataArray.push(status);
            fullArray.push(dataArray);
            dataArray = [];
        }
        $(".datatable-basic").dataTable({
            autoWidth: false,
            responsive: true,
            stateSave: true,
            columnDefs: [{
                orderable: true
            }],
            dom: '<"datatable-header"fl><"datatable-scroll"t><"datatable-footer"ip>',
            language: {
                search: '<span>Filter:</span> _INPUT_ ',
                lengthMenu: '<span>Show:</span> _MENU_',
                paginate: {
                    'first': 'First',
                    'last': 'Last',
                    'next': '→',
                    'previous': '←'
                }
            },
            data: fullArray
        });
        // $(".datatable-basic").dataTable().fnFilter(filterStatus);
    }
}

async function ticmManagement_entity_panel_print_editEntity() {

    var entityCache = getCache(cache_ticmManagement).entityEdit;
    var modulesCache = getCache(cache_ticmManagement).module;

    $("#modalHeader").removeClass();
    $("#modalButtonSave").removeClass();
    $("#modalHeader").addClass(`modal-header`);
    $("#modalButtonSave").addClass(`btn`);
    $('#modalEditEntity').modal('show');

    $("#modalTitle").html(`${entityCache.name}`);
    $("#inputEntityImage").val(`${entityCache.image}`);
    $("#inputEntityName").val(`${entityCache.name}`);
    $("#inputEntityDescription").val(`${entityCache.description}`);
    $("#inputEntityRss").val(`${entityCache.rss}`);
    $("#inputEntityNews").val(`${entityCache.news}`);
    $("#inputEntityPhone").val(`${entityCache.phone}`);
    $("#inputEntityStatus").val(`${entityCache.status}`);


    $(".listbox-module").empty();
    for (const key in modulesCache) {
        $(".listbox-module").append(`<option value="${modulesCache[key].id}">${modulesCache[key].name}</option>`);
    }
    if (entityCache.module !== undefined) {
        for (const key in entityCache.module) {
            $(`.listbox-module option[value=${entityCache.module[key].id}]`).attr("selected", true);
        }
    }
    $(".listbox-module").bootstrapDualListbox('refresh', true);
}