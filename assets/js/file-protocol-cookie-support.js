  Object.defineProperty(document, 'cookie', {
    get: function () {
      return this.value || '';
    },
    set: function (cookie) {
      cookie = cookie || '';

      const cutoff = cookie.indexOf(';');
      const pair = cookie.substring(0, cutoff >= 0 ? cutoff : cookie.length);
      const bits = pair.split('=');
      const cookies = this.value ? this.value.split('; ') : [];

      // look for an existing cookie and remove it if it exists
      for (let i = 0; i < cookies.length; i++) {
        const cookieBits = cookies[i].split('=');
        if (cookieBits[0] === bits[0]) {
          cookies.splice(i, 1);
          break;
        }
      }

      cookies.push(pair);

      return this.value = cookies.join('; ');
    }
  });