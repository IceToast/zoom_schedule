export const createZoomURL = ({ mobile, id, password }) => {
  if (mobile) {
    return mobileURL(id, password);
  } else {
    return desktopURL(id, password);
  }
};

const mobileURL = (id, password) => {
  const protocol = 'https://';
  const domainAndPath = 'zoom.us/j/';
  const url = protocol + domainAndPath + id;

  return url;
};

const desktopURL = (id, password) => {
  const protocol = 'zoommtg://';
  const domainAndPath = 'zoom.us/join?';

  const searchParams = new URLSearchParams();
  searchParams.append('confno', id);
  searchParams.append('pwd', password);

  const url = protocol + domainAndPath + searchParams.toString();

  return url;
};
