
const Historia = { template: `
<div class="m-5">
    <div class="loader" v-if="loading">Loading</div>
    <div v-if="!loading">
        <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><router-link to="/"> Ingresar </router-link></li>
                <li class="breadcrumb-item"> <a href="#" @click="$router.go(-1)"> Lista de pacientes </a></li>
                <li class="breadcrumb-item active" aria-current="page"> Historia clinica </li>
            </ol>
        </nav>
        <router-link :to="{ name: 'registrarvisita.id', params: { idhist: historia.id }}" class="btn btn-success"> Registrar visita</router-link> 
        <h4 class="text-center"> Historia clinica de {{paciente.nombre}}</h4>
        <table class="table table-sm ficha">
            <!-- Datos API PACIENTES -->
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
                <td class="w-25"> ID Historia</td>
                <td><input type="text" v-model="historia.id" class="input-editable border"></td>
            </tr>
            <tr>
                <td>ID Paciente</td>
                <td><input type="text" v-model="historia.pacienteId" class="input-editable border"></td>
            </tr>
            <tr>
                <td>Fecha de inicio</td>
                <td><input type="text" v-model="historia.fechaInicio" class="input-editable border"></td>
            </tr>
            <tr>
                <td>Grupo Sanguineo</td>
                <td><input type="text" v-model="historia.grupoSanguineo" class="input-editable border"></td>
            </tr>
            <tr>
                <td>Observaciones</td>
                <td><input type="text" v-model="historia.observaciones" class="input-editable border"></td>
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
                    <td>{{visita.idmedico}}</td>
                </tr>
            </tbody>
        </table>    
        <h4> Medicamentos </h4>
    </div>
</div>
`,
data(){
    return{
        idhistoria: this.$route.params.id,
        historia: Object,
        loading: true,
        paciente: Object
    }
},
created: function () {
    this.getHistoria();
},
methods: {
    getHistoria: function () {
    console.log('Se cargo la historia');

    fetch(URL+'historiaclinica/'+this.idhistoria)
        .then(response => response.json())
        .then(json => {
            this.historia = json
            this.loading = false
            this.getPaciente()
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