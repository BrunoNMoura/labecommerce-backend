// Criar um repositório
// Clonar o repositório
// Criar uma nova branch para cada nova alteração (git checkout -b "nome-da-branch")
// Criar um package.json (npm init -y)
// Instalar o @type/node e o typescript como devDependencies (npm i @type/node -D e npm i typescript -D )
// Criar a pasta raiz (src) onde vai ficar os arquivos typescript (.ts)
// Criar a pasta (build) onde vai ficar os arquivos transpilados em javascript (.js)
// Criar o tsconfig.json (npx tsc --init)
// Mudar os scripts necessários para rodar o código pelo script (no package.json)
// Fazer o código
// Criar um arquivo para tipagem (types.ts) (qual padrão/tipo que será usado em cada variável)
// Lembrar de exportar quando quiser utiliza-la em outro local/arquivo (export const/type ...)
// Lembrar de importar NO arquivo que será utilizado o arquivo à ser exportado (import {nomeDoArquivo} ./directorio)

import { getAllProducts, getAllUsers, products, searchProduct, searchUser, users } from "./database";

console.table(users);
console.table(products);
console.table(searchUser(users,"fulano"));
console.table(searchProduct(products,"monitor"));
console.table(getAllUsers)
console.table(getAllProducts)
