const Turnos={
    template:`
<div class="m-5">
  <h2 id="title-turnos">Turnos al dia: 22/06</h2>
  <table class="table text-center table-striped" id="table-turnos">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Orden</th>
          <th scope="col">Nombre</th>
          <th scope="col">Horario</th>
          <th scope="col">Atender</th>
          <th scope="col">Ausente</th>

        </tr>
      </thead>
      <tbody>
        <tr v-for="(turno, index) in turnos"> 
          <th scope="row">{{index+1}}</th>
          <td>{{turno.nombre}}</td>
          <td>{{turno.hrInicio|filterHora}}</td>
          <td> 
            <button type="button" class="btn btn-outline-success" v-on:click="atenderVisita(turno.idPaciente)">
              Atender
            </button>
          </td>
          <td><button type="button" class="btn btn-outline-danger">Quitar</button></td>
        </tr>
      </tbody>
  </table>
  <div class="row" style="justify-content: center">
</div>
</div>`,
    data(){
      return{
        turnos:[],
        atender:'', 
      }
    },
    created:function(){
      this.turnos.push({
        id:10,
        idPaciente:1,
        idMedico:10,
        nombre:'Gerardo Enrique',
        hrInicio:'2019-06-20T21:41:43.802+0000',
        fechaTurno:'2019-03-15'
      });
      this.turnos.push({
        id:11,
        idPaciente:2,
        idMedico:10,
        nombre:'Sebastian Lopez',
        hrInicio:'2019-06-20T21:41:43.802+0000',
        fechaTurno:'2019-03-15'
      });
     console.log(this.turnos);
    this.getTurnos();
    },
    methods:{
      getTurnos:function(){
        const url="http://turnos-cliente-servidor.herokuapp.com/api/turnos/findbyfecha"    

        fetch(url,
        {method: "GET",
        headers: {
          "Accept": "application/json",
          "fecha": "2019-03-15",
          "identificador": "1"
          }
        })
          .then(response=>{
            response.json()
            .then(turnos=>{
              this.turnos=turnos;
              console.log(this.turnos)
            });
                   
          })
          ;
          
      },
      atenderVisita:function(idPaciente){
        // cambiar el estado del turno en la api, a atendido
        
        this.$router.push({name: 'medico.paciente.id', params: { id: idPaciente }});
      },
      eliminarTurno:function(idTurno){
        //eliminar o cambiar estado a no atendido.

      }


    },
    // "2019-06-20T21:41:43.802+0000"
    filters: {
      filterHora: function (value) {
        if (!value) return ''
        value = value.substring(11,16)
        return value
      }
    }
}