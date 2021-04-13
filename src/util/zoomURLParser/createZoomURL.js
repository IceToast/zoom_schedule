export function createZoomURL(ctx) {
  if (ctx.mobile) {
    return mobileURL(ctx);
  } else {
    return desktopURL(ctx);
  }
}

function mobileURL(ctx) {
  const protocol = 'https://';
  const domainAndPath = 'zoom.us/j/';
  const url = protocol + domainAndPath + ctx.id;

  return url;
}

function desktopURL(ctx) {
  const protocol = 'zoommtg://';
  const domainAndPath = 'zoom.us/join?';

  const searchParams = new URLSearchParams();
  searchParams.append('confno', ctx.id);
  searchParams.append('pwd', ctx.password);

  const url = protocol + domainAndPath + searchParams.toString();

  return url;
}
