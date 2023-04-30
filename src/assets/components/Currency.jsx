import React, { useEffect, useState } from "react";

const Currency = () => {
  const BASE_URL = "https://api.getgeoapi.com/v2/currency/";
  const [amount, setAmount] = useState();
  const [convertAmount, setConvertAmount] = useState(0);
  const [currencyList, setCurrencyList] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const key = import.meta.env.VITE_APP_API_KEY;

  const getCurrencyList = async () => {
    // const response = await fetch(`${BASE_URL}list?api_key=${import.meta.env.VITE_APP_API_KEY}&format={json}`)
    const response = await fetch(
      `https://api.getgeoapi.com/v2/currency/list?api_key=${key}&format=json`
    );

    const data = await response.json();

    // console.log(data.currencies)
    const currencies = Object.keys(data.currencies);

    // console.log(currencies)
    setCurrencyList(currencies);
  };

  const getConvertRate = () => {
    fetch(
      `https://api.getgeoapi.com/v2/currency/convert?api_key=${
        import.meta.env.VITE_APP_API_KEY
      }&from=${fromCurrency}&to=${toCurrency}&amount=${amount}&format=json`
    )
      .then((respose) => respose.json())
      .then((data) => {
        setConvertAmount(Number(data.rates[toCurrency].rate*amount).toFixed(2));
        // setConvertAmount(data.rates.toCurrency.rate)
      });
  };

  const handleCurrencyConvert = (e, val) => {
    val === "from"
      ? setFromCurrency(e.target.value)
      : setToCurrency(e.target.value);
  };

  useEffect(() => {
    getCurrencyList();
  }, []);


  useEffect(() => {
    if (fromCurrency.length > 0 && toCurrency.length > 0) {
      getConvertRate();
    //   console.log(toCurrency);
    }
  }, [fromCurrency, toCurrency, amount]);

  return (
    <div className="counter-comtainer">
      <div className="text-box">
        <div className="inputarea">
          <div className="navbar-container">
            <h2>CURRENCY CONVERTER</h2>
          </div>

          <div className="from">
            <input
              type="number"
              placeholder="Enter Amount"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                // setAmountInFromCurrency(true)
              }}
            />
            <select
              value={fromCurrency}
              onChange={(e) => handleCurrencyConvert(e, "from")}
            >
              <option value="">Select Currency</option>
              {currencyList.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <h1>=</h1>

          <div className="to">
            <input
              type="number"
              placeholder="Convert Amount"
              value={convertAmount}
              onChange={(e) => {
                //     setAmount(e.target.value)
                //     setAmountInFromCurrency(false)
                //
              }}
            />
            <select
              value={toCurrency}
              onChange={(e) => {
                handleCurrencyConvert(e, "to");
              }}
            >
              <option value="">Select Currency</option>
              {currencyList.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Currency;
