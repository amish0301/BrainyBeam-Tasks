import { useEffect, useState } from "react";
import { HiSwitchHorizontal as ConverterIcon } from "react-icons/hi";
import { toast } from "react-toastify";
import { credntials } from "./api.credentials";
import { EXPIRY_TIME } from "./constant";

// here storing data in localstorage can significantly improve performance, why? we can get reduced from multiple API calls

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [amount, setAmount] = useState(null);
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [exchangeRates, setExchangeRates] = useState({});

  useEffect(() => {
    const storedData = localStorage.getItem("currencies");

    if (storedData) {
      const parsedData = JSON.parse(storedData);
      const currentTime = new Date().getTime();

      if (currentTime < parsedData.expiry) {
        // Data is still valid
        setCurrencies(Object.keys(parsedData.rates));
        setExchangeRates(parsedData.rates);
      } else {
        // Data expired, clear and fetch new rates
        localStorage.removeItem("currencies");
        fetchExchangeRates();
      }
    } else {
      fetchExchangeRates();
    }
  }, []);

  const currencyToggler = () => {
    const currFrom = fromCurrency;
    const currTo = toCurrency;

    setFromCurrency(currTo);
    setToCurrency(currFrom);

  };

  useEffect(() => {
    if (amount && exchangeRates[fromCurrency] && exchangeRates[toCurrency]) {
      convertCurrency(amount, fromCurrency, toCurrency);
    }
  }, [amount, fromCurrency, toCurrency, exchangeRates]);

  const fetchExchangeRates = async () => {
    try {
      const response = await fetch(`${credntials.url}`, credntials.options);
      const data = await response.json();   // will return -> data object

      if (data) {
        const currencyList = Object.keys(data.data);

        setCurrencies(currencyList);
        setExchangeRates(data.data);

        const expiry = new Date().getTime() + EXPIRY_TIME; // set expiry time

        localStorage.setItem("currencies", JSON.stringify({
          rates: data.data,
          expiry: expiry
        }));
      }
    } catch (error) {
      throw error
    }
  }

  const convertCurrency = (amount, fromCurrency, toCurrency) => {
    try {
      if (amount === null || amount <= 0) {
        toast.warn("Enter a valid amount");
        return;
      }

      if (amount && fromCurrency && toCurrency) {
        const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];
        setConvertedAmount((amount * rate).toFixed(2));
      }
    } catch (error) {
      toast.error('Something went wrong');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4 text-black">Currency Converter</h2>
      <p className="text-base text-wide font-semibold">A Realtime Currency Converter</p>
      <div className="p-6 m-2 rounded-lg bg-[#fdfdfd] shadow-lg w-full max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border rounded-lg p-2 w-full"
            placeholder="Enter amount"
            autoFocus
          />
        </div>

        <div className="flex justify-between gap-3 mb-4">
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-1/2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {currencies?.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>

          <button className="px-3 py-2 rounded-md cursor-pointer" onClick={currencyToggler}>
            <ConverterIcon size={24} />
          </button>

          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="p-3 border border-gray-300 rounded-lg w-1/2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {currencies?.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <button
          onClick={convertCurrency}
          disabled={amount === null}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-600 transition"
        >
          Convert
        </button>

        {(convertedAmount !== null && amount) && (
          <p className="text-center mt-4 text-xl font-semibold">
            {amount} {fromCurrency} = {convertedAmount} {toCurrency}
          </p>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;
