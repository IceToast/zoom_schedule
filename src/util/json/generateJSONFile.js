export const generateJSONFile = (obj, fileName = 'meetings.json') => {
  const str = JSON.stringify(obj);
  const data = encode(str);

  const blob = new Blob([data], {
    type: 'application/octet-stream',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  link.dispatchEvent(event);
};

const encode = s => {
  const out = [];
  for (var i = 0; i < s.length; i++) {
    out[i] = s.charCodeAt(i);
  }
  return new Uint8Array(out);
};
