import {codePostalFrGet} from "./ajax.js";

console.log("hello word");
const $postal = document.getElementById("postal");
const $sectionPostalCode = document.getElementById("postal-code");
const resultCity = document.getElementById("result-city");

$postal.addEventListener("submit", (e)=>{
    e.preventDefault();
    let $code = document.getElementById("code").value;

    codePostalFrGet("http://api.zippopotam.us/fr/"+ $code, (reponse)=>{
        let reponseData = JSON.parse(reponse);
        console.log(reponseData.places[0]);
        console.log(reponseData.places[0].state);
        const cityName = Object.values(reponseData.places[0])[0];
        
        resultCity.innerHTML = "";
        const h3Result = document.createElement("h3");
        h3Result.innerHTML = `Bienvenue dans la région ${reponseData.places[0].state} `;
        const textResult = document.createElement("p");
        textResult.innerHTML = `Le code postal <strong> ${Object.values(reponseData)[0]}</strong> correspond à la ville de <strong>${cityName}</strong> `;

        $sectionPostalCode.appendChild(resultCity);
        resultCity.prepend(h3Result);
        resultCity.appendChild(textResult);
        
    })
});
