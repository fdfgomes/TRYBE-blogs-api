# blogs-api

> _Projeto desenvolvido durante o módulo de back-end do curso de desenvolvimento web da [Trybe](https://www.betrybe.com/)._

O objetivo deste projeto foi construir uma API, seguindo os princípios _REST_ e o padrão arquitetural _MSC_ _(models, views e controllers)_, para gerenciar um blog.

## Tecnologias utilizadas

- Docker <img src="https://skillicons.dev/icons?i=docker" height="19em" />;
- Banco de dados _MySQL_ <img src="https://skillicons.dev/icons?i=mysql" height="19em" />;
- _Node.js_ <img src="https://skillicons.dev/icons?i=nodejs" height="19em" />, com o _framework_ _Express.js_ <img src="https://skillicons.dev/icons?i=express" height="19em" />;
- _ORM Sequelize_ <img src="https://skillicons.dev/icons?i=sequelize" height="19em" />.

<!-- desenvolvida em Node.js utilizando o _framework_ `Express.js` e o _ORM_ `Sequelize`, seguindo o padrão arquitetural _MSC_ _(models, views e controllers)_. -->

## Rotas criadas

### **POST** _`/user`_

- Utilizada para registrar nova pessoa usuária no banco de dados.

- Recebe 4 propriedades, sendo **3 obrigatórias\*** e 1 opcional:

  - `displayName*` - nome da pessoa usuária;

    - _**Obs.:** Deve conter no mínimo 8 caracteres._

  - `email*` - email da pessoa usuária;

  - `password*` - senha da pessoa usuária;

    - _**Obs.:** Deve conter no mínimo 6 caracteres._

  - `image` - endereço da imagem de perfil da pessoa usuária.

> _* As propriedades com * após seus nomes são obrigatórias_.

#### Exemplos de requisições válidas:

#### **Sem** a propriedade opcional `image`

```json
{
  "displayName": "Robert B. Banner",
  "email": "bruce@avengers.com",
  "password": "strongest avenger"
}
```

#### **Com** a propriedade opcional `image`

```json
{
  "displayName": "Robert B. Banner",
  "email": "bruce@avengers.com",
  "password": "strongest avenger",
  "image": "https://pbs.twimg.com/media/DHRXqzuXoAAVq1b.jpg"
}
```

#### Resposta

#### Caso todas as propriedades recebidas contenham dados válidos

- Código HTTP: `201 - Created`;
- Body (exemplo):

  ```json
  {
    "token": "eyJhbGci..."
  }
  ```

<details>
  <summary>
    <strong>Caso a propriedade <code>displayName</code> <strong>não</strong> seja informada ou contenha <strong>menos</strong> de 8 caracteres</strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "\"displayName\" length must be at least 8 characters long"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso a propriedade <code>email</code> <strong>não</strong> seja informada ou contenha contenha um endereço de email <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "\"email\" must be a valid email"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso a propriedade <code>password</code> <strong>não</strong> seja informada ou contenha <strong>menos</strong> de 6 caracteres</strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "\"password\" length must be at least 6 characters long"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o email informado já tenha sido utilizado para registrar outra pessoa usuária</strong>
  </summary>

- Código HTTP: `409 - Conflict`;
- Body:

  ```json
  {
    "message": "User already registered"
  }
  ```

    <br />
  </details>

##

### **POST** _`/login`_

- Utilizada para autenticar uma pessoa usuária.

- Recebe **2 propriedades obrigatórias\***:

  - `email*` - email da pessoa usuária;

  - `password*` - senha da pessoa usuária.

> _* As propriedades com * após seus nomes são obrigatórias_.

#### Exemplo de requisição válida:

```json
{
  "email": "bruce@avengers.com",
  "password": "strongest avenger"
}
```

#### Resposta

#### Caso as propriedades recebidas contenham dados válidos

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  {
    "token": "eyJhbGci..."
  }
  ```

<details>
  <summary>
    <strong>Caso uma ou ambas as propriedades obrigatórias <strong>não</strong> sejam informadas</strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "Some required fields are missing"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o email ou senha informados sejam <strong>inválidos</strong></strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "Invalid fields"
  }
  ```

    <br />
  </details>

##

### **GET** _`/user`_

- Utilizada para retornar todas as pessoas usuárias cadastradas no banco de dados.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
GET /user

Authorization: eyJhbGci...
```

#### Resposta

#### Caso o cabeçalho da requisição contenha um token de autorização válido

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  [
    {
      "id": 1,
      "displayName": "Steven G. Rogers",
      "email": "steve@avengers.com",
      "image": "https://static.wikia.nocookie.net/universo-marvel-616/images/a/af/Steve_Rogers.jpg/revision/latest?cb=20140308230046&path-prefix=pt-br"
    },
    {
      "id": 2,
      "displayName": "Anthony E. Stark",
      "email": "tony@avengers.com",
      "image": "https://cdn.shopify.com/s/files/1/0513/5692/6151/files/oculos-tony-stark-vingadores-edith-loja-da-ciencia-9_480x480.png?v=1616287934"
    },
    ...
  ]
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

##

### **GET** _`/user/:id`_

- Utilizada para retornar os dados da pessoa usuária informada.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
GET /user/3

Authorization: eyJhbGci...
```

#### Resposta

#### Caso o token de autorização e id utilizados na requisição sejam válidos

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  {
    "id": 3,
    "displayName": "Robert B. Banner",
    "email": "bruce@avengers.com",
    "image": "https://pbs.twimg.com/media/DHRXqzuXoAAVq1b.jpg"
  }
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém o id informado seja <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `404 - Not Found`;
- Body:

  ```json
  {
    "message": "User does not exist"
  }
  ```

    <br />
  </details>

##

### **DELETE** _`/user/:id`_

- Utilizada para remover os dados da pessoa usuária informada do banco de dados.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
DELETE /user/me

Authorization: eyJhbGci...
```

#### Resposta

#### Caso o cabeçalho da requisição contenha um token de autorização <strong>válido</strong>

- Código HTTP: `204 - No Content`;

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

##

### **POST** _`/categories`_

- Utilizada para registrar uma nova categoria de post no banco de dados.

- Recebe <strong>1 propriedade obrigatória\*</strong>:

  - `name*` - contém o nome da nova categoria a ser registrada no banco de dados.

> _* As propriedades com * após seus nomes são obrigatórias_.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
POST /categories

Authorization: eyJhbGci...
```

```json
{
  "name": "Typescript"
}
```

#### Resposta

#### Caso o token de autorização e a propriedade recebida na requisição sejam válidos

- Código HTTP: `201 - Created`;
- Body (exemplo):

  ```json
  {
    "id": 3,
    "name": "Typescript"
  }
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém a propriedade obrigatória <strong>não</strong> seja informada</strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "\"name\" is required"
  }
  ```

    <br />
  </details>

##

### **GET** _`/categories`_

- Utilizada para retornar todas as categorias de post cadastradas no banco de dados.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
GET /categories

Authorization: eyJhbGci...
```

#### Resposta

#### Caso o cabeçalho da requisição contenha um token de autorização válido

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  [
    {
      "id": 1,
      "name": "Inovação"
    },
    {
      "id": 2,
      "name": "Escola"
    },
    {
      "id": 3,
      "name": "Typescript"
    },
    ...
  ]
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

##

### **POST** _`/post`_

- Utilizada para registrar um novo post no banco de dados.

- Recebe <strong>3 propriedades obrigatórias\*</strong>:

  - `title*` - título do novo post;

  - `content*` - conteúdo _(texto)_ do novo post;

  - `categoryIds*` - lista _(array)_ com <strong>um</strong> ou <strong>mais</strong> ids de categoria <strong>válidos</strong>.

    - <i><strong>Obs.:</strong> Os ids de categoria válidos são retornados pelo endpoint <code><i>GET</i> /categories</code></i>.

> _* As propriedades com * após seus nomes são obrigatórias_.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
POST /post

Authorization: eyJhbGci...
```

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key",
  "categoryIds": [1, 2, 3]
}
```

#### Resposta

#### Caso o token de autorização e as propriedades recebidas na requisição sejam válidos

- Código HTTP: `201 - Created`;
- Body (exemplo):

  ```json
  {
    "id": 1,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "updated": "2023-05-25T12:13:23.293Z",
    "published": "2023-05-25T12:13:23.293Z"
  }
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém as propriedades <code>title</code> e/ou <code>content</code> <strong>não</strong> sejam informadas</strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "Some required fields are missing"
  }
  ```

      <br />

  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém a propriedade <code>categoryIds</code> <strong>não</strong> seja informada ou contenha algum id de categoria <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "one or more \"categoryIds\" not found"
  }
  ```

    <br />
  </details>

##

### **GET** _`/post`_

- Utilizada para retornar todos os posts existentes no banco de dados.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
GET /post

Authorization: eyJhbGci...
```

#### Resposta

#### Caso o cabeçalho da requisição contenha um token de autorização válido

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  [
    {
      "id": 1,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2023-05-25T12:13:23.293Z",
      "updated": "2023-05-25T12:13:23.293Z",
      "user": {
        "id": 1,
        "displayName": "Steven G. Rogers",
        "email": "steve@avengers.com",
        "image": "https://static.wikia.nocookie.net/universo-marvel-616/images/a/af/Steve_Rogers.jpg/revision/latest?cb=20140308230046&path-prefix=pt-br"
      },
      "categories": [
          {
            "id": 1,
            "name": "Inovação"
          },
          {
            "id": 2,
            "name": "Escola"
          },
          {
            "id": 3,
            "name": "Typescript"
          },
      ]
    },
    ...
  ]
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

##

### **GET** _`/post/:id`_

- Utilizada para retornar os dados do post informado.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
GET /post/1

Authorization: eyJhbGci...
```

#### Resposta

#### Caso o token de autorização e id utilizados na requisição sejam válidos

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  {
    "id": 1,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "published": "2023-05-25T12:13:23.293Z",
    "updated": "2023-05-25T12:13:23.293Z",
    "user": {
      "id": 1,
      "displayName": "Steven G. Rogers",
      "email": "steve@avengers.com",
      "image": "https://static.wikia.nocookie.net/universo-marvel-616/images/a/af/Steve_Rogers.jpg/revision/latest?cb=20140308230046&path-prefix=pt-br"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      },
      {
        "id": 2,
        "name": "Escola"
      },
      {
        "id": 3,
        "name": "Typescript"
      }
    ]
  }
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém o id informado seja <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `404 - Not Found`;
- Body:

  ```json
  {
    "message": "Post does not exist"
  }
  ```

    <br />
  </details>

##

### **PUT** _`/post/:id`_

- Utilizada para atualizar os dados de um post existente no banco de dados.

  - _<strong>Obs.:</strong> A lista de posts existentes no banco de dados pode ser obtida através do <i>endpoint</i> <code>GET /post_</code>.

- Recebe <strong>2 propriedades obrigatórias\*</strong>:

  - `title*` - título atualizado do post;

    - _<strong>Obs.:</strong> Caso não hajam alterações neste campo, preencher com o título atual do post._

  - `content*` - conteúdo _(texto)_ atualizado do post.

    - _<strong>Obs.:</strong> Caso não hajam alterações neste campo, preencher com o conteúdo atual do post._

> _* As propriedades com * após seus nomes são obrigatórias_.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
PUT /post/1

Authorization: eyJhbGci...
```

```json
{
  "title": "Latest updates, August 1st",
  "content": "The whole text for the blog post goes here in this key"
}
```

#### Resposta

#### Caso o token de autorização e as propriedades recebidas na requisição sejam válidos

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  {
    "id": 1,
    "title": "Latest updates, August 1st",
    "content": "The whole text for the blog post goes here in this key",
    "userId": 1,
    "published": "2023-05-25T12:13:23.293Z",
    "updated": "2023-05-25T12:13:23.293Z",
    "user": {
      "id": 1,
      "displayName": "Steven G. Rogers",
      "email": "steve@avengers.com",
      "image": "https://static.wikia.nocookie.net/universo-marvel-616/images/a/af/Steve_Rogers.jpg/revision/latest?cb=20140308230046&path-prefix=pt-br"
    },
    "categories": [
      {
        "id": 1,
        "name": "Inovação"
      },
      {
        "id": 2,
        "name": "Escola"
      },
      {
        "id": 3,
        "name": "Typescript"
      }
    ]
  }
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém o post informado <strong>não</strong> seja de autoria da pessoa usuária presente no token</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Unauthorized user"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém as propriedades <code>title</code> e/ou <code>content</code> <strong>não</strong> sejam informadas</strong>
  </summary>

- Código HTTP: `400 - Bad Request`;
- Body:

  ```json
  {
    "message": "Some required fields are missing"
  }
  ```

    <br />
  </details>

##

### **DELETE** _`/post/:id`_

- Utilizada para apagar um post do banco de dados.

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplo de requisição válida:

```
DELETE /post/1

Authorization: eyJhbGci...
```

#### Resposta

#### Caso o token de autorização e id recebidos na requisição sejam válidos

- Código HTTP: `204 - No Content`;

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém o id <i>(post)</i> informado seja <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `404 - Not Found`;
- Body:

  ```json
  {
    "message": "Post does not exist"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização válido, porém o post informado <strong>não</strong> seja de autoria da pessoa usuária presente no token</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Unauthorized user"
  }
  ```

    <br />
  </details>

##

### **GET** _`/post/search`_

- Utilizada para retornar todos os posts existentes no banco de dados que atendam ao critério de pesquisa informado na requisição.

- Recebe 1 propriedade opcional:

  - `q` - termo utilizado para realizar a busca entre os posts registrados no banco de dados.

    - _**Obs.:** A busca pelo termo informado é realizada no título e conteúdo dos posts registrados no banco de dados_.

> _Caso a propriedade opcional `q` **não** seja informada são retornados todos os posts registrados no banco de dados._

- Requer um token de autorização válido no cabeçalho da requisição.

  - <i>**Obs.:** Um token de autorização válido é gerado ao realizar o registro (<code><i>POST</i> /user</code>) ou login (<code><i>POST</i> /login</code>) de uma pessoa usuária.</i>

#### Exemplos de requisições válidas:

```
GET /post/search

Authorization: eyJhbGci...
```

```
GET /post/search?q=latest

Authorization: eyJhbGci...
```

#### Resposta

#### Caso o cabeçalho da requisição contenha um token de autorização válido e o critério de pesquisa não seja informado

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  [
    {
      "id": 1,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2023-05-25T12:13:23.293Z",
      "updated": "2023-05-25T12:13:23.293Z",
      "user": {
        "id": 1,
        "displayName": "Steven G. Rogers",
        "email": "steve@avengers.com",
        "image": "https://static.wikia.nocookie.net/universo-marvel-616/images/a/af/Steve_Rogers.jpg/revision/latest?cb=20140308230046&path-prefix=pt-br"
      },
      "categories": [
          {
            "id": 1,
            "name": "Inovação"
          },
          {
            "id": 2,
            "name": "Escola"
          },
          {
            "id": 3,
            "name": "Typescript"
          },
      ]
    },
    ...
  ]
  ```

#### Caso o cabeçalho da requisição contenha um token de autorização válido e um ou mais posts atendam ao critério de pesquisa informado

- Código HTTP: `200 - OK`;
- Body (exemplo):

  ```json
  [
    {
      "id": 1,
      "title": "Latest updates, August 1st",
      "content": "The whole text for the blog post goes here in this key",
      "userId": 1,
      "published": "2023-05-25T12:13:23.293Z",
      "updated": "2023-05-25T12:13:23.293Z",
      "user": {
        "id": 1,
        "displayName": "Steven G. Rogers",
        "email": "steve@avengers.com",
        "image": "https://static.wikia.nocookie.net/universo-marvel-616/images/a/af/Steve_Rogers.jpg/revision/latest?cb=20140308230046&path-prefix=pt-br"
      },
      "categories": [
          {
            "id": 1,
            "name": "Inovação"
          },
          {
            "id": 2,
            "name": "Escola"
          },
          {
            "id": 3,
            "name": "Typescript"
          },
      ]
    },
    ...
  ]
  ```

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição <strong>não</strong> contenha um token de autorização</strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Token not found"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>inválido</strong></strong>
  </summary>

- Código HTTP: `401 - Unauthorized`;
- Body:

  ```json
  {
    "message": "Expired or invalid token"
  }
  ```

    <br />
  </details>

<details>
  <summary>
    <strong>Caso o cabeçalho da requisição contenha um token de autorização <strong>válido</strong>, porém nenhum post atenda ao critério informado</strong>
  </summary>

- Código HTTP: `200 - OK`;
- Body:

  ```json
  []
  ```

    <br />
  </details>

<br />

# Rodando o projeto localmente

#### Clone o repositório e inicialize os containers do projeto:

```
git clone git@github.com:fdfgomes/TRYBE-blogs-api.git
cd TRYBE-blogs-api
docker-compose up -d
```

#### Acesse o container da API e instale as dependências do projeto:

```
docker exec -it blogs_api bash
npm install
```

#### Execute os comandos do _Sequelize_ para criar e popular o banco de dados:

> _**Obs.:** Como no passo anterior, é necessário executar os comandos a seguir dentro do container da API._

```
npx sequelize-cli db:create
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

#### Para inicializar o servidor de desenvolvimento utilize o comando:

> _**Obs.:** Como no passo anterior, é necessário executar o comando a seguir dentro do container da API._

```
npm run dev
```
