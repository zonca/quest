[![Netlify Status](https://api.netlify.com/api/v1/badges/5841ec2c-8a92-4a92-82d9-576fc7957d3f/deploy-status)](https://app.netlify.com/projects/questassetdevelopment/deploys)

# Quest Real Estate Services

Static site for questlajolla.com, built with Bulma and vanilla JS.

## Contact info handling
- Emails and phone numbers are assembled client-side from encoded strings in `email-obfuscate.js` to reduce scraping.
- Update `email-obfuscate.js` if addresses change, then adjust corresponding `data-email-key` / `data-phone` attributes in the HTML.

## Deploys
- Main branch auto-deploys to Netlify (`questassetdevelopment` / questlajolla.com).
- Use `netlify status` to confirm linkage and `netlify api listSiteDeploys` to inspect recent deploys.
