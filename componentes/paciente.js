
const Paciente = { template: `
    <div class="m-5">
        <router-link to="/" class="btn btn-success"> < Volver a Login</router-link>
        <br><br>
        <div class="loader" v-if="loading">Loading</div>
        <div v-if="existe">
            <table class="table ficha">
                <tr>
                    <td class="w-25">ID Historia</td>
                    <td>{{historia.id}}</td>
                </tr>
                <tr>
                    <td>ID Paciente</td>
                    <td>{{historia.idpaciente}}</td>
                </tr>
                <tr>
                    <td>Fecha Inicio</td>
                    <td>{{historia.fechainicio}}</td>
                </tr>
                <tr>
                    <td>Grupo sanguineo</td>
                    <td>{{historia.gruposanguineo}}</td>
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
                        <td>{{visita.idmedico}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-if="!existe" class="alert alert-danger" role="alert">
            Error. El ID buscado no existe. Intentelo nuevamente.
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
            /*
            .then(response => {
                if (response.ok) {
                    response.json()
                    .then(json => console.log(json))
                }
            })
            .then(response => console.log(response))
*/
        },
        getVisita: function (idvisita) {
            // idvisita = jQuery(this).closest("tr").find("td:eq(0)").text();
            this.$router.push({name: 'visita.id', params: { id: idvisita }})
        }
    }
}