const API_URL = 'http://localhost:3000/cryptos';


window.onload = () =>{
    getCryptos();
}

const getCryptos = () => {
    fetch(API_URL, {
        method: 'GET'
    }).then((response) => {
        return response.json();
    }).then((data) => {
        buildCryptos(data);
    })
}

const buildCryptos = (cryptos) => {
    let cryptosContent =" ";
    for(let i = 0; i < cryptos.length; i++) {
        cryptosContent += `
            <tr>
                <td class="align-middle">
                    <h4 class="table-text">${i + 1}</h4>
                </td>
                <td class="align-middle"><a target="_blank"
                        href="https://wazirx.com/invite/sp7pvbt6?utm_source=finstreet&amp;utm_medium=affiliate&amp;utm_campaign=regnow-btn">
                        <h4 class="table-text"><span class="exchange-name ">${cryptos[i].name}</span></h4>
                    </a></td>
                <td class="align-middle">
                    <h4 class="table-text">₹ ${cryptos[i].last}</h4>
                </td>
                <td class="align-middle">
                    <h4 class="table-text"><span>₹ ${cryptos[i].buy} / ₹ ${cryptos[i].sell}</span></h4>
                </td>
                <td class="align-middle">
                    <h4 class="table-text color-green">${cryptos[i].volume} %</h4>
                </td>
                <td class="align-middle">
                    <h4 class="table-text color-green">▲ ₹ ${cryptos[i].base_unit}</h4>
                </td>
            </tr>
        `

        document.querySelector('.t-body').innerHTML = cryptosContent;
    }
}