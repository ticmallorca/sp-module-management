/**
 * tticmManagement - view
 * Copyright(c) 2019 Alejandro Villén
 * MIT Licensed
 */

function ticmManagement_users_print_getUsers(data) {
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
                                            <a href="#" class="dropdown-item"  onClick="ticmManagement_user_panel_editUser(${element.id})"><i class="icon-pencil"></i> Editar</a>
                                        </div>
                                    </div>
                                </div>
                            </td>`);

            dataArray.push(element.id);
            dataArray.push(element.name);
            dataArray.push(element.surname);
            dataArray.push(element.email);

            // Entities
            var entitiesNames = "";
            for (const key in element.entity) {
                entitiesNames += "· " + element.entity[key].name + "<br />";
            }
            dataArray.push(entitiesNames);

            var status = "Inactiu";
            if (element.status) {
                status = "Actiu";
            }

            dataArray.push(status);

            dataArray.push(new Date(element.created * 1000).toLocaleString());
            dataArray.push(new Date(element.updated * 1000).toLocaleString());
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
            dom: '<"datatable-header"fBl><"datatable-scroll"t><"datatable-footer"ip>',
            buttons: [
                {
                    text: 'Sync LDAP',
                    className: 'btn btn-light',

                    action: function (e, dt, node, config) {
                        ticmManagement_users_panel_importUsersFromLDAP();
                    }

                }
            ],
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
    }
}

function ticmManagement_users_print_editUser() {

    var userCache = getCache(cache_ticmManagement).userEdit;
    var entitiesCache = getCache(cache_ticmManagement).entity;

    $("#modalHeader").removeClass();
    $("#modalButtonSave").removeClass();
    $("#modalHeader").addClass(`modal-header`);
    $("#modalButtonSave").addClass(`btn`);
    $('#modalEditUser').modal('show');

    $("#modalTitle").html(`${userCache.name} ${userCache.surname}`);
    $("#inputUserName").val(`${userCache.name}`);
    $("#inputUserSurname").val(`${userCache.surname}`);
    $("#inputUserMail").val(`${userCache.email}`);
    $("#inputUserCreated").val(new Date(parseInt(`${userCache.created}`) * 1000).toLocaleString());
    $("#inputUserUpdated").val(new Date(parseInt(`${userCache.updated}`) * 1000).toJSON().slice(0, 19));


    // Build relation entity and user list
    // Build relation entity, module and user list

    // Clear entity list
    $(".listbox-entity").empty();
    $(".listbox-module").empty();
    // Clear entity-module list
    $(".select-entity-module").empty();
    $(".select-entity-module").append("<option></option>");


    for (const key in entitiesCache) {
        $(".listbox-entity").append(`<option value="${entitiesCache[key].id}">${entitiesCache[key].name}</option>`);
    }

    if (userCache.entity !== undefined) {
        for (const key in userCache.entity) {
            $(`.listbox-entity option[value=${userCache.entity[key].id}]`).attr("selected", true);
            $(".select-entity-module").append(`<option value="${userCache.entity[key].id}">${userCache.entity[key].name}</option>`);
        }
    }

    $(".listbox-entity").bootstrapDualListbox('refresh', true);
    $(".listbox-module").bootstrapDualListbox('refresh', true);

}


function ticmManagement_users_print_listbox_entityModule_build() {

    // Get available modules and user profile
    var userCache = getCache(cache_ticmManagement).userEdit;
    var moduleCache = getCache(cache_ticmManagement).module;

    // Build module listBox
    $(".listbox-module").empty();
    for (const key in moduleCache) {
        $(".listbox-module").append(`<option value="${moduleCache[key].id}">${moduleCache[key].name}</option>`);
    }

    if (userCache.entity[$(".select-entity-module").val()] !== undefined) {
        const userEntityModule = userCache.entity[$(".select-entity-module").val()];
        if (userEntityModule.module !== undefined){
            for (const key in userEntityModule.module) {
                $(`.listbox-module option[value=${userEntityModule.module[key].id}]`).attr("selected", true);
            }

        }
    }

    $(".listbox-module").bootstrapDualListbox('refresh', true);
}
function ticmManagement_users_print_listbox_entityModule_empty() {

    // Delete items module listBox
    $(".listbox-module").empty();
    $(".listbox-module").bootstrapDualListbox('refresh', true);
}