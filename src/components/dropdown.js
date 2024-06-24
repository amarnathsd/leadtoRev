import React from 'react';

const Dropdown = ({ data, onCountryChange }) => {
  const handleChange = (event) => {
    onCountryChange(event.target.value);
  };

  return (
    <select onChange={handleChange} >
      <option value="">Search Country</option>
      {data.map((country, index) => (
        <option key={index}>
          {country.name.common}
        </option>
      ))}
    </select>
  );
};

export default Dropdown;
