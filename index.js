// const nome= process.argv[2]
// const sobreNome= process.argv[3]

// console.log(`O primeiro nome é ${nome} e sobre nome é ${sobreNome}` );

// -----------Pratica guiada 1A------------

// import { countries } from "./countries.js";

// const paisBuscado = process.argv[2];

// if (!paisBuscado) {
//   console.log("Falta passar as informações");
// } else {
//   const resultadoDaBusca = countries.filter((pais) => {
//     return pais.name.toLowerCase().includes(paisBuscado.toLowerCase());
//   });
//   console.log(resultadoDaBusca);
// }

//------------pratica guiada 2B--------------
// import { countries } from "./countries.js";

// const paisBuscado = process.argv[2];

// if (!paisBuscado) {
//   console.log("Falta passar as informações");
// } else {
//   const resultadoDaBusca = countries.filter((pais) => {
//     return pais.name.toLowerCase().includes(paisBuscado.toLowerCase());
//   });
//   console.log(resultadoDaBusca);
// }
//------------pratica guiada 2C--------------
// import { countries } from "./countries.js";

// const name = process.argv[2]
// const code = process.argv[3]

// if(!name||!code){
//     console.log('Verifique se está pando nome ou código do Pais');
// }else{
//     const newCountry = {
//         name,
//         code
//     }
//     countries.push(newCountry)    
//         countries.sort((a, b) =>{
//             if(a.name.toLowerCase() > b.name.toLowerCase()){
//                 return 1
//             }else if (a.name.toLowerCase() < b.name.toLowerCase()) {
//                 return -1
//             } else {
//                 return 0
//             }
        
//         })    
//     console.log(countries);
// }

//exercício 

const name = process.argv[2]
const age = Number(process.argv[3])

console.log(`Seu nome é ${name} e sua idade é ${age} e daqui 7 anos você terá ${age+7}`);


