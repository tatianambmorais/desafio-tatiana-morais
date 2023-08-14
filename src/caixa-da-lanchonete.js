class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
		const cardapio = {
			cafe: { descricao: 'Café', valor: 3.00 },
			chantily: { descricao: 'Chantily (extra do Café)', valor: 1.50 },
			suco: { descricao: 'Suco Natural', valor: 6.20 },
			sanduiche: { descricao: 'Sanduíche', valor: 6.50 },
			queijo: { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
			salgado: { descricao: 'Salgado', valor: 7.25 },
			combo1: { descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
			combo2: { descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
		  };
	  
		  const descontoEmDinheiro = 0.05;
		  const acrescimoEmCredito = 0.03;
	  
		  const metodoDePagamentoValidas = ['dinheiro', 'debito', 'credito'];
		  if (!metodoDePagamentoValidas.includes(metodoDePagamento)) {
			return 'Forma de pagamento inválida!';
		  }
	  
		  if (itens.length === 0) {
			return 'Não há itens no carrinho de compra!';
		  }
	  
		  let total = 0;
	  
		  const itensPrincipaisDoCardapio = {};
		  const itensExtrasDoCardapio = {};
	  
		  for (const itemDoCardapio of itens) {
			const [codigo, quantidade] = itemDoCardapio.split(',');
	  
			if (!cardapio[codigo]) {
			  return 'Item inválido!';
			}
	  
			const comItemPrincipal = codigo !== 'chantily' && codigo !== 'queijo';

			
					
			const quantidadeDeItens = parseInt(quantidade);
			if (isNaN(quantidadeDeItens) || quantidadeDeItens <= 0) {
			  return 'Quantidade inválida!';
			}
	  
			if (comItemPrincipal) {
			  itensPrincipaisDoCardapio[codigo] = (itensPrincipaisDoCardapio[codigo] || 0) + parseInt(quantidade);
			} else {
			  itensExtrasDoCardapio[codigo] = (itensExtrasDoCardapio[codigo] || 0) + parseInt(quantidade);
			}
		  }
	  
		  for (const codigo in itensPrincipaisDoCardapio) {
			total += cardapio[codigo].valor * itensPrincipaisDoCardapio[codigo];
		  }
	  
		  for (const codigo in itensExtrasDoCardapio) {
			const itemPrincipal = codigo.replace('chantily', 'cafe').replace('queijo', 'sanduiche');
			if (!itensPrincipaisDoCardapio[itemPrincipal]) {
			  return 'Item extra não pode ser pedido sem o principal';
			}
			total += cardapio[codigo].valor * itensExtrasDoCardapio[codigo];
		  }
	  
		  if (metodoDePagamento === 'dinheiro') {
			total *= (1 - descontoEmDinheiro);
		  } else if (metodoDePagamento === 'credito') {
			total *= (1 + acrescimoEmCredito);
		  }
	  
		  return `R$ ${total.toFixed(2).replace('.', ',')}`;
		}
	  }  
	  export { CaixaDaLanchonete };