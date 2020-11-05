import {codePostalFrGet} from "./ajax.js";

const $postal = document.getElementById("postal");
const resultCity = document.getElementById("result-city");

$postal.addEventListener("submit", (e)=>{
    e.preventDefault();
    let $code = document.getElementById("code").value;

    if($code === "13000" || $code === "69000" || $code === "75000"){

        resultCity.innerHTML = "";
        const textResult = document.createElement("p");
        textResult.setAttribute("class", "alert alert-warning");
        textResult.innerHTML = `Les codes postaux <strong>13000, 69000 & 75000</strong> correspondent à des grandes villes métropolitaines dont <strong>vous devez renseigner l'arrondissement</strong>
                                <br><span class="bold">Ex</span> : 13002, 69001, 75004 `;
        resultCity.appendChild(textResult); 

    } else if($code.length !== 5){

        resultCity.innerHTML = "";
        const textResult = document.createElement("p");
        textResult.setAttribute("class", "alert alert-warning");
        textResult.innerHTML = `Le format du code postal saisi n'est pas valide
                                <br><span class="bold">Merci d'entrer un code à 5 chiffres</span> (ex : 13002, 33800, 64000) `;
        resultCity.appendChild(textResult);

    } else { 
        
        codePostalFrGet("http://api.zippopotam.us/fr/"+ $code, (reponse)=>{
        
        let reponseData = JSON.parse(reponse);

            const cityName = Object.values(reponseData.places[0])[0];
            
            resultCity.innerHTML = "";
            const h3Result = document.createElement("h3");
            h3Result.innerHTML = `Bienvenue dans la région ${reponseData.places[0].state} `;
            const textResult = document.createElement("p");
            textResult.innerHTML = `Le code postal <strong> ${Object.values(reponseData)[0]}</strong> correspond à la ville de <strong>${cityName}</strong> `;
    
            resultCity.style.backgroundColor = "rgba(0, 0, 0, 0.2);"
            resultCity.prepend(h3Result);
            resultCity.appendChild(textResult);
    
            const tableResult = document.createElement("table");
            tableResult.setAttribute("class", "table");
            tableResult.innerHTML = `<thead>
                                        <tr>
                                            <th scope="col">Longitude</th>
                                            <th scope="col">Latitude</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>${reponseData.places[0].longitude}</td>
                                            <td>${reponseData.places[0].latitude}</td>
                                        </tr>
                                    </tbody>`;
            resultCity.appendChild(tableResult);
            
        });
    }
});