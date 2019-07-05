
const Pacientes = { template: `
<div class="m-5">
    <!-- Utilizo un contador para controlar que muestre recien despues de que realizo todos lo fetch para obtener el nombre de cada paciente -->
    <div class="loader" v-if="contador!==historias.length">Loading</div>
    <div v-if="contador==historias.length">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"> Ingresar </router-link></li>
                <li class="breadcrumb-item active" aria-current="page"> Lista de pacientes </li>
            </ol>
        </nav>
        <h3>Historias clínicas </h3>
        <input type="text" id="myInput" v-on:keyup="filtrar" placeholder="Buscar por nombre...">
        <table id="myTable" class="table table-striped">
            <thead>
                <tr class="header thead-dark">
                    <th>#</th>
                    <th>ID Paciente</th>
                    <th class="w-25">Nombre</th>
                    <th>Fecha inicio</th>
                    <th>Grupo sanguineo</th>
                    <th>Observaciones</th>

            </tr>
        </thead>
        <tbody>
            <tr v-for="historia in historias" v-on:click="getHistoria(historia.id)">
                <td>{{historia.id}}</td>
                <td>{{historia.pacienteId}}</td>
                <td> Aca va el nombre</td>
                <td>{{historia.fechaInicio}}</td>
                <td>{{historia.grupoSanguineo}}</td>
                <td>{{historia.observaciones}}</td>
            </tr>
        </tbody>
    </table>
</div>
`,
data(){
    return{
        dni: this.$route.params.id,
        historia: Object,
        loading:true,
        historias: []
    }
},
created: function () {
    this.getHistorias();
},
methods: {
    getHistorias: function () {
    console.log('Se cargaron las historias');
    fetch(URL + 'historiasclinicas')
        .then(response => response.json())
        .then(json => this.historias = json)
    },
    getHistoria: function (idhistoria) {
        // idvisita = jQuery(this).closest("tr").find("td:eq(0)").text();
        this.$router.push({name: 'medico.paciente.id', params: { id: idhistoria }})
    },
    filtrar: function () {
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
    }
}
}