-- Active: 1687387546215@@127.0.0.1@3306

CREATE TABLE
    users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        createdAt TEXT NOT NULL
    );

INSERT INTO
    users (
        id,
        name,
        email,
        password,
        createdAt
    )
VALUES (
        "u001",
        "Beltrana",
        "beltrana@email.com",
        "beltrana00",
        "2023-06-20T18:19:17.823Z"
    ), (
        "u002",
        "Fulano",
        "fulano@email.com",
        "fulano123",
        "2023-06-20T19:12:17.823Z"
    ), (
        "u003",
        "Astrodev",
        "astrodev@email.com",
        "astRodev99@",
        "2023-06-20T19:07:39.358Z"
    );

SELECT * FROM users;

DROP TABLE users;

CREATE TABLE
    products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        imageUrl TEXT NOT NULL
    );

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        imageUrl
    )
VALUES (
        "p001",
        "mandarim",
        350,
        "membro da família Callionymidae ou Dragonet e são peixes difíceis de manter devido às suas necessidades de alimentação.",
        "https://topbiologia.com/wp-content/uploads/2014/07/peixe-mandarim-1.jpg"
    ), (
        "p002",
        "peixe palhaço",
        50,
        "são animais de água salgada, oriundos do Pacífico e apresentam tons que variam entre o preto, laranja, amarelo e vermelho",
        "https://www.petz.com.br/blog/wp-content/uploads/2022/08/peixe-palhaco-e-anemona-final-1280x720.jpg"
    ), (
        "p003",
        "Blue Tang",
        500,
        "É o peixe que recebeu o nome de Dori no filme ‘Procurando Nemo'. Membros desta espécie podem viver sozinhos, em pares ou em pequenos grupos de dez a doze indivíduos.",
        "https://www.universodoaquario.com.br/image/cache/catalog/peixes/peixes-agua-salgada/peixes-hepatus-blue-tang-p-500x500.jpg"
    ), (
        "p004",
        "FOX FACE",
        800,
        "Este peixe tem a capacidade de mimetização, mudando de cor e tornando-se marron castanho ou oliva com grandes manchas mais escuras para se parecer com as rochas do aquário quando dorme ou quando está estressado",
        "https://www.universodoaquario.com.br/image/cache/catalog/peixes/peixes-agua-salgada/fox-face-medio-500x500.jpg"
    ), (
        "p005",
        "YELLOW TANG",
        2000,
        "é uma espécie de peixe da família Acanthuridae e muito popular entre os aquaristas. É originário do Havaí e alimenta-se de algas, artêmia e flocos.O cirurgião-amarelo tem um ferrão na cauda para sua defesa",
        "https://www.universodoaquario.com.br/image/cache/catalog/peixes/peixes-agua-salgada/peixes-yellow-tang-m-500x500.jpg"
    );

SELECT * FROM products;

DROP TABLE products;

UPDATE products
SET
    name = "MANDARIN GREEN AND BLUE"
WHERE id = "p001";

SELECT * FROM products WHERE name LIKE '%tang%';

INSERT INTO users (id,
        name,
        email,
        password,
        createdAt
    )
VALUES ("u004","Ciclano", "ciclano@email.com","ciclano123456", "2023-06-21T19:07:39.259Z");

INSERT INTO
    products (
        id,
        name,
        price,
        description,
        imageUrl
    )
VALUES (
        "p006",
        "TUBARÃO BANDED",
        2200,
        "Enquanto a maioria dos tubarões é grande demais para um aquário doméstico, o tubarão de bambu é uma exceção à regra. Com cerca de 41 polegadas de comprimento, pode ser mantido em um grande tanque de 180 galões junto com outros peixes compatíveis, e muitas vezes se dá bem em cativeiro.",
        "https://www.universodoaquario.com.br/image/cache/catalog/Tubar%C3%A3o%20Banded-500x500.png"
    );

    DELETE FROM users
    WHERE id = 'u004';

    DELETE FROM products
    WHERE id = 'p006';

    UPDATE products
    SET name = "TUBARÃO BAMBU", price = 2500, description = "Os únicos desafios reais em manter esses tubarões estão relacionados à alimentação e aos problemas de saúde: você pode precisar 'orientar a alimentação' do seu tubarão para ter certeza de que ele come adequadamente e fornecer os medicamentos necessários para manter sua saúde. ", "imageUrl" = "https://media-cdn.tripadvisor.com/media/photo-s/0d/e6/6c/6e/tubarao-bambu.jpg"
    WHERE id = 'p006'