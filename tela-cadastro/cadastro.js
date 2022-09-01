const resposta = document.getElementById('retorno')

document.getElementById("form--salvar").addEventListener('submit', (evt) => { 
     
    evt.preventDefault()

        let id = document.getElementById('id').value
        let tipo = document.getElementById('tipo').value
        let modelo = document.getElementById('modelo').value
        let observacao = document.getElementById('observacao').value


        fetch('http://127.0.0.1:3000/api/patrimonio/add',
            {
                method: 'POST',
                headers: {"Content-type": "application/json; charset=UTF-8"},
                body: JSON.stringify({ id: id, tipo: tipo, modelo: modelo, observacao: observacao })
            })
            .then(resp => {
                resp.json().then(r => {
                     
                    //  r.forEach(element => {
                        
                    //  });

                    alert("Registro salvo com sucesso")
                    
                    resposta.value = JSON.stringify(r)
                    
                    setTimeout( () => {
                       location.href="/tela-busca/busca.html"

                    }, 2000)

                })
            }).catch(err => {
                console.log("Erro: " + err.message)
            })

}) 

document.addEventListener("DOMContentLoaded", (event) => {

    const result = document.getElementById("retorno")
    const endpoint = document.getElementById("endpoint")
    const btnExecute = document.getElementById("btn--execute")

    btnExecute.addEventListener("click", function (e) {

        let btnText = e.target.innerHTML
        let endPointValue = endpoint.value

        e.target.innerHTML = `<i class="fas fa-spinner fa-spin" aria-hidden="true"></i>`

        let URI = `http://127.0.0.1:3000/api/${endPointValue}`

        result.value = "Processando solicitação..."

        fetch(URI).then((resp) => {

            console.log(resp)

            resp.json().then(r => {

                r.forEach(el => {
                    result.value += JSON.stringify(el)
                })
            })
        })
            .catch(err => {
                console.log(err)
                result.value = err.message
            })
            .finally(() =>
                e.target.innerHTML = `Enviar`
            )

    })

    
   
})
