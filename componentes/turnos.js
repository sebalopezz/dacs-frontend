const Turnos={
    template:`
<h2 id="title-turnos">Turnos al dia: 22/06</h2>
<table class="table" id="table-turnos">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Nombre</th>
        <th scope="col">Horario</th>
        <th scope="col">Atender</th>
        <th scope="col">Ausente</th>

      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Gerardo Enrique</td>
        <td>17:00</td>
        <td> <input type="checkbox"></td>
        <td><button type="button" class="btn btn-outline-danger">Quitar</button></td>
      </tr>
    </tbody>
</table>

      `,
    data(){
      return{
        turnos=Object
      }
    },
    create:function(){

    },
    methods:{
      getTurnos:function(){
        console.log('Se inicializa y busca el tu')
        fetch(URL+'historiasclinicas/'+this.dni)
          .then(response=>this.turnos=response);
      },
      atenderVisita:function(turno){
        
      }
        

    }
}