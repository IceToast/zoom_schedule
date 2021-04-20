export const generateJSONFile = (obj, fileName = 'meetings.json') => {
  const str = JSON.stringify(obj);
  const bytes = new TextEncoder().encode(str);

  const blob = new Blob([bytes], {
    type: 'application/json;charset=utf-8',
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', fileName);
  const event = document.createEvent('MouseEvents');
  event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
  link.dispatchEvent(event);
};
