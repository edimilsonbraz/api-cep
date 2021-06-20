
const limparFormulario = (endereco) => {
  document.getElementById('endereco').value = '';
  document.getElementById('bairro').value = '';
  document.getElementById('cidade').value = '';
  document.getElementById('estado').value = '';
}

const preencherFormulario = (endereco) => {
  document.getElementById('endereco').value = endereco.logradouro;
  document.getElementById('bairro').value = endereco.bairro;
  document.getElementById('cidade').value = endereco.localidade;
  document.getElementById('estado').value = endereco.uf;
}

const eNumero = (numero) => /^[0-9]+$/.test(numero); // verifica se é numero
const cepValido = (cep) => cep.length == 8 && eNumero(cep); // verifica se tem 8 digitos

const pesquisarCep = async() => {
  limparFormulario();

  const cep = document.getElementById('cep').value;
  const url = `http://viacep.com.br/ws/${cep}/json/`;
  //fetch(url).then((response) => response.json).then(console.log);
  if(cepValido(cep)) {
    const dados = await fetch(url);
    const endereco = await dados.json();
    if(endereco.hasOwnProperty('erro')) {
      document.getElementById('endereco').value = 'CEP Não Encontrado!'
    } else {
      preencherFormulario(endereco)
    }

  }else {
    document.getElementById('endereco').value = 'CEP Incorreto!'

  }
}


document.getElementById('cep').addEventListener('focusout', pesquisarCep);