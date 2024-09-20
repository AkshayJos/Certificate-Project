
import React, { useState } from 'react';
import axios from 'axios';

const StudentPortal = () => {
  const [id, setId] = useState('');
  const [certificate, setCertificate] = useState(null);

  // Handle search input change
  const handleSearch = () => {
    // GET request to fetch certificate details
    axios.get(`/api/certificate/${id}`)
      .then(response => setCertificate(response.data))
      .catch(error => alert('Error retrieving certificate'));
  };

  return (
    <div>
      <h1>Student Portal</h1>
      <input 
        type="text" 
        value={id} 
        onChange={(e) => setId(e.target.value)} 
        placeholder="Enter Certificate ID" 
      />
      <button onClick={handleSearch}>Search</button>

      {certificate && (
        <div>
          <h2>Certificate Details</h2>
          <p>Name: {certificate.name}</p>
          <p>Domain: {certificate.domain}</p>
          <p>Start Date: {certificate.startDate}</p>
          <p>End Date: {certificate.endDate}</p>
          {/* Add a button to download the certificate as PDF */}
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
