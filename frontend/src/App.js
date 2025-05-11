import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-defaulticon-compatibility';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState({});
  const [filteredData, setFilteredData] = useState({});
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');
  const [filterReputation, setFilterReputation] = useState('');

  // Fetch data from the backend
  const fetchData = () => {
    setLoading(true);
    axios.get('http://localhost:5000/api/cti/data')
      .then(response => {
        console.log('Fetched Data:', response.data);
        setData(response.data);
        setFilteredData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Apply filters to the data
  const applyFilters = () => {
    let filtered = { ...data };

    // Filter by Indicator Type
    if (filterType) {
      if (filtered.type_title !== filterType) {
        filtered = {};
      }
    }

    // Filter by Reputation (Handling missing/zero values)
    if (filterReputation) {
      const reputationLevel = parseInt(filtered.reputation, 10) || 0; // Default to 0 if reputation is missing or NaN
      if (
        (filterReputation === 'High' && reputationLevel < 70) ||
        (filterReputation === 'Medium' && (reputationLevel < 30 || reputationLevel >= 70)) ||
        (filterReputation === 'Low' && reputationLevel >= 30)
      ) {
        filtered = {};
      }
    }

    setFilteredData(filtered);
  };

  // Update filtered data whenever the filters change
  useEffect(() => {
    applyFilters();
  }, [filterType, filterReputation]);

  return (
    <>
      <div className="navbar">
        Cyber Threat Intelligence Dashboard
      </div>
      <div className="container">

        {/* Filter Controls */}
        <div className="filter-container">
          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="IPv4">IPv4</option>
            <option value="Domain">Domain</option>
          </select>

          <select
            className="filter-select"
            value={filterReputation}
            onChange={(e) => setFilterReputation(e.target.value)}
          >
            <option value="">All Reputations</option>
            <option value="High">High (70-100)</option>
            <option value="Medium">Medium (30-69)</option>
            <option value="Low">Low (0-29)</option>
          </select>
        </div>

        {loading ? (
          <div className="loading">Loading...</div>
        ) : (
          <>
            <table>
              <tbody>
                <tr>
                  <th>Indicator:</th>
                  <td>{filteredData.indicator || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Type:</th>
                  <td>{filteredData.type_title || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Reputation:</th>
                  <td>{filteredData.reputation !== undefined ? filteredData.reputation : 'N/A'}</td>
                </tr>
                <tr>
                  <th>Country:</th>
                  <td>{filteredData.country_name || 'N/A'}</td>
                </tr>
                <tr>
                  <th>ASN:</th>
                  <td>{filteredData.asn || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Latitude:</th>
                  <td>{filteredData.latitude || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Longitude:</th>
                  <td>{filteredData.longitude || 'N/A'}</td>
                </tr>
                <tr>
                  <th>Validation:</th>
                  <td>
                    {filteredData.validation && filteredData.validation.length > 0 ? (
                      filteredData.validation.map((item, index) => (
                        <p key={index}>{item.message}</p>
                      ))
                    ) : (
                      'N/A'
                    )}
                  </td>
                </tr>
              </tbody>
            </table>

            {filteredData.latitude && filteredData.longitude && (
              <div className="map-container">
                <MapContainer 
                  center={[filteredData.latitude, filteredData.longitude]} 
                  zoom={5} 
                  className="leaflet-container"
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; OpenStreetMap contributors'
                  />
                  <Marker position={[filteredData.latitude, filteredData.longitude]}>
                    <Popup>
                      Location: {filteredData.country_name || 'N/A'}<br />
                      Latitude: {filteredData.latitude}<br />
                      Longitude: {filteredData.longitude}
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
            )}
          </>
        )}
        <button className="refresh-button" onClick={fetchData}>Refresh Data</button>
      </div>
    </>
  );
}

export default App;
