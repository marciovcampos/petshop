import { carregaProduto } from './services/product.service.js';

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

carregaProduto($.urlParam('id'), 'product');

