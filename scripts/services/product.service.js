import { api } from '../config/server.js';

export const carregaProduto = (id, tipo) => {
    fetch(api + `Produtos?id=` + id)
        .then(response => response.json())
        .then(data => {
            $(document).ready(() => {
                const tbody = document.querySelector('#product');
                tbody.innerHTML = '';
                montaHtmlProduto(data[0], tipo, tbody);
            });
        })
        .catch(e => console.log("Error", e));
}


export const carregaProdutos = () => {
    fetch(api + `Produtos`)
        .then(response => response.json())
        .then(produtos => {
            $(document).ready(() => {
                const tbody = document.querySelector('#produtos');
                tbody.innerHTML = '';
                for (var indice in produtos) {
                    montaHtmlProduto(produtos[indice], 'add', tbody);
                }
            })
        })
        .catch(e => console.log("Error", e));
}



const montaHtmlProduto = (produto, tipo, tbody) => {

    const cart = `<table class="table table-striped">
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
                    <td><input class="form-control"type="number" name="quantity" min="1" style="max-width: 100px;" value="1" onchange="calcTotal(this.value, ${produto.price})"></td>
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

    let product = `<br/><br/>
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

    let add = `<div class="col-md-4">
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

    switch (tipo) {
        case "cart":
            tbody.innerHTML += cart;
            break;
        case "product":
            tbody.innerHTML += product;
            break;
        case "add":
            tbody.innerHTML += add;
            break;
    }
}

const calcTotal = (num, price) => {
    const total = num * price;
    $("#total").html(total);
    $("#total2").html(total);

}