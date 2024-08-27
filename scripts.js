// Armazena a ordem original dos itens
let originalOrder = [];

window.onload = function() {
    const giftList = document.getElementById('gift-list');
    originalOrder = Array.from(giftList.children);
};

function openModal(id) {
    const item = document.querySelector(`.card[data-id="${id}"]`);
    const itemName = item.querySelector('h2').innerText;
    const itemPrice = item.querySelector('p').innerText.split(' ')[1];

    document.getElementById('item-name').innerText = itemName;
    document.getElementById('item-price').innerText = itemPrice;

    const preferenceId = getPreferenceId(id);

    console.log('Preference ID:', preferenceId);

    const buttonContainer = document.getElementById('mercado-pago-button-container');
    buttonContainer.innerHTML = '';
    
    const script = document.createElement('script');
    script.src = `https://www.mercadopago.com.br/integrations/v1/web-payment-checkout.js`;
    script.dataset.preferenceId = preferenceId;
    script.dataset.source = 'button';
    script.async = true; // Carregamento assíncrono
    buttonContainer.appendChild(script);

    script.onload = function() {
        const mpButton = buttonContainer.querySelector('button');
        if (mpButton) {
            mpButton.innerText = 'Presentear Agora'; // Renomear o botão
            mpButton.style.backgroundColor = '#0d72c5'; // Cor de fundo
            mpButton.style.color = '#ffffff'; // Cor do texto
            mpButton.style.border = 'none'; // Remover borda
            mpButton.style.alignItems = 'center'
        }
    };

    document.getElementById('modal').style.display = "block";
}

function closeModal() {
    document.getElementById('modal').style.display = "none";
}

function getPreferenceId(id) {
    const preferences = {
        1: '164871067-119ba1c4-81c7-4e1b-9c52-9ef5521ef03b',
        2: '164871067-4caed9c9-1919-4132-ab95-981397a40742',
        3: '164871067-3b990ebc-84d6-4e17-bc08-7f93546b138d',
        4: '164871067-3a8d5f96-66e0-4a82-82a2-ab630ae3134e',
        5: '164871067-b6028b91-da03-4e41-9fb2-fb74f06da4b6',
        6: '164871067-206b1c76-5c80-46c3-a85b-3416add42212',
        7: '164871067-624c9208-c32a-49ed-8b09-3ac095123eb6',
        8: '164871067-7d5dcdf3-7cd8-448e-bd20-3f6eb3f29591',
        9: '164871067-1df9eea6-6a0b-4270-96a0-969051c5b1f3',
        10: '164871067-5bb9aee3-8e9f-4b35-901c-33f780c59157',
        11: '164871067-59a105b2-4263-4cea-99a5-3908fb6e2718',
        12: '164871067-d45a8467-52fa-4c6e-98d2-959efd1344b8',
        13: '164871067-279b8fa6-2eb8-4fd8-9a47-7a35ddf8f3ae',
        14: '164871067-9b2e3651-c332-4ddd-b5ac-675dccad3cc9',
        15: '164871067-a92f536f-dd33-4398-94f4-591dd57ae5d0',
        16: '164871067-d2aec355-ffd5-42e4-86ff-69737a63e7b9',
        17: '164871067-2b52db41-8f34-45a8-b959-9b6c6951e4e4',
        18: '164871067-a5a06f54-f004-4368-a567-fd2751e57492',
        19: '164871067-cc711e7c-a330-4dd4-8a44-f258e8aacf10',
        20: '164871067-c90157c6-f3e5-445b-b361-a2a02b6744bd',
        21: '164871067-6d7aea86-1329-4c2e-ac2b-fc32b6299c22',
        22: '164871067-758e1342-df33-4479-825d-d5188367eb39',
        23: '164871067-be0bc45c-751f-4fac-8880-bf3bb762c051',
        24: '164871067-11b322a3-ac00-4126-affc-eda39c90efb2',
        25: '164871067-52d7e564-afd1-4396-a654-3a28cfb48ed2',
        26: '164871067-8f1bd811-8dfe-426e-aa97-d4aa04403164',
        27: '164871067-4a23a5b6-6461-496b-869a-c4200cb18358',
        28: '164871067-68705fd3-7235-482f-9d09-40a66f13af30',
        29: '164871067-5e9ab9b1-966d-479c-a194-797335555c98',
        30: '164871067-3ccfd1cf-5f09-4f44-bd38-6eb762b432a1',
        31: '164871067-d3b06ea8-58ae-4797-951c-0868bd7d1c44',
        32: '164871067-d7838b2c-cdec-4f73-8c00-4ef434303b61',
        33: '164871067-1efadd9e-0056-492e-a14c-48cad6936283',
        34: '164871067-8e8e73c4-753d-4cfb-b6af-35711d89c103',
        35: '164871067-7a6938be-deeb-4c23-afb4-0d073eb602be',
        36: '164871067-f3ff98c8-4106-4535-8cfd-7e39098e5c26',
        37: '164871067-2405f157-16fd-4c7d-8c9d-523d3f84d40e',
        38: '164871067-6785ad12-e5e9-40e1-8671-2d65f744e49d'
    };
    return preferences[id];
}

function filterByPrice() {
    const order = document.getElementById('price-filter').value;
    const giftList = document.getElementById('gift-list');
    
    if (order === 'default') {
        // Restore original order
        while (giftList.firstChild) {
            giftList.removeChild(giftList.firstChild);
        }
        originalOrder.forEach(item => giftList.appendChild(item));
        return;
    }

    const cards = Array.from(giftList.querySelectorAll('.card'));

    cards.sort((a, b) => {
        const priceA = parseInt(a.dataset.price);
        const priceB = parseInt(b.dataset.price);

        return order === 'asc' ? priceA - priceB : priceB - priceA;
    });

    giftList.innerHTML = '';
    cards.forEach(card => giftList.appendChild(card));
}
