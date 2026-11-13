async function getPhotoDetails() {
  const res = await fetch('https://unsplash.com/photos/67eb9e2e2099', {
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });
  console.log('Status 1:', res.status);
  const res2 = await fetch('https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=2000&q=80');
  console.log('Image status:', res2.status, res2.headers.get('content-type'));
}
getPhotoDetails();
