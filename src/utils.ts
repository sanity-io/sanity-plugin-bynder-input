const url =
  'https://ucv.bynder.com/5.0.5/modules/compactview/bynder-compactview-3-latest.js';

export function loadBynder(callback: () => void): void | boolean {
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
