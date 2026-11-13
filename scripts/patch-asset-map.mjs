import fs from 'fs';

const map = JSON.parse(fs.readFileSync('extracted/asset-map.json', 'utf8'));
map['https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1576732e78ed764559c153_terms_of_use_era_residence%20'] = '/assets/terms_of_use_aura_residence.pdf';
map['https://cdn.prod.website-files.com/6a0853d5dab31b18f0677081/6a1576732e78ed764559c153_terms_of_use_era_residence'] = '/assets/terms_of_use_aura_residence.pdf';

fs.writeFileSync('extracted/asset-map.json', JSON.stringify(map, null, 2), 'utf8');
