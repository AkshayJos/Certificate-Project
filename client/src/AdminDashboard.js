
import React, { useState } from 'react';
import axios from 'axios';

// Admin Dashboard Component
const AdminDashboard = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  // Handle file input change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Handle file upload
  const handleUpload = () => {
    const formData = new FormData();
    formData.append('file', file);

    // POST request to upload the Excel file
    axios.post('/api/upload', formData)
      .then(response => setStatus('File uploaded successfully'))
      .catch(error => setStatus('Error uploading file'));
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <p>{status}</p>
    </div>
  );
};

export default AdminDashboard;
