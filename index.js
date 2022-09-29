var express = require('express')
const app = express()
const {uuid} = require('uuidv4');
const port = 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//const bdProdutos = require('./repositorios/BDProdutos');
//const bdCategorias = require('./repositorios/BDCategorias');

app.set('view engine', 'ejs');
app.set('views', './views');
var categorias = 
[
    {'chave':'1','valor':'Eletrodomesticos'},
    {'chave':'2','valor':'Eletronicos'},
    {'chave':'3','valor':'Livros'},
    {'chave':'4','valor':'Vestuario'}
]
var produtos = 
[
    {'id':`${uuid()}`,
    'categoria':`${categorias[1].valor}`,
    'nome' : 'Mouse',
    'descrição':'Mouse logitech 10000dpi',
    'valor':'115'},
    {'id':`${uuid()}`,
    'categoria':`${categorias[1].valor}`,
    'nome' : 'Teclado',
    'descrição':'Teclado mecanico redragon',
    'valor':'356,5'},
    {'id':`${uuid()}`,
    'categoria':`${categorias[1].valor}`,
    'nome' : 'Mousepad',
    'descrição':'Mousepad FORTREK 90x40',
    'valor':'30'},
    {'id':`${uuid()}`,
    'categoria':`${categorias[0].valor}`,
    'nome' : 'Geladeira',
    'descrição':'geladeira frost free consul',
    'valor':'3599,90'}
]
function posicao(id){
    for(var x=0;x<produtos.length;x++){
        if(id==produtos[x].id){
            var posit = x;//variavel tipo var, possibilitando a leitura fora desse escopo.
        }
    }
    return posit;
}
function alterarProd(categoria,nome,descrição,valor,position){
    produtos[position].categoria = categoria 
    produtos[position].nome = nome
    produtos[position].descrição = descrição
    produtos[position].valor = valor
}

/*Caso o link acessado seja a rota raiz ele é redirecionado
para o home, assim não existem erros como o get cannot*/
app.get('/', (req, res) => {
    res.redirect('/home');
});
//Tela Inical (home)
app.get('/home', (req, res) => {
    res.render(`home`, {title: `Lab MPA`, message: `Bem vindo ao Lab MPA`, port:port});

});
//Tela para listagem de categorias
app.get('/categorias', (req, res) => {
    res.render(`categorias`, {title: `CATEGORIAS`, message: `LISTAGEM DAS CATEGORIAS`,
     port:port, categorias:categorias, produtos:produtos});

});

//Tela para exibir e cadastrar categorias
app.get('/cadastro-categoria', (req, res) => {//funcionando
    const {chave, valor} = req.query
    //console.log("req.body",req.body);
    const categoria = {'chave':chave,'valor':valor};
    categorias.push(categoria);
    res.render(`categorias`, {title: `CATEGORIAS`, message: `LISTAGEM DAS CATEGORIAS`,
    port:port, categorias:categorias, produtos:produtos});
});

//Exclui uma categoria e recarrega a pagina.
app.get('/categoria-deletar', (req, res) => {
    //console.log(req.query.chave)
    for(let i=0;i<categorias.length;i++){
        if(categorias[i].chave == req.query.chave){
            categorias.splice(i, 1);
        }
    }
    res.redirect('/categorias');
});

//Tela exibir produtos cadastrados
app.get('/produtos', (req, res) => {
    res.render(`produtos`, {title: `PRODUTOS`, message: `CADASTRO DE PRODUTOS`,
    port:port, produtos:produtos, categorias:categorias});

});


//Tela de exibição dos produtos
app.get('/cadastro-produtos', (req, res) => {
    res.render(`cadastroProdutos`, {title: `CADASTRO DE PRODUTOS`, message: `Ensira os dados para efetuar o cadastro`,
    port:port, produtos:produtos, categorias: categorias});

});
//Tela para cadastro de produtos
app.get('/form-produtos', (req, res) => {
    const id = uuid();
    const {categoria, nome, descrição, valor} = req.query
    //console.log("req.body",req.body);
    //id precisa ser gerado automaticamente
    const produto = {'id':id,'categoria':categoria,'nome':nome,'descrição':descrição,'valor':valor};
    produtos.push(produto);
    res.render(`produtos`, {title: `CADASTRO DE PRODUTOS`, message: `Ensira os dados para efetuar o cadastro`,
    port:port, produtos:produtos, categorias: categorias});
});

app.get('/editar-produtos', (req, res) => {
    const {id} = req.query;
    console.log(id);//mostro o id do botao que foi clickado
    //faço a busca no array produtos pelo id
    const position = posicao(id);
    res.render(`produtosEditar`, {title: `EDITAR PRODUTO`, message: `Atualize os dados.`,
    port:port, produtos:produtos, categorias: categorias, position: position});
});

app.post('/form-editar-produtos', (req, res) => {
    //ATUALIZA OS DADOS NO ARRAY DEPOIS REDIRECIONA O USER PARA A PRODUTOS
    const{id,categoria,nome,descrição,valor} = req.body
    const position = posicao(id);
    alterarProd(categoria,nome,descrição,valor,position);
    res.render(`produtos`, {title: `CADASTRO DE PRODUTOS`, message: `Ensira os dados para efetuar o cadastro`,
    port:port, produtos:produtos, categorias: categorias});
});


//Roda o js na porta port com localhost:port/
app.listen(port,()=>{
    console.log(`Codigo executando na porta ${port}`);
})