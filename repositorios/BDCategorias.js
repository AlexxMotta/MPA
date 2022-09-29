var categorias = [
    {'chave':'1','valor':'Eletrodomesticos'},
    {'chave':'2','valor':'Eletronicos'},
    {'chave':'3','valor':'Livros'},
    {'chave':'4','valor':'Vestuario'}]

    function addCategorias(produto){
        categorias.id = categorias_id+=1;
        categorias.push(categorias);
    }
    
    function getCategorias(){
        return categorias;
    }
    
    exports.addCategorias = addCategorias;
    exports.getCategorias = getCategorias;