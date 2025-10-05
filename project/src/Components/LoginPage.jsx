import React, { useState, useEffect } from 'react'
import './LoginPage.css'

const countries = [
  { code: "IN", name: "India", dialcode: "+91", currency: "INR", symbol: "₹" },
  { code: "US", name: "United States", dialcode: "+1", currency: "USD", symbol: "$" },
  { code: "ES", name: "Spain", dialcode: "+34", currency: "EUR", symbol: "€" }
];

const translations = {
  en: {
    email: "Email Address",
    password: "Password",
    phonenumber: "Phone Number",
    submit: "Submit",
  },

  es: {
    email: "Correo Electronico",
    password: "Contraseña",
    phonenumber: "Número de Teléfono",
    submit: "Enviar",
  },
};

const LoginPage = () => {
    
  const savedCountryCode = JSON.parse(localStorage.getItem("country"))?.code;
  const savedCountry = countries.find(c => c.code === savedCountryCode) || countries[0];
  const savedLang = localStorage.getItem("lang") || "en";

  const [language, setLanguage] = useState(savedLang);
  const [country, setCountry] = useState(savedCountry);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
  });

  useEffect(() => {
    localStorage.setItem("country", JSON.stringify(country));
    localStorage.setItem("lang", language);
  }, [country, language]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    console.log("Selected Country:", country);
    console.log("Language:", language);
  };

 return (
  <div className="login-container">
    <h2>Login Page</h2>

    <div>
      <label>Select Language:</label>
      <select value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="en">English</option>
        <option value="es">Espanol</option>
      </select>
    </div>

    <div>
      <label>Select Country:</label>
      <select
        value={country.code}
        onChange={(e) => setCountry(countries.find(c => c.code === e.target.value))}
      >
        {countries.map((c) => (
          <option key={c.code} value={c.code}>
            {c.name}, {c.dialcode}
          </option>
        ))}
      </select>
    </div>

    <p>Example Price: <strong>{country.symbol}100</strong></p>

    <form onSubmit={handleSubmit}>
      <div>
        <label>{translations[language].email}:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
      </div>

      <div>
        <label>{translations[language].password}:</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
      </div>

      <div>
        <label>{translations[language].phonenumber}:</label>
        <div className="phone-input">
          <span>{country.dialcode}</span>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required />
        </div>
      </div>

      <button type="submit">{translations[language].submit}</button>
    </form>
  </div>
);

}

export default LoginPage;
