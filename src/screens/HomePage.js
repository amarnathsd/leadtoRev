import React, { useState, useEffect } from "react";
import axios from "axios";
import Dropdown from "../components/dropdown";
import { Line } from 'react-chartjs-2';
import MultiLineChart from "../components/multiLineChart";

const HomePage = () => {
  const [dropdownData, setDropdownData] = useState([]);
  const [countryData, setCountryData] = useState(null);
  const [totalCases, setTotalCases] = useState(0);
  const [totalDeaths, setTotalDeaths] = useState(0);
  const [totalRecovery, setTotalRecovery] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        setDropdownData(response.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  const handleCountryChange = async (countryCode) => {
    try {
      const response = await axios.get(
        `https://disease.sh/v3/covid-19/historical/${countryCode}?lastdays=1500`
      );
      setCountryData(response.data);

      const cases = response.data.timeline.cases;
      const deaths = response.data.timeline.deaths;
      const recovery = response.data.timeline.recovered;
      const totalCases = Object.values(cases).reduce((a, b) => a + b, 0);
      const totalDeaths = Object.values(deaths).reduce((a, b) => a + b, 0);
      const totalRecovery = Object.values(recovery).reduce((a, b) => a + b, 0);

      setTotalCases(totalCases);
      setTotalDeaths(totalDeaths);
      setTotalRecovery(totalRecovery);
    } catch (error) {
      console.error("Error fetching country data", error);
    }
  };

  const renderLineChart = () => {
    if (!countryData || !countryData.timeline) return null;

    const dates = Object.keys(countryData.timeline.cases);
    const cases = Object.values(countryData.timeline.cases);
    const deaths = Object.values(countryData.timeline.deaths);
    const recovered = Object.values(countryData.timeline.recovered);

    const data = {
      labels: dates,
      datasets: [
        {
          label: 'Cases',
          data: cases,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: false,
        },
        {
          label: 'Deaths',
          data: deaths,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: false,
        },
        {
          label: 'Recovered',
          data: recovered,
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: false,
        },
      ],
    };

    return <Line data={data} />;
  };

  return (
    <div className="">
      <h3>Covid-19 and Population Dashboard</h3>
      <div className="mt-4">
        <Dropdown data={dropdownData} onCountryChange={handleCountryChange} />
      </div>
      <div className="d-flex justify-content-around mt-4">
        <div>
          <div className="d-flex justify-content-between bg-primary shadow rounded">
            <div className="rounded me-2"> 
              <h6 className="p-2">Total Cases</h6>
            </div>
            <div className="bg-white rounded">
              <h6 className="p-2">{totalCases}</h6>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between bg-primary shadow rounded">
            <div className="rounded me-2"> 
              <h6 className="p-2">Recoveries</h6>
            </div>
            <div className="bg-white rounded">
              <h6 className="p-2">{totalRecovery}</h6>
            </div>
          </div>
        </div>
        <div>
          <div className="d-flex justify-content-between bg-primary shadow rounded">
            <div className="rounded me-2"> 
              <h6 className="p-2">Deaths</h6>
            </div>
            <div className="bg-white rounded">
              <h6 className="p-2">{totalDeaths}</h6>
            </div>
          </div>
        </div>
      </div>

      <div className="col-12 mt-4">
        <h2>COVID-19 Cases, Deaths, and Recoveries Over Time</h2>
        {/* {countryData && countryData.timeline && (
          <MultiLineChart
            dates={Object.keys(countryData.timeline.cases)}
            cases={Object.values(countryData.timeline.cases)}
            deaths={Object.values(countryData.timeline.deaths)}
            recovered={Object.values(countryData.timeline.recovered)}
          />
        )} */}
      </div>
    </div>
  );
};

export default HomePage;
 