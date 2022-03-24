
# Report Manager API

API Rest para gerenciamento de relatórios.


## Installation

Entre na pasta do projeto e instale as dependências

```bash
  cd my-project
  npm install
```
Para realizar a conexão com o banco de dados, crie um arquivo `.env`

`DATABASE_URL="mysql://root:admin@localhost:3306/report-manager-api"`

O banco de dados roda em um container do docker, então execute

```bash
  docker run --name report-manager-api -d -p 3306:3306 -e MYSQL_ROOT_PASSWORD=admin -e MYSQL_DATABASE=report-manager-api -e MYSQL_USER=admin -e MYSQL_PASSWORD=admin mysql:latest 
```

    
## API Reference

#### 1. Stock Policy Service

#### Create

```http
  POST /api/stockPolicies
```

| Parameter  | Type     | Description     | Localization
| :--------  | :------- | :---------------| :-----------
| `critical` | `number` | **Required**.  | Body
| `good`     | `number` | **Required**.      | Body
| `excellent` | `number` | **Required**. | Body

#### Get One

```http
  GET /api/stockPolicies
```

#### Update

```http
  PUT /api/stockPolicies/${id}
```

| Parameter | Type     | Description     | Localization
| :-------- | :------- | :---------------| :-----------
| `critical` | `number` | **Optional**.  |  Body       |
| `good` | `number` | **Optional**.      |  Body       |
| `excellent` | `number` | **Optional**. |  Body       |
| `id`        |  `string` | **Required** |  Param      |

#### Delete

```http
  DELETE /api/stockPolicies/${id}
```
| Parameter | Type     | Description     | Localization
| :-------- | :------- | :---------------| :-----------
| `id`        |  `string` | **Required** |  Param      |

#### 2. Reports Service

#### Create 

```http
  POST /api/reports
```

| Parameter | Type     | Description     | Localization
| :-------- | :------- | :---------------| :-----------
| `file` | `file` | **Required**. Extension .csv  | Multipart Form

#### Get One

```http
  GET /api/reports/${id}
```
| Parameter | Type     | Description     | Localization
| :-------- | :------- | :---------------| :-----------
| `id`        |  `string` | **Required** |  Param      |

#### Update

```http
  PUT /api/reports/${id}
```

| Parameter | Type     | Description     | Localization
| :-------- | :------- | :---------------| :-----------
| `date` | `string` | **Optional**.  |  Body       |
| `open` | `number`     | **Optional**.      |  Body       |
| `high` | `number` | **Optional**. |  Body       |
| `low` | `number` | **Optional**.  |  Body       |
| `close` | `number`     | **Optional**.      |  Body       |
| `volume` | `number` | **Optional**. |  Body       |
| `id`        |  `string` | **Required** |  Param      |

#### Delete

```http
  DELETE /api/reports/${id}
```
| Parameter | Type     | Description     | Localization
| :-------- | :------- | :---------------| :-----------
| `id`        |  `string` | **Required** |  Param      |
## Tech Stack

**Client:** React

**Server:** NestJS, NodeJS


## Features

- Upload file .csv
- CRUD reports
- CRUD stock policies

