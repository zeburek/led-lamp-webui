import ReconnectingWebSocket from 'reconnecting-websocket';

export const httpHost = window.ENV_HTTP_HOST ? window.ENV_HTTP_HOST:"localhost:8000";

export const websocket = new ReconnectingWebSocket(`ws://${httpHost}/ws`);

export const status = (response) => {  
  if (response.status >= 200 && response.status < 300) {  
    return Promise.resolve(response)  
  } else {  
    return Promise.reject(new Error(response.statusText))  
  }  
};

function futch(url, opts={}, onProgress) {
  return new Promise( (res, rej)=>{
      var xhr = new XMLHttpRequest();
      xhr.open(opts.method || 'get', url);
      for (var k in opts.headers||{})
          xhr.setRequestHeader(k, opts.headers[k]);
      xhr.onload = e => res(e.target.responseText);
      xhr.onerror = rej;
      if (xhr.upload && onProgress)
          xhr.upload.onprogress = onProgress; // event.loaded / event.total * 100 ; //event.lengthComputable
      xhr.send(opts.body);
  });
}

export const uploadSize = (size) => fetch(`http://${httpHost}/updateSize`, {
  method: "POST",
  body: new URLSearchParams(`fileSize=${size}`)
}).then(status)

export const uploadBinary = (file, onProgress) => futch(`http://${httpHost}/update`, {
  method: "POST",
  body: file
}, onProgress)
