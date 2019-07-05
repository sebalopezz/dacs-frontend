const Turnos={
    template:`
<div class="m-5">
  <h2 id="title-turnos">Turnos al dia: {{fecha}} </h2>
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
            <button type="button" class="btn btn-outline-success" v-on:click="atenderVisita(turno.id, turno.idPaciente)">
              Atender
            </button>
          </td>
          <td><button type="button" class="btn btn-outline-danger" v-on:click="eliminarTurno(turno.id)">Quitar</button></td>
        </tr>
      </tbody>
  </table>
  <div class="loader" v-if="loading">Loading</div>
  <div v-if='sinTurnos' class="alert alert-success" role="alert">
    No hay turnos pendientes
  </div>
  <div class="row" style="justify-content: center"></div>
</div>`,
    data(){
      return{
        turnos:[],
        atender:'',
        fecha:'',
        sinTurnos:false,
        loading:false,
      }
    },
    created:function(){
      this.fecha= new Date().toLocaleDateString();
      this.getTurnos();
    },
    methods:{
      getTurnos:function(){
        this.loading=true;
        const url="http://turnos-cliente-servidor.herokuapp.com/api/turnos/findbyfecha"    
        var f= new Date();
        fecha=f.getFullYear()+"-"+f.getMonth()+"-"+f.getDate();
        fetch(url,
        {method: "GET",
        headers: {
          "Accept": "application/json",
          "fecha": fecha,
          "identificador": "1"
          }
        })
          .then(response=>{
            response.json()
            .then(turnos=>{
              if (turnos.length>0){
                this.turnos=turnos;
                console.log(this.turnos);
              }else{
                
                this.sinTurnos=true;
                console.log(this.sinTurnos);
              };
              this.loading=false;
              
            });                   
          });          
      },
      atenderVisita:function(idTurno, idPaciente){
        // cambiar el estado del turno en la api, a atendido 
        // const url= ""
        // fetch(url,{
        //   method:"POST",
        //   body:{
        //     "id":idTurno,
        //     "estado":"atendido"
        //   }
        // })
        // .then(response=>{
        //   response.json()
        //   .then(turnos=>{
        //     console.log(turnos)
        //   });                   
        // }); 
        this.$router.push({name: 'medico.paciente.id', params: { id: idPaciente }});
      },
      eliminarTurno:function(idTurno){
        //eliminar o cambiar estado a ausente.
        // const url= ""
        // fetch(url,{
        //   method:"POST",
        //   body:{
        //     "id":idTurno,
        //     "estado":"ausente"
        //   }
        // })
        // .then(response=>{
        //   response.json()
        //   .then(turnos=>{
        //     this.turnos=turnos;
        //     console.log(turnos)
        //   });                   
        // }); 
      }
    },
    filters: {
      filterHora: function (value) {
        if (!value) return ''
        value = value.substring(11,16)
        return value
      }
    }
}