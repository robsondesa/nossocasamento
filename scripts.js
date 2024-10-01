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
        1: '1981124400-3731b7c1-1699-48f5-b41a-4b5f2c90654b',
        2: '1981124400-dcdc7532-a7e8-4a9b-8f83-bbb6384b1e64',
        3: '1981124400-128d2ef4-00e8-4788-8791-9b9624238b74',
        4: '1981124400-fd3d10dc-df26-4302-9024-84c0bc7cf4c1',
        5: '1981124400-dd2199c0-75f2-46b5-8836-f55aa0a83c50',
        6: '1981124400-b146d101-0927-435e-920e-e93fa6d12d0a',
        7: '1981124400-cbb2cd6a-63a5-4ba3-ac1f-f7da0df879d6',
        8: '1981124400-494efde8-df2e-4abb-8701-9917544e03b1',
        9: '1981124400-b8ab804d-3869-412f-98d9-4a7af4d43295',
        10: '1981124400-a14551ae-93a9-4afe-a086-285355fafefc',
        11: '1981124400-31a9ed17-5d67-403b-be14-95f7bc004c7d',
        12: '1981124400-7a1d7a6d-e8cc-455e-986e-2264877d5cdd',
        13: '1981124400-bba5fce2-2850-4cd4-a4bd-8222f80663f1',
        14: '1981124400-45d95a54-2d62-4386-9b7f-de87b242fb3a',
        15: '1981124400-de6672b2-6cc1-45d9-993e-092697a2b2f9',
        16: '1981124400-b412b4a9-4156-4f88-9710-95c0f963f9d4',
        17: '1981124400-626aca94-8424-4501-b18f-811f4cbbc417',
        18: '1981124400-8330f9e5-f606-41f5-b7f4-a25fd5764d0d',
        19: '1981124400-49e55230-2e4a-457d-8c0a-f7c904db9dcf',
        20: '1981124400-59084235-61de-4897-a38b-e0537a2d6d45',
        21: '1981124400-8fd1d314-9ebb-4c80-af12-6cbe6c6e7cf4',
        22: '1981124400-0c2db8ea-d155-4a4b-8124-7624451b9b4a',
        23: '1981124400-cd24eba3-6a1e-4e4d-88f8-4c59de20fae7',
        24: '1981124400-5ce713af-2562-4990-ba5a-d55ec0a513a6',
        25: '1981124400-8432a745-77ec-4319-956a-98a01170c9bc',
        26: '1981124400-52c2ff04-af4f-4eec-8a10-9e1a0f3dcb68',
        27: '1981124400-2078eba0-49e2-4229-b036-960aff61dcc4',
        28: '1981124400-bb1cde70-dec0-4c9e-8604-9a28f1856d38',
        29: '1981124400-47130f42-71cb-4451-94d6-4e5bd6e22a64',
        30: '1981124400-bf6e80ef-d57d-41d4-9def-7e8847a7e4bf',
        31: '1981124400-7d992fba-05d0-4b9c-a047-6680efffc90f',
        32: '1981124400-074c530a-20b8-4478-92d0-7cbdd90ad6d5',
        33: '1981124400-11ddc773-49cc-4bf0-95fe-064ac24fc2f1',
        34: '1981124400-13069fce-5113-4d30-8c54-dfd47f16eecc',
        35: '1981124400-ba26e34f-7ea1-4235-884e-8a39bdb1a078',
        36: '1981124400-93b0b1de-37de-4685-b0a0-bd1456a19a0f',
        37: '1981124400-830dd1f8-9598-4702-a714-db828fbdd645',
        38: '1981124400-5aea58f6-67b5-4dc9-8b1b-a3803776713c'
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
