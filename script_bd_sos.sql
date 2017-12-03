create database bd_sosnovavida;

--------------ACOLHIDOS

create table acolhido(
    id smallserial primary key,
    nome varchar(100) not null,
    data_nasc date not null,
    sexo varchar(1) not null,
    data_entrada date not null,
    cid_natal varchar(40),
    uf varchar(2),
    cpf varchar(11),
    rg varchar(13),
    ssp varchar(2),
    nome_mae varchar(100),
    nome_pai varchar(100),
    alergias varchar(100),
    sangue varchar(3),
    qtd_aborto int default 0,   --pode ser nulo pra quando não for a mãe, mas o insert pode entrar como null, default, ou o número inteiro
    renda decimal(6,2),
    camiseta varchar(2),
    calca varchar(2),
    intima varchar(2),
    calcado varchar(2),
    foto varchar(100),  --string com o caminho de onde a foto ta armazenada
    id_responsavel int not null default -1,
    ativo boolean not null default true,
    data_saida date,
    check (data_nasc < current_date),
    check (data_saida > data_entrada),
    check (sexo = 'M' or sexo = 'm' or sexo = 'F' or sexo = 'f')
);

create table residencia(
    id smallserial not null,
    cep varchar(8) not null,
    logradouro varchar(40) not null,
    numero varchar(7) not null,
    complemento varchar(40) not null,
    bairro varchar(40) not null,
    cidade varchar(40) not null,
    uf varchar(2) not null,
    id_acolhido int not null references acolhido(id)
);

create table trabalho(
    id smallserial primary key,
    empresa varchar(50) not null,
    cargo varchar(20) not null,
    salario decimal(6,2) not null,
    cep varchar(8) not null,
    logradouro varchar(40) not null,
    numero varchar(7) not null,
    complemento varchar(40) not null,
    bairro varchar(40) not null,
    cidade varchar(40) not null,
    uf varchar(2) not null,
    id_acolhido int not null references acolhido(id)
);

create table juridico(
    processo varchar(20) primary key,
    comarca varchar(30) not null,
    nro_vara varchar(4) not null,
    vara varchar(30) not null,
    id_acolhido int not null references acolhido(id)
);

create table lista_acolhidos(
    id smallserial primary key,
    nome varchar(40) not null,
    id_acolhido int array not null, --array guarda o ID dos acolhidos que foram adicionados na lista, formato '{1,2,3}'
    data date not null,
    check (data >= current_date)
);

--------------DOADORES

create table doador(
    id smallserial primary key,
    nome varchar(100) not null,
    tel1 varchar(11),
    tel2 varchar(11),
    email varchar(40),
    voluntario boolean default false,
    financeiro boolean default false,
    vestuario boolean default false,
    alimenticio boolean default false,
    check (tel1 IS NOT NULL OR tel2 IS NOT NULL OR email IS NOT NULL),
    check (voluntario = true or financeiro = true or vestuario = true or alimenticio = true)
);


--------------DOAÇÕES

create table doacao(
    id smallserial primary key,
    tipo varchar(15) not null,
    valor decimal(7,2),
    descricao varchar(300),
    data date not null,
    id_doador int references doador(id),
    check (valor is not null or descricao is not null)
);

--------------ESTOQUE

create table estoque(
    id smallserial primary key,
    descricao varchar(20) not null,
    qtd int not null
);

create table movimentacao(
	id smallserial primary key,
	descricao varchar(20) not null,
    qtd int not null,
    data date not null,
    tipo varchar(7) not null,
    id_produto int not null references estoque(id),
    check (tipo = 'entrada' or tipo = 'saida')
);

create table lista_produtos(
    id smallserial primary key,
    nome varchar(30) not null,
    produtos int array not null,    --array guarda o ID dos produtos  que foram adicionados na lista, formato '{1,2,3}'
    qtd int array not null,         --array guarda a quantidade respectiva dos produtos adicionados na lista, formato '{1,2,3}'
    check (array_length(produtos, 1) = array_length(qtd, 1))    --checa se os arrays de produtos e quantidades são de tamanhos iguais
);



--------------USUARIO

create table usuario(
    id smallserial primary key,
    nomeusuario varchar(20) not null,
    senha varchar(20) not null,
    foto varchar(100) not null
);

--------------EVENTOS

/*create table evento(
    id smallserial primary key,
    descrição varchar(50) not null, --nome do evento, ex: festa de dia das crianças
    data date not null,
    observações varchar(300) --observações adicionais, como quantidade de pessoas participantes, recursos necessário, e afins
);*/






--------------INSERTS
insert into acolhido values (default, 'pafuncio', '25-12-2006', 'M', current_date, 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, null);
insert into acolhido values (default, 'Moquidésia', '17-10-2009', 'F', current_date, 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'AB+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, null);


insert into doador values (default, 'Batman', '11963656869', null, 'bat@man.com', true, true, false, false);
insert into doador values (default, 'Iron Man', '11967235458', null, null, true, true, false, false);
insert into doador values (default, 'Robin', null, null, 'robin@bat.com', true, false, false, false);
insert into doador values (default, 'Peter Parker', null, null, 'peter@spider.com', true, false, true, false);


insert into lista_produtos values (default, 'lista teste 1', '{1, 2, 5}', '{4, 4, 3}');
insert into lista_produtos values (default, 'lista teste 2', '{1, 2, 4, 7}', '{4, 7, 15, 8}');


insert into estoque values (default, 'Leite B 1L', 7);
insert into estoque values (default, 'Arroz 5Kg', 5);
insert into estoque values (default, 'Feijão 1Kg', 12);
insert into estoque values (default, 'Macarrão 500g', 9);
insert into estoque values (default, 'Farinha 1Kg', 7);
insert into estoque values (default, 'Açúcar 1Kg', 6);
insert into estoque values (default, 'Achocolatado 500g', 5);