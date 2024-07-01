//Definición de las funciones que se ejecutan al cargar la página.
let table = $('#tablaLibros').DataTable({
    "lengthMenu": [[5, 15, 20, -1], [5, 15, 20, "Todos"]],
    "processing": true,
    "serverSide": true,
    "ajax": {
        "url": "/api/libros/",
        "type": "GET",
        "dataType": "json"
    },
    "columns": [
        { "data": "id" },
        { "data": "titulo" },
        { "data": "genero" },
        { "data": "created_at" },
        { "data": "updated_at" },
        { "data": null,
            "defaultContent": '<button type="button" class="btn btn-warning" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Modificar</button>' + '&nbsp;&nbsp' +
                '<button type="button" class="btn btn-danger" style="--bs-btn-padding-y: .25rem; --bs-btn-padding-x: .5rem; --bs-btn-font-size: .75rem;">Eliminar</button>'
        }
    ],
    "language": {
        url: "//cdn.datatables.net/plug-ins/1.10.19/i18n/Spanish.json"
    }
});


let id = 0;


$('#tablaLibros tbody').on('click', 'button', function () {
    let data = table.row($(this).parents('tr')).data();
    let class_name = $(this).attr('class');
    if (class_name == 'btn btn-warning') {
        // Botón Editar
        $('#title').val(data['titulo']);
        $('#genre').val(data['genero']);
        $('#type').val('edit');
        $('#modal_title').text('MODIFICAR');
        $("#myModal").modal('show');
    } else {
        // Botón Eliminar
        $('#modal_title').text('ELIMINAR');
        $("#confirm").modal('show');
    }


    id = data['id'];
});


$('form').on('submit', function (e) {
    e.preventDefault();
    //let $this = $(this);
    let datos = {
        titulo: $('#title').val(),
        genero: $('#genre').val()
    };
    let type = $('#type').val();
    let method = '';
    let url = '/api/libros/';
    if (type == 'new') {
        // nuevo
        method = 'POST';
    } else {
        // editar
        url = url + id + '/';
        method = 'PUT';
    }


    $.ajax({
        url: url,
        method: method,
        data: datos,
        dataType: 'json'
        })
        .done(function() {
        location.reload();
        })
        .fail(function(datos, textStatus, jqXHR) {
        location.reload();
    });


});


$('#confirm').on('click', '#delete', function (e) {
    $.ajax({
        url: '/api/libros/' + id + '/',
        method: 'DELETE',
        dataType: 'json'
    }).done(function () {
        location.reload();
    }).fail(function (datos, textStatus, jqXHR) {
        alert({datos, textStatus, jqXHR});
        location.reload();
    });
});


$('#cancel').on('click', function (e) {
    location.reload();
});




$('#new').on('click', function (e) {
    $('#title').val('');
    $('#genre').val('');
    $('#type').val('new');
    $('#modal_title').text('NUEVO');
    $("#myModal").modal('show');
});
