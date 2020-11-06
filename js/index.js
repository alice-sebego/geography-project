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
        
        codePostalFrGet("https://geo.api.gouv.fr/communes?format=json&codePostal="+ $code, (reponse)=>{
        
        let reponseData = JSON.parse(reponse);

            reponseData.forEach(city => {

                resultCity.innerHTML = "";
                const h3Result = document.createElement("h3");
                h3Result.innerHTML = `Bienvenue dans le département ${city.codeDepartement} `;
                const divTextResult = document.createElement("div");
                const textResult = document.createElement("p");
                textResult.innerHTML = `Le code postal <strong><span class="code-result">${city.codesPostaux}</span></strong> correspond à la ville de <strong>${city.nom}</strong><br> `;
                divTextResult.appendChild(textResult);
        
                resultCity.prepend(h3Result);
                resultCity.appendChild(divTextResult);
        
                const tableResult = document.createElement("table");
                tableResult.setAttribute("class", "table");
                tableResult.innerHTML = `<thead>
                                            <tr>
                                                <th scope="col">Population</th>
                                                <th scope="col">Code INSEE</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>${city.population}</td>
                                                <td>${city.code}</td>
                                            </tr>
                                        </tbody>`;
                resultCity.appendChild(tableResult);
            });
            
        });
    }
});