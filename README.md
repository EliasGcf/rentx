# RentX

## Cadastro de carro

### Requisitos funcionais (RF)

- [] Deve ser possível cadastrar um carro;

### Regras de negócio (RN)

- [] Não deve ser possível cadastrar um carro com uma placa já existente;
- [] Não deve ser possível alterar a placa de um carro já cadastrado;
- [] O carro deve ser cadastrado com disponibilidade por padrão;
- [] O usuário responsável pelo cadastro deve ser um administrador;

## Listagem de carros

### Requisitos funcionais (RF)

- [] Deve ser possível listar todos os carros disponíveis;
- [] Deve ser possível listar todas as categoriais;
- [] Deve ser possível listar os carros pelo nome da categoria;
- [] Deve ser possível listar os carros pelo nome da marca;
- [] Deve ser possível listar os carros pelo nome do carro;

### Regras de negócio (RN)

- [] O usuário não precisa estar logado;

## Cadastro de especificações no carro

### Requisitos funcionais (RF)

- [] Deve ser possível cadastrar uma especificação para um carro;
- [] Deve ser possível listar todas as especificações;
- [] Deve ser possível listar todos os carros;

### Regras de negócio (RN)

- [] Não deve ser possível cadastrar uma especificação para um carro inexistente;
- [] Não deve ser possível cadastrar já existente para o mesmo carro;
- [] O usuário responsável pelo cadastro deve ser um administrador;

## Cadastro de imagens do carro

### Requisitos funcionais (RF)

- [] Deve ser possível cadastrar a imagem do carro;
- [] Deve ser possível listar todos os carros;

### Requisitos não funcionais funcionais (RNF)

- [] Utilizar o multer para upload dos arquivos;

### Regras de negócio (RN)

- [] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
- [] O usuário responsável pelo cadastro deve ser um administrador;

## Aluguel de carro

### Requisitos funcionais (RF)

- [] Deve ser possível cadastrar um aluguel

### Regras de negócio (RN)

- [] O aluguel deve ter duração minima de 24 horas;
- [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário;
- [] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro;

## Todo

- [] Criar generators para os tests
