var produtos = [
    {'id':'1',
    'categoria':`${categorias[1].valor}`,
    'nome' : 'Mouse',
    'descrição':'Mouse logitech 10000dpi',
    'valor':'115'},
    {'id':'2',
    'categoria':`${categorias[1].valor}`,
    'nome' : 'Teclado',
    'descrição':'Teclado mecanico redragon',
    'valor':'356,5'},
    {'id':'3',
    'categoria':`${categorias[1].valor}`,
    'nome' : 'Mousepad',
    'descrição':'Mousepad FORTREK 90x40',
    'valor':'30'},
    {'id':'4',
    'categoria':`${categorias[0].valor}`,
    'nome' : 'Geladeira',
    'descrição':'geladeira frost free consul',
    'valor':'3599,90'}]

function addProduto(produto){
    produto.id = produto_id+=1;
    produtos.push(produto);
}

function getProdutos(){
    return produtos;
}

exports.addProduto = addProduto;
exports.getProdutos = getProdutos;