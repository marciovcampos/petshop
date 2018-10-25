$.urlParam = function(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	return results[1] || 0;
}

var tbody = document.querySelector('#product');
var api = "https://petshop2018.herokuapp.com/";
var id = $.urlParam('id');
carregaProduto(id);

function carregaProduto(id){

    tbody.innerHTML = '';

    var xhr = new XMLHttpRequest();
    
    xhr.open('GET', api+`Produtos?id=`+id, true);

    xhr.onload = function(){
        //console.log(this.responseText);      
        var produto = JSON.parse(this.responseText);        
        montaHtmlProduto(produto[0]);   
    }

    xhr.send();            
}

function montaHtmlProduto(produto){
    
    var trow = `<br/><br/>
                <div class="row">                    
                    <div class="col-md-4">
                        <div class="card mb-4 shadow-sm">
                            <img class="card-img-top" src="${produto.image}" alt="${produto.name}">
                        </div>
                    </div>
                    <div class="col-md-8">                   
                        <h2>${produto.name}</h2>
                        <h3>${produto.price}</h3>
                        <br/><p><b>Description</b></p>
                        <p>${produto.description}</p>
                        <div class="text-right">
                            <button type="button" onclick="window.location.href='/cart.html?id=${produto.id}'" class="btn btn-success text-right"> 
                                <i class="fas fa-shopping-cart"></i> ADD TO CART
                            </button> 
                        </div>
                    </div>
                </div>    
                <br/><br/>`;

    tbody.innerHTML += trow;
}