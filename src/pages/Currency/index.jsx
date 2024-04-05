import React, { useState, useEffect } from 'react';

export default function Currency() {
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch('https://cbu.uz/ru/arkhiv-kursov-valyut/json/')
      .then(response => response.json())
      .then(data => {
        const mappedCurrencies = data.map(currency => ({
          CcyNm_UZ: currency.CcyNm_UZ,
          Rate: currency.Rate,
          Date: currency.Date,
          Ccy: currency.Ccy,
          Code: currency.Code
        }));
        setCurrencies(mappedCurrencies);
      })
      .catch(error => {
        console.error('Xatolik yuz berdi:', error);
      });
  }, []);

  return (
    <div>
      <h1>Valyuta Kurslari</h1>
      <table>
        <thead>
          <tr>
            <th>Nomi</th>
            <th>Narx</th>
            <th>Sana</th>
            <th>Kodi</th>
          </tr>
        </thead>
        <tbody>
          {currencies.map((currency, index) => (
            <tr key={index}>
              <td>{currency.CcyNm_UZ}</td>
              <td>{currency.Rate}</td>
              <td>{currency.Date}</td>
              <td>{currency.Code}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
