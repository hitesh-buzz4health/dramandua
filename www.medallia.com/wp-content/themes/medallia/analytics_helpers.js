ga('require', 'linker');
ga('linker:autoLink', ['go.medallia.com']);

function getURLParams() {
  var s1 = location.search.substring(1, location.search.length).split('&'),
      r = {}, s2, i;
  for (i = 0; i < s1.length; i += 1) {
      s2 = s1[i].split('=');
      r[decodeURIComponent(s2[0]).toLowerCase()] = decodeURIComponent(s2[1] || '');
  }
  return r;
};

function getUTMParams() {
  var params = getURLParams();
  var utmParams = {};
  for(name in params) {
    if (/^utm_.*/.test(name)) {
      utmParams[name] = params[name];
    }
  }
  return utmParams;
}

function serialize(obj) {
  var str = [];
  for(var p in obj)
    if (obj.hasOwnProperty(p)) {
      if (obj[p]) {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      } else {
        str.push(encodeURIComponent(p));
      }
    }
  return str.join("&");
}

function renderLinkedIframe(targetId, url, decorateHash, forwardUTMParams) {
  if (typeof decorateHash === 'undefined') {
      decorateHash = false;
  }

  if (typeof forwardUTMParams === 'undefined') {
    forwardUTMParams = false;
  }

  return function(tracker) {
    window.linker = window.linker || new window.gaplugins.Linker(tracker);
    var iframe = document.createElement('iframe');

    if (forwardUTMParams) {
      var utmParams = getUTMParams();
      url += '?' + serialize(utmParams);
    }

    iframe.src = window.linker.decorate(url, decorateHash);
    document.getElementById(targetId).appendChild(iframe);
  };
}
;
