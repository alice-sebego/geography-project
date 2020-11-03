const codePostalFrGet = (url, callback)=>{

    let xhrFr = new XMLHttpRequest();
    
    xhrFr.open("GET", url);
    
    xhrFr.addEventListener("load", () =>{
        if(xhrFr.status >= 200 && xhrFr.status < 400) {
          callback(xhrFr.responseText);
        } else {
          console.error( xhrFr.status + " " + xhrFr.statusText + " " + url);
      }

    });

    xhrFr.addEventListener("error", ()=>{
        console.error("erreur réseau avec l'URL" + url)
    });
    
    xhrFr.send();
}

export {codePostalFrGet}