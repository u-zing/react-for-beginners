import { useEffect, useState } from "react";
import styles from "./App.module.css";
function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [usd, setUsd] = useState(0);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
        // if (json.length > 0) {
        //   setSelectedCoin("json[0]");
        // }
      });
  }, []);

  const handleCoinChange = (event) => {
    const selectedCoinId = event.target.value;
    const coin = coins.find((coin) => coin.id === selectedCoinId);
    setSelectedCoin(coin);
    calculateAmount(usd, coin);
  };

  const handleUsdChange = (event) => {
    const usdValue = parseFloat(event.target.value) || 0;
    setUsd(usdValue);
    calculateAmount(usdValue, selectedCoin);
  };

  const calculateAmount = (usdValue, coin) => {
    if (!coin || !coin.quotes || !coin.quotes.USD || !coin.quotes.USD.price)
      return;

    const coinPrice = coin.quotes.USD.price;
    if (coinPrice <= 0) return;

    const calculatedAmount = usdValue / coinPrice;
    setAmount(calculatedAmount);
  };

  return (
    <div>
      <div className={styles.coin}>🪙</div>
      <h1 className={styles.title}>
        The Coins! {loading ? "" : `(${coins.length})`}
      </h1>
      {loading ? (
        <strong>로딩 중...</strong>
      ) : (
        <div>
          <select
            onChange={handleCoinChange}
            value={selectedCoin?.id || ""}
          >
            <option
              value=""
              disabled
            >
              Select coin!
            </option>
            {coins.map((coin) => (
              <option
                key={coin.id}
                value={coin.id}
              >
                {coin.name} ({coin.symbol}): ${coin.quotes.USD.price.toFixed(6)}{" "}
                USD
              </option>
            ))}
          </select>

          <div>
            <label htmlFor="usd-input">USD: </label>
            <input
              id="usd-input"
              type="number"
              value={usd}
              onChange={handleUsdChange}
              placeholder="USD"
              min="0"
              step="0.01"
            />
          </div>
          <div className={styles.bar}></div>
          {selectedCoin && (
            <div>
              <h2>구매 가능한 코인:</h2>
              <p>
                {amount.toFixed(8)} {selectedCoin.symbol} (= {selectedCoin.name}
                )
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
