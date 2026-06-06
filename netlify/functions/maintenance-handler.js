const fs = require('fs');
const path = require('path');

// NOTE: In a production environment, this should be a real database.
// For this prototype, we're using a JSON file.
const contractorsPath = path.resolve(__dirname, 'contractors.json');

exports.handler = async (event, context) => {
  // Only process POST requests from Netlify Forms
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    // Parse the form data from Netlify (it's base64 encoded by default in some cases, 
    // but here we expect Netlify to forward it as multipart/form-data or urlencoded)
    // Actually, Netlify background functions or submission hooks are better for this.
    // For a direct trigger, we'll assume Netlify forwards the submission.
    
    // In Netlify, for form-triggered functions, the body is usually a JSON object
    // if triggered via a submission hook (event type 'submission-created').
    const payload = JSON.parse(event.body).payload;
    const { data } = payload;
    
    const name = data.name;
    const address = data.address;
    const contractorType = data['contractor-type'];
    const description = data.description;
    const phone = data.phone;
    const email = data.email;

    console.log(`Received maintenance request for ${contractorType} at ${address}`);

    // Load contractors
    const contractors = JSON.parse(fs.readFileSync(contractorsPath, 'utf8'));

    // Filter contractors by type
    const matchingContractors = contractors.filter(c => c.type === contractorType);

    if (matchingContractors.length === 0) {
      console.log(`No contractors found for type: ${contractorType}`);
      return { statusCode: 200, body: JSON.stringify({ message: 'No matching contractors found' }) };
    }

    // Notify contractors via WhatsApp (Simulated)
    // In a real scenario, you'd use Twilio or a similar API.
    for (const contractor of matchingContractors) {
      const message = \`New Maintenance Request!
Address: \${address}
Type: \${contractorType}
Description: \${description}
Customer: \${name} (\${phone})\`;

      console.log(\`[SIMULATED WHATSAPP] Sending to \${contractor.name} (\${contractor.phone}): \${message}\`);
      
      /* Real implementation would look like this:
      await axios.post('https://api.twilio.com/...', {
        to: contractor.phone,
        from: 'whatsapp:+1...',
        body: message
      }, { auth: { username: '...', password: '...' } });
      */
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Contractors notified successfully',
        notifiedCount: matchingContractors.length
      }),
    };
  } catch (error) {
    console.error('Error processing maintenance request:', error);
    return { statusCode: 500, body: JSON.stringify({ error: 'Failed to process request' }) };
  }
};
