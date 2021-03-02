const url =
  'https://d8ejoa1fys2rk.cloudfront.net/5.0.5/modules/compactview/bynder-compactview-2-latest.js';

export function loadBynder(callback: () => void) {
  const existingScript = document.getElementById('bynder');
  if (!existingScript) {
    const script = document.createElement('script');
    script.src = url;
    script.id = 'bynder';
    document.body.appendChild(script);
    script.onload = () => {
      if (callback) {
        return callback();
      }
      return true;
    };
  }
  if (existingScript && callback) {
    return callback();
  }
  return true;
}
