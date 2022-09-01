

$( () => {

    $("#form-patrimonio").submit( (evt) => {
       evt.preventDefault()
       salvar(evt)
    })

    carregarPatrimonios()

})

const API = 'http://localhost:3000/api/'




/**
 * Carregar os patrimonios
 */

         const carregarPatrimonios = () => {

            let tbody = document.getElementById('tb-body')
        
            fetch(`${API}patrimonios`)
            .then( r => r.json())
            .then( r => {
                
                tbody.innerHTML = ""
        
                 r.forEach( p => {
                    tbody.innerHTML += `
                    <tr>
                       <td>${p.id}</td>
                       <td>${p.tipo}</td>
                       <td>${p.modelo}</td>
                       <td>${p.observacao}</td>
                       <td>
                           <button class="btn btn-primary btn-sm" type="button" 
                                   onclick="editar(this);"
                                   data-id="${p.id}"
                                   data-tipo="${p.tipo}"
                                   data-modelo="${p.modelo}"
                                   data-observacao="${p.observacao}">
                                <i class="fa fa-edit fa-fw material-icons button edit">edit</i>
                            </button>
        
                            <button class="btn btn-danger btn-sm" type="button" 
                            onclick="excluir(this);"
                            data-id="${p.id}">
                            <i class="fa fa-edit fa-fw material-icons button delete">delete</i>
                     </button>
                       </td>
                    </tr>`
                 });
            })
        }   



        const excluir = (obj) => {
            const pat = {
                "id": $(obj).attr('data-id')    
            }
        
        
             fetch(`${API}patrimonio/${pat.id}/delete`,{
                 method: 'delete'
             })
             .then( r => r.json())
             .then(r => console.log(r))
             .then( r => {
            
              alert("Deletado com sucesso")

              setTimeout( () =>{
                location.href = "/tela-busca/busca.html"
              }, 2000 )
                
            })
             .catch(err => console.log(err))
        }


const editar = (e) => {
    $("#id").val( $(e).attr('data-id'))
    $("#tipo").val( $(e).attr('data-tipo'))
    $("#modelo").val( $(e).attr('data-modelo'))
    $("#observacao").val( $(e).attr('data-observacao'))

    const box = document.getElementById("box-editar-patrimonio")
    box.style.display = "block"
 }
 




 const salvar = (obj) => {
    
    const pat = {
        "id": obj.target.id.value,
        "tipo": obj.target.tipo.value,
        "modelo": obj.target.modelo.value,
        "observacao": obj.target.observacao.value
    }

    fetch(`${API}patrimonio/${pat.id}/exists`)
    .then( r => r.json()).then(r => { 


    if ( r.Data ){
        fetch(`${API}patrimonio/update`,{
            method: 'PUT',
            headers: {'Content-type':'application/json, charset=UTF-8'},
            body: JSON.stringify(pat)
            
        })
        .then( r => r.json())
        .then( r => {
            
            alert("Editado com sucesso")

            setTimeout( () =>{
              location.href = "/tela-busca/busca.html"
            }, 2000 )
              
          })
        .catch(err => console.log(err))
    } else {
        fetch(`${API}patrimonio/add`,{
            method: 'POST',
            headers: {'Content-type':'application/json, charset=UTF-8'},
            body: JSON.stringify(pat)
        })
        .then( r => r.json())
        .then( r => location.href = "/tela-busca/busca.html")
        .catch(err => console.log(err))
    }
})

}



function searchToggle(obj, evt){
    var container = $(obj).closest('.search-wrapper');
        if(!container.hasClass('active')){
            container.addClass('active');
            evt.preventDefault();
        }
        else if(container.hasClass('active') && $(obj).closest('.input-holder').length == 0){
            container.removeClass('active');
            // clear input
            container.find('.search-input').val('');
        }
}




(function($) { 
    $(function() { 
  
      //  open and close nav 
      $('#navbar-toggle').click(function() {
        $('nav ul').slideToggle();
      });
  
  
      // Hamburger toggle
      $('#navbar-toggle').on('click', function() {
        this.classList.toggle('active');
      });
  
  
      // If a link has a dropdown, add sub menu toggle.
      $('nav ul li a:not(:only-child)').click(function(e) {
        $(this).siblings('.navbar-dropdown').slideToggle("slow");
  
        // Close dropdown when select another dropdown
        $('.navbar-dropdown').not($(this).siblings()).hide("slow");
        e.stopPropagation();
      });
  
  
      // Click outside the dropdown will remove the dropdown class
      $('html').click(function() {
        $('.navbar-dropdown').hide();
      });
    }); 
  })(jQuery); 