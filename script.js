const statsBody = document.getElementById("stats-body");

// Function to fetch crypto data from CoinGecko API
async function fetchCryptoData() {
  // Fetching data for multiple cryptocurrencies (BTC, ETH, XRP, LTC, ADA, DOT)
  const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,ripple,litecoin,cardano,polkadot';
  try {
    const response = await fetch(url);
    const data = await response.json();
    populateStats(data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Function to populate the table with fetched data
function populateStats(data) {
  statsBody.innerHTML = data
    .map((crypto) => {
      const changeClass = crypto.price_change_percentage_24h > 0 ? 'positive' : 'negative';
      return `
        <tr>
          <td>
            <img src="${crypto.image}" alt="${crypto.name}" />
            ${crypto.name} (${crypto.symbol.toUpperCase()})
          </td>
          <td>$${crypto.current_price.toLocaleString()}</td>
          <td class="${changeClass}">${crypto.price_change_percentage_24h.toFixed(2)}%</td>
        </tr>
      `;
    })
    .join('');
}

// Call the function to fetch data
fetchCryptoData();




