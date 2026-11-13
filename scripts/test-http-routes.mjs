import http from 'http';

function checkUrl(urlPath) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:3005${urlPath}`, (res) => {
      resolve({ path: urlPath, statusCode: res.statusCode, location: res.headers.location });
    });
    req.on('error', (err) => {
      resolve({ path: urlPath, error: err.message });
    });
  });
}

async function run() {
  const testPaths = [
    '/',
    '/contact',
    '/apartments',
    '/apartments/',
    '/apartments/034',
    '/apartments/034/',
    '/coming-soon',
    '/assets/terms_of_use_aura_residence.pdf',
    '/assets/images/6a258c1f74c3435f82f4f129_map_sales-office.svg',
    '/assets/images/6a3526e3c863756e12114af0_034apt_compressed.pdf'
  ];

  for (const p of testPaths) {
    const res = await checkUrl(p);
    console.log(`${p} -> status: ${res.statusCode}${res.location ? ' (redirect to ' + res.location + ')' : ''}`);
  }
}

run();
