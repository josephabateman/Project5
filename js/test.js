
//const xhr = new XMLHttpRequest();
//const url = 'http://localhost:3000/api/teddies/order'
//const data = JSON.stringify({id: '200'});
//
//xhr.responseType = 'json';
//xhr.onreadystatechange = () => {
//    if (xhr.readyState === XMLHttpRequest.DONE) {
//        alert('it worked')
//    }
//};
//
//xhr.open('POST', url);
//xhr.send(data);

const api = 'http://localhost:3000/api/teddies/order

function makeRequest() {
  return new Promise((resolve, reject) => {
    let request = new XMLHttpRequest();
    request.open('POST', api);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200 || request.status === 201) {
          resolve(JSON.parse(request.response));
        } else {
          reject(JSON.parse(request.response));
        }
      }
    };
    if ('POST') {
      request.setRequestHeader('Content-Type', 'application/json');
      request.send(JSON.stringify({id: '200'}));
    } else {
      alert('error')
    }
  });
}
makeRequest()

