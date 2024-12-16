
const showAlertNequen = (title, text = '', icon, timer = 5000, action = '') => {
    let timerInterval;
    Swal.fire({
        title,
        text,
        icon,
        customClass: {
            popup: 'rounded-dialog'
        },
        allowEscapeKey: false,
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: false,
        showCancelButton: false,
        timer: timer,
        timerProgressBar: true,
        didOpen: () => {
            const b = Swal.getHtmlContainer().querySelector('b');
            timerInterval = setInterval(() => {
                b.textContent = Swal.getTimerLeft();
            }, 100);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer || result.dismiss === Swal.DismissReason.close) {
            if (action === "recargar") {
                location.reload();
            }
        }
    });
};

const showAlertNequenReturn = (title, html = '', icon, showCancelButton = false, action = '') => {
    return Swal.fire({
        title,
        html, // Cambiado a `html` para permitir etiquetas HTML
        icon,
        customClass: {
            popup: 'rounded-dialog'
        },
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: showCancelButton,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#0275d8',
        focusConfirm: false,
    }).then((result) => {
        if (result.isConfirmed) {
            if (action == "recargar") {
                location.reload();
            }
        }
        return result;
    });
}

const showAlert = (title, text = '', icon, showCancelButton = false, action = '') => {
    Swal.fire({
        title,
        text,
        icon,
        customClass: {
            popup: 'rounded-dialog'
        },
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: showCancelButton,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#0275d8',
        focusConfirm: false,
    }).then((result) => {
        if (result.isConfirmed) {
            if (action == "recargar") {
                location.reload();
            }
        }
    });
};

const showAlertThen = (title, text = '', icon) => {
    return Swal.fire({
        title,
        text,
        icon,
        customClass: {
            popup: 'rounded-dialog'
        },
        // showCloseButton: true,
        allowEscapeKey: false,
        allowOutsideClick: false,
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        confirmButtonColor: '#0275d8',
        cancelButtonText: "Cancelar",
        focusConfirm: false,
    });
};

/**
 * Función global para mostrar un mensaje color rojo
 * @param {string} text 
 */
const toastifyDanger = (text) => {
    Toastify({
        text: `${text}`,
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "center", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        offset: {
            x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 100 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        style: {
            background: "#f5624b",
        },
        onClick: function () { } // Callback after click
    }).showToast();

}
// const showAlert = (title, text = '', icon) => {
//     Swal.fire({
//         title,
//         text,
//         icon,
//         confirmButtonText: 'Aceptar'
//     });
// };

// Configuración de la gráfica de dona
var donutOptions = {
    chart: {
        type: 'donut'
    },
    series: [44, 55, 41, 17],
    labels: ['Primario', 'Secundario', 'Éxito', 'Peligro'],
    colors: ['#0d6efd', '#6c757d', '#198754', '#dc3545']
};
var donutChart = new ApexCharts(document.querySelector("#donut-chart"), donutOptions);
donutChart.render();

// Configuración de la gráfica de barras
var barOptions = {
    chart: {
        type: 'bar'
    },
    series: [{
        name: 'Cantidad',
        data: [30, 40, 45, 50, 49, 60, 70, 91]
    }],
    xaxis: {
        categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago']
    },
    colors: ['#0d6efd']
};
var barChart = new ApexCharts(document.querySelector("#bar-chart"), barOptions);
barChart.render();





const generarTabla = async () => {
    try {

        let regsTable = "";
        let estadoIcono = "";
        const headers = await getToken()
        const response = await fetch(nequenWS + "wsGetUsuarios", myInitGet(headers));
        if (response.status === 200) {

            regsTable += `<tr style="text-transform: uppercase;">
                        <td>1</td>
                        <td>Andrea</td> 
                        <td>5518892025</td>  
                        <td>mc_andrea@icloud.com</td>
                        <td>mc_andrea</td>
                        <td>Admin</td></td>
                        <td>Vlim</td>
                        <td>05/01/24</td>
                        <td></td></tr>
                        `;

            tbTablaUsuarios.innerHTML = regsTable;
            setDataTable();
        }
    } catch (error) {
        console.log("Error al cargar la información", error);
    }
};

const setDataTable = () => {
    // Llamando elemento tabla
    let table = $("#tablaAlta");

    const dataTable = table.DataTable({
        dom: '<"d-flex justify-content-between align-items-center header-actions mx-1 row mt-75"<"col-sm-12 col-lg-4 d-flex justify-content-center justify-content-lg-start"><"col-sm-12 col-lg-8 ps-xl-75 ps-0"><"dt-action-buttons d-flex align-items-center justify-content-center justify-content-lg-end flex-lg-nowrap flex-wrap">>t<"d-flex justify-content-between mx-2 row mb-1"<"col-sm-12 col-md-6"i><"d-flex justify-content-end col-sm-12 col-md-6"p>>',
        language: {
            url: "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json",
        },
        order: [[0, "desc"]],
        drawCallback: function () {
            const api = this.api();
            const recordsTotal = api.page.info().recordsTotal;
            $(".dataTables_length").hide();
            if (recordsTotal > 10) {
                $(".dataTables_paginate").show();
            } else {
                $(".dataTables_paginate").hide(); // Oculta el paginador
            }
        },
        pageLength: 10, // Muestra el paginador después de que hayan 10 registros
        pagingType: "simple",
    });

    // Evento para ejecutar la función de filtrar las columnas de la Tabla después de que la DataTable se haya inicializado completamente
    table.on("init.dt", function () {
        filtrarTabla();
    });

    // Añadiendo el evento de click para el botón de descarga de Excel
    $("#downloadExcel").on("click", function () {
        dataTable.button('.buttons-excel').trigger();
    });

    // Añadir el botón de descarga de Excel manualmente
    new $.fn.dataTable.Buttons(dataTable, {
        buttons: [
            {
                extend: 'excel',
                text: 'Descargar datos en Excel',
                title: 'Usuarios registrados',
                exportOptions: {
                    columns: ":visible:not(:first-child)", // Exporta todas las columnas visibles excepto la primera (Acciones)
                },
            }
        ]
    });

    Swal.close();
};