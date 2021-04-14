export function getZoomIdByURL(url) {
  const pattern = /\d{11}|\d{10}/;
  const result = url.match(pattern);

  if (Array.isArray(result)) {
    return result[0];
  }

  return ''; // null
}
