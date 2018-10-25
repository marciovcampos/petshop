var tbody = document.querySelector('#produtos');
var api = "https://petshop2018.herokuapp.com/";

carregaProdutos();

function carregaProdutos(){

    tbody.innerHTML = '';

    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', api+`Produtos`, true);

    xhr.onload = function(){
        //console.log(this.responseText);      
        var produtos = JSON.parse(this.responseText);
        for(var indice in produtos){
            adicionaProduto(produtos[indice]);
        }      
    }

    xhr.send();            
}

function adicionaProduto(produto){   
    
    var trow = `<div class="col-md-4">
                    <div class="card mb-4 shadow-sm">
                        <a href="product.html?id=${produto.id}"><img class="card-img-top" src="${produto.image}" alt="${produto.name}"></a>
                        <h4 class="text-center">${produto.name}</h4>
                        <div class="card-body">
                            <h3>$ ${produto.price}</h3>
                            <div class="d-flex justify-content-between align-items-center"> 
                            </div>
                            <div class="text-right">
                                <button type="button" class="btn btn-success text-right" onclick="window.location.href='/cart.html?id=${produto.id}'"> 
                                    <i class="fas fa-shopping-cart"></i> ADD TO CART
                                </button> 
                            </div>
                        </div>                        
                    </div>
                </div>`;

    tbody.innerHTML += trow;

}