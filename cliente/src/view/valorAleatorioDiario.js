//ficheiro que gera um valor aleatório por dia entre 0 e 3, e é usado para fazer a inflação até 3% nos preços das vendas
class Aleatorio {

  gerarValorAleatorio() {
    return (Math.random() * 3).toFixed(2);
  }

  // Função para obter o valor aleatório do dia atual
  obterValorDoDia() {
    var dataAtual = new Date();
    var dia = dataAtual.getDate();
    var mes = dataAtual.getMonth() + 1; // Os meses em JavaScript são baseados em zero (janeiro = 0)
    var ano = dataAtual.getFullYear();
    var chave = dia + '-' + mes + '-' + ano;

    var valorDoDia = localStorage.getItem(chave);

    if (valorDoDia === null) {
      valorDoDia = this.gerarValorAleatorio();
      localStorage.setItem(chave, valorDoDia);
    }
    return valorDoDia;
  }
}
export default new Aleatorio();