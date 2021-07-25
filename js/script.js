var campoCep = document.querySelector('#app form input')
var botaoConsultar = document.querySelector('#app form button')
var conteudo = document.querySelector ('#app main')

function criarLinha (entrada) {
	var linha = document.createElement('p')
	var texto = document.createTextNode(entrada)

	linha.appendChild(texto)
	conteudo.appendChild(linha)
}

function procurar(event) {
	event.preventDefault()

	var valor = campoCep.value

	valor = valor.replace(' ', '')
	valor = valor.replace('-', '')
	valor = valor.replace('.', '')
	valor = valor.trim()
	
	axios.get('http://viacep.com.br/ws/' + valor + '/json/')
	.then (function(response){

		if(response.data.erro) {
			throw new Error ('Cep inválido')
		}

		conteudo.innerHTML = ''
		criarLinha(response.data.logradouro)
		criarLinha(response.data.localidade)
		criarLinha(response.data.uf)
	})
	.catch (function(error){
		conteudo.innerHTML = ''
		criarLinha('Algo deu errado')
	})
}

botaoConsultar.addEventListener ('click', procurar)