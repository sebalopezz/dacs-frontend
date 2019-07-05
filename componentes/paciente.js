
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
        fetch(URL+'historiasclinicas/'+this.dni)
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
                }
            })
        },
        getVisita: function (idvisita) {
            // idvisita = jQuery(this).closest("tr").find("td:eq(0)").text();
            this.$router.push({name: 'visita.id', params: { id: idvisita }})
        }
    }
}