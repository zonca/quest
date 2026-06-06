const fs = require('fs');
const path = require('path');

const contractorsPath = path.resolve(__dirname, 'contractors.json');

exports.handler = async (event, context) => {
  const { httpMethod, body } = event;

  if (httpMethod === 'GET') {
    try {
      const data = fs.readFileSync(contractorsPath, 'utf8');
      return {
        statusCode: 200,
        body: data,
        headers: { 'Content-Type': 'application/json' },
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to read contractors' }) };
    }
  }

  if (httpMethod === 'POST' || httpMethod === 'PUT') {
    try {
      const newContractor = JSON.parse(body);
      let contractors = JSON.parse(fs.readFileSync(contractorsPath, 'utf8'));

      if (httpMethod === 'POST') {
        newContractor.id = Date.now();
        contractors.push(newContractor);
      } else {
        contractors = contractors.map(c => c.id === newContractor.id ? newContractor : c);
      }

      fs.writeFileSync(contractorsPath, JSON.stringify(contractors, null, 2));
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Contractor saved', contractor: newContractor }),
      };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to save contractor' }) };
    }
  }

  if (httpMethod === 'DELETE') {
    try {
      const { id } = JSON.parse(body);
      let contractors = JSON.parse(fs.readFileSync(contractorsPath, 'utf8'));
      contractors = contractors.filter(c => c.id !== id);
      fs.writeFileSync(contractorsPath, JSON.stringify(contractors, null, 2));
      return { statusCode: 200, body: JSON.stringify({ message: 'Contractor deleted' }) };
    } catch (error) {
      return { statusCode: 500, body: JSON.stringify({ error: 'Failed to delete contractor' }) };
    }
  }

  return { statusCode: 405, body: 'Method Not Allowed' };
};
