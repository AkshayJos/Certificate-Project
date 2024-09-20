import React, { useState } from 'react';
import axios from 'axios';

const StudentPortal = () => {
  const [id, setId] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');

  // Handle fetching PDF URL
  const fetchPDF = () => {
    axios({
      url: `http://localhost:5000/api/certificate/${id}`, // Ensure this endpoint matches your backend route
      method: 'GET',
      responseType: 'blob'
    })
    .then(response => {
      // Create a URL for the PDF Blob
      const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
      setPdfUrl(url);
    })
    .catch(error => alert('Error retrieving PDF'));
  };

  // Handle PDF download
  const handleDownloadPDF = () => {
    if (pdfUrl) {
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.setAttribute('download', 'certificate.pdf');
      document.body.appendChild(link);
      link.click();
      link.remove();
    }
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
      <button onClick={fetchPDF}>Search</button>

      {pdfUrl && (
        <div>
          <h3>View Certificate</h3>
          <iframe
            src={pdfUrl}
            width="600"
            height="800"
            title="Certificate PDF"
            style={{ border: 'none' }}
          />
          <button onClick={handleDownloadPDF}>Download PDF</button>
        </div>
      )}
    </div>
  );
};

export default StudentPortal;
