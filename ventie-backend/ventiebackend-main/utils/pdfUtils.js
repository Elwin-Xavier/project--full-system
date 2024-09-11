import puppeteer from 'puppeteer';

export const generatePDF = async (eventName, ticketType, qrCodeBuffer, eventDate, venueName, venueAddress) => {
  const qrCodeBase64 = qrCodeBuffer.toString('base64');
  const html = generateHTML(eventName, ticketType, qrCodeBase64, eventDate, venueName, venueAddress);
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(html);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();
  return pdfBuffer;
};

const generateHTML = (eventName, ticketType, qrCodeBase64, eventDate, venueName, venueAddress) => {
  return `
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; }
        .ticket { text-align: center; padding: 20px; border: 2px solid #000; margin: 20px auto; width: 300px; }
        .qr-code { margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="ticket">
        <h1>Event Ticket</h1>
        <p><strong>Event Name:</strong> ${eventName}</p>
        <p><strong>Ticket Type:</strong> ${ticketType}</p>
        <p><strong>Event Date:</strong> ${eventDate}</p>
        <p><strong>Venue:</strong> ${venueName}</p>
        <p><strong>Address:</strong> ${venueAddress}</p>
        <div class="qr-code">
            <img src="data:image/png;base64,${qrCodeBase64}" alt="QR Code" />
        </div>
      </div>
    </body>
    </html>
  `;
};
