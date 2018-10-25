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
    
    var trow = `<table class="table table-striped">
                <thead>
                <tr>
                    <th scope="col"></th>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Total</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <th scope="row"><img style="max-width: 150px; max-height: 150px" class="card-img-top" src="${produto.image}" alt="${produto.name}"></th>
                    <td>${produto.name}</td>
                    <td>$ ${produto.price}</td>
                    <td><input class="form-control"type="number" name="quantity" min="1" style="max-width: 100px;" value="1" onchange="calcTotal(this.value, '${produto.price}')"></td>
                    <td>$ <span id="total">${produto.price}</span></td>
                </tr> 
                </tbody>
            </table>
            
            <div class="text-right">
                <h4>Total: <span id="total2">${produto.price}</span></h4>
                <br/><br/>
                <button type="button" onclick="window.location.href='/cart.html?id=${produto.id}'" class="btn btn-success text-right"> 
                    <i class="fas fa-check-circle"></i> PROCEED TO CHECKOUT
                </button> 
            </div>
              
            <br/><br/>`;

    tbody.innerHTML += trow;
}

function calcTotal(num, price){
    var total = num * price;
    $("#total").html(total);
    $("#total2").html(total);

}