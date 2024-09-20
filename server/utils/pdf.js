const PDFDocument = require('pdfkit');

const generatePDF = (certificate, res) => {
  const doc = new PDFDocument({ size: 'A4' });
  
  // Set the response headers to indicate a PDF file
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=certificate.pdf');

  // Pipe the PDF document to the response
  doc.pipe(res);
  doc.fontSize(25).text('Certificate of Internship', { align: 'center' });
  doc.moveDown();
 
  doc.fontSize(18).text(`Certificate ID: ${certificate.certificateId}`);
  doc.moveDown();
  
  doc.fontSize(18).text(`Student Name: ${certificate.studentName}`);
  doc.moveDown();

  doc.fontSize(18).text(`Internship Domain: ${certificate.internshipDomain}`);
  doc.moveDown();

  doc.fontSize(18).text(`Start Date: ${certificate.startDate}`);
  doc.moveDown();

  doc.fontSize(18).text(`End Date: ${certificate.endDate}`);

  doc.moveDown();

  // Finalize the PDF document
  doc.end();
};

module.exports = { generatePDF };
