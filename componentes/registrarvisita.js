
const RegistrarVisita = { template: `
<div class="m-5">
    <div class="loader" v-if="loading">Loading</div>
    <div v-if="!loading">
        <a href="#" @click="guardarVisita" class="btn btn-success"> Guardar visita </a>
        <h4 class="text-center">Registrar visita</h4>
        <a @click="imprimir">Imprimir</a>
        <table class="table table-sm ficha">
            <tr>
                <td>Fecha</td>
                <td>{{visita.fecha}}</td>
            </tr>
            <tr>
                <td>Sintomas</td>
                <td><input type="text" v-model="visita.sintomas" class="input-editable border" placeholder="Ingrese los sintomas..."></td>
            </tr>
            <tr>
                <td>Diagnostico</td>
                <td><input type="text" v-model="visita.diagnostico" class="input-editable border" placeholder="Ingrese el diagnostico..."></td>
            </tr>
            <!-- 
            <tr>
                <td>ID Receta</td>
                <td>{{visita.idreceta}}</td>
            </tr>
            <tr>
                <td>ID Medico</td>
                <td>{{visita.idmedico}}</td>
            </tr>
            <tr>
                <td>ID Partida</td>
                <td>{{visita.idpartida}}</td>
            </tr>
             -->
            <tr>
                <td>ID Historia Clinica</td>
                <td>{{idhistoria}}</td>
            </tr>
        </table>
        <!-- Sección agregar receta -->
        <a class="btn btn-primary" @click="agregarReceta"> Agregar receta </a>
        <div v-if="agregoReceta">
            <h4 class="text-center">Medicamentos del hospital</h4>
            <input type="text" id="myInput" @keyup="filtrar" placeholder="Buscar por nombre de medicamento...">
            <div class="table-wrapper">
                <table id="myTable" class="table table-striped">
                    <thead>
                        <tr class="header thead-dark">
                            <th class="nombre"> Nombre </th>
                            <th class="droga"> Droga </th>
                            <th class="proporcion"> Proporcion </th>
                            <th class="laboratorio"> Laboratorio </th>
                            <th class="presentacion"> Presentacion </th>
                            <th class="stock"> Stock </th>
                            <th class="cantidad"> Cant. </th>
                            <th> Opcion </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="medicamento in medicamentos" class="clickable-row">
                            <td> {{ medicamento.name }} </td>
                            <td> {{ medicamento.drug.name }} </td>
                            <td> {{ medicamento.proportion }} </td>
                            <td> {{ medicamento.laboratory }} </td>
                            <td> {{ medicamento.presentation }} </td>
                            <td> {{ medicamento.stock }} </td>
                            <td> <input type="text" class="input-editable border medicamento-cantidad" required id="cant-medicamento" value="1" placeholder="Ingrese cant."/></td>
                            <td><a class="btn btn-primary" @click="agregarMedicamento" ref="el">++</a></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <h4 class="text-center">Añadir medicamento que NO hay en el hospital</h4>
            <table class="w-100">
                <td> <input type="text" v-model="otroMedicamento.nombre" placeholder="Nombre"></td>
                <td><input type="text" v-model="otroMedicamento.droga" placeholder="Droga"></td>
                <td><input type="text" v-model="otroMedicamento.proporcion" placeholder="Proporcion"></td>
                <td><input type="text" v-model="otroMedicamento.laboratorio" placeholder="Laboratorio"></td>
                <td><input type="text" v-model="otroMedicamento.presentacion" placeholder="Presentacion"></td>
                <td><input type="text" v-model="otroMedicamento.cantidad" placeholder="Cantidad"></td>
                <td><a class="btn btn-primary" @click="agregarOtroMedicamento" ref="el">++</a></td> 
            </table>
            <h4 class="text-center">Receta</h4>
            <table class="table table-striped tabla" id="tbl_agregados">
                    <thead>
                        <tr class="header thead-dark">
                            <th> Nombre </th>
                            <th> Droga </th>
                            <th> Proporcion </th>
                            <th> Laboratorio </th>
                            <th> Presentacion </th>
                            <th> Cantidad</th>
                            <th> Del hospital</th>
                        </tr>
                    </thead>
            </table>
        </div>
    </div>
</div>
`,
data(){
    return{
        idhistoria: this.$route.params.idhist,
        visita: {},
        loading: false,
        receta: [],
        agregoReceta: false,
        medicamentos: [],
        otroMedicamento: {}
    }
},
created: function () {
    this.inicializar();
},
methods: {
    inicializar: function () {
        this.visita.fecha = new Date().toISOString().slice(0, 19).replace('T', ' ');
    },
    imprimir: function(){
        console.log(this.visita)
        console.log(this.medicamentos)
    },
    agregarReceta: function() {
        this.agregoReceta = true
        this.getMedicamentos()
    },
    getMedicamentos: function () {
    console.log('Se cargo medicamentos');

    fetch(API_MED)
        .then(response => response.json())
        .then(json => this.medicamentos = json)
        .then(console.log(this.medicamentos))
    },
    filtrar: function() {
            // Declare variables 
            var input, filter, table, tr, td, i, txtValue;
            input = document.getElementById("myInput");
            filter = input.value.toUpperCase();
            table = document.getElementById("myTable");
            tr = table.getElementsByTagName("tr");

            // Loop through all table rows, and hide those who don't match the search query
            for (i = 0; i < tr.length; i++) {
                td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                } else {
                    tr[i].style.display = "none";
                }
                } 
            }
    },
    agregarMedicamento: function(event) {
            // Obtenemos la referencia al objeto donde se hizo clic
            elto = $(event.target)
            table = document.getElementById("tbl_agregados");
            // Usamos el metodo .closest() para obtener los datos de la fila 
            nombre = elto.closest("tr").find("td:eq(0)").text()
            droga = elto.closest("tr").find("td:eq(1)").text()
            proporcion = elto.closest("tr").find("td:eq(2)").text()
            laboratorio = elto.closest("tr").find("td:eq(3)").text()
            presentacion = elto.closest("tr").find("td:eq(4)").text()
            stock = elto.closest("tr").find("td:eq(5)").text()
            stock = parseFloat(stock)
            cantidad = elto.closest("tr").find("#cant-medicamento").val()
            console.log(nombre, droga, proporcion, laboratorio, presentacion, stock, cantidad)
            var proxFila = (document.getElementById("tbl_agregados").rows.length) ;
            if (cantidad>0){
                if (cantidad <= stock){
                        // document.getElementById("error-stock").style.display = "none";
                        var row = table.insertRow(proxFila);
                        var cell0 = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
                        cell0.innerHTML = nombre
                        cell1.innerHTML = droga
                        cell2.innerHTML = parseFloat(proporcion)
                        cell3.innerHTML = laboratorio
                        cell4.innerHTML = presentacion
                        cell5.innerHTML = parseFloat(cantidad);
                        cell6.innerHTML = `<input type="checkbox" checked disabled>`
                } else{
                    // document.getElementById("error-stock").style.display = "block";
                    console.log("no se pudo agregar")
                }
            }
    },
    guardarVisita: function () {
        console.log("Se guardo la visita")
    },
    agregarOtroMedicamento: function () {
        table = document.getElementById("tbl_agregados");
        var proxFila = (document.getElementById("tbl_agregados").rows.length) ;
        var row = table.insertRow(proxFila);
                        var cell0 = row.insertCell(0);
                        var cell1 = row.insertCell(1);
                        var cell2 = row.insertCell(2);
                        var cell3 = row.insertCell(3);
                        var cell4 = row.insertCell(4);
                        var cell5 = row.insertCell(5);
                        var cell6 = row.insertCell(6);
                        cell0.innerHTML = this.otroMedicamento.nombre
                        cell1.innerHTML = this.otroMedicamento.droga
                        cell2.innerHTML = this.otroMedicamento.proporcion
                        cell3.innerHTML = this.otroMedicamento.laboratorio
                        cell4.innerHTML = this.otroMedicamento.presentacion
                        cell5.innerHTML = this.otroMedicamento.cantidad
                        cell6.innerHTML = `<input type="checkbox" disabled>`
    }
}
}
