
const Paciente = { template: `
    <div class="m-5">
        <div class="loader" v-if="loading">Loading</div>
        <div v-if="!loading">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><router-link to="/"> Ingresar </router-link></li>
                    <li class="breadcrumb-item active" aria-current="page"> Mi historia clinica </li>
                </ol>
            </nav>
            <div v-if="existe">
                <h4 class="text-center"> Historia clinica de {{paciente.nombre}}</h4>
                <table class="table table-sm ficha">
                <!-- Datos API PACIENTES  -->
                    <tr>
                        <td class="w-25"> Nombre y apellido</td>
                        <td>{{paciente.nombre}}</td>
                    </tr>
                    <tr>
                        <td> DNI</td>
                        <td>{{paciente.dni}}</td>
                    </tr>
                    <tr>
                        <td> Sexo </td>
                        <td>{{paciente.sexo}}</td>
                    </tr>
                    <tr>
                        <td> Fecha de nacimiento </td>
                        <td>{{paciente.fechanac}}</td>
                    </tr>
                    <tr>
                        <td> Telefono </td>
                        <td>{{paciente.telefono}}</td>
                    </tr>
                <!-- FIN API PACIENTES -->
                    <tr>
                        <td class="w-25">ID Historia</td>
                        <td>{{historia.id}}</td>
                    </tr>
                    <tr>
                        <td>ID Paciente</td>
                        <td>{{historia.pacienteId}}</td>
                    </tr>
                    <tr>
                        <td>Fecha Inicio</td>
                        <td>{{historia.fechaInicio}}</td>
                    </tr>
                    <tr>
                        <td>Grupo sanguineo</td>
                        <td>{{historia.grupoSanguineo}}</td>
                    </tr>
                    <tr>
                        <td>Observaciones</td>
                        <td>{{historia.observaciones}}</td>
                    </tr>
                </table>
                <h4>Visitas</h4>
                <table class="table table-striped">
                    <thead class="thead-dark">
                        <tr>
                            <th>Id</th>
                            <th>Fecha</th>
                            <th>Sintomas</th>
                            <th>Diagnostico</th>
                            <th>ID Receta</th>
                            <th>ID Medico</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="visita in historia.visitas" v-on:click="getVisita(visita.id)" class="clickable-row">
                            <td>{{visita.id}}</td>
                            <td>{{visita.fecha}}</td>
                            <td>{{visita.sintomas}}</td>
                            <td>{{visita.diagnostico}}</td>
                            <td>{{visita.idreceta}}</td>
                            <td>{{visita.medicoId}}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div v-if="!existe" class="alert alert-danger" role="alert">
                Error. El ID buscado no existe. Intentelo nuevamente.
            </div>
        </div>
    </div>
    `,
    data(){
        return{
            dni: this.$route.params.id,
            historia: Object,
            paciente: Object,
            existe: false,
            loading:true
        }
    },
    created: function () {
        this.getHistoria();
    },
    methods: {
        getHistoria: function () {
        console.log('Se cargo la historia');
        fetch(URL+'historiaclinica/'+this.dni)
            // Paso a texto el response 
            .then(response => response.text())
            .then(text => {
                if (text.length == 0){ 
                    this.existe = false; // Si es 0, no existe devolvio NULL
                    this.loading = false;
                } else {
                    this.historia = JSON.parse(text); // Si no es 0, el response devolvio el objeto
                    this.existe = true;
                    this.loading = false;
                    this.getPaciente();
                }
            })
        },
        getVisita: function (idvisita) {
            // idvisita = jQuery(this).closest("tr").find("td:eq(0)").text();
            this.$router.push({name: 'visita.id', params: { id: idvisita }})
        },
        getPaciente: function () {
            console.log('Se ejecuto getPaciente');
            fetch(API_PACIENTES + this.historia.pacienteId)
                .then(response => response.json())
                .then(json => this.paciente = json)
        }
    }
}