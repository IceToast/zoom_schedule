export function setCookie(name, value, seconds) {
  let expires;
  if (typeof seconds != 'undefined') {
    const date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = '; expires=' + date.toGMTString();
  } else {
    expires = '';
  }

  document.cookie = name + '=' + value + expires + '; path=/';
}

export function getCookie(name) {
  name = name + '=';
  const carray = document.cookie.split(';');

  for (var i = 0; i < carray.length; i++) {
    let c = carray[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
  }

  return null;
}

export function deleteCookie(name) {
  setCookie(name, '', -1);
}
