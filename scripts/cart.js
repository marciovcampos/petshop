import { carregaProduto } from './services/product.service.js';

$.urlParam = name => {
    const results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}

carregaProduto($.urlParam('id'), 'cart');
