
const Historia = { template: `
<div class="m-5">
<<<<<<< HEAD
    <h1>Esta es una historia</h1>
    <router-link to="/" class="btn btn-success">Volver a Login</router-link>
    <table class="table ficha">
        <tr>
            <td class="w-25">ID Visita</td>
            <td>{{historia.id}}</td>
        </tr>
        <tr>
            <td>Fecha</td>
            <td>{{historia.pacienteId}}</td>
        </tr>
        <tr>
            <td>Sintomas</td>
            <td>{{historia.fechaInicio}}</td>
        </tr>
        <tr>
            <td>Diagnostico</td>
            <td>{{historia.grupoSanguineo}}</td>
        </tr>
        <tr>
            <td>ID Receta</td>
            <td>{{historia.observaciones}}</td>
        </tr>
    </table>
    <h4>Visitas</h4>
    <table class="table table-striped">
        <thead class="thead-dark">
=======
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
>>>>>>> 223c3f1490007dbf7047ef0b0663a1cc0a426336
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
`,
data(){
    return{
        idhistoria: this.$route.params.id,
        historia: Object
    }
},
created: function () {
    this.getHistoria();
},
methods: {
    getHistoria: function () {
    console.log('Se cargo la historia');

    fetch(URL+'historiasclinicas/'+this.idhistoria)
        .then(response => response.json())
        .then(json => this.historia = json)
    }
}
}