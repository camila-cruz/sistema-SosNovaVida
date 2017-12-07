create database bd_sosnovavida;

--------------ACOLHIDOS

create table acolhido(
    id smallserial primary key,
    nome varchar(100) not null,
    data_nasc date,
    sexo varchar(1),
    data_entrada date,
    ---cid_natal varchar(40),
    --uf varchar(2),
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
    id smallserial primary key,
    cep varchar(8),
    logradouro varchar(40),
    numero varchar(7),
    complemento varchar(40),
    bairro varchar(40),
    cidade varchar(40),
    uf varchar(2),
    id_acolhido int not null references acolhido(id)
);

create table trabalho(
    id smallserial primary key,
    empresa varchar(50),
    cargo varchar(20),
    salario decimal(6,2),
    cep varchar(8),
    logradouro varchar(40),
    numero varchar(7),
    complemento varchar(40),
    bairro varchar(40),
    cidade varchar(40),
    uf varchar(2),
    id_acolhido int not null references acolhido(id)
);

create table juridico(
    id smallserial primary key,
    processo varchar(20),
    comarca varchar(30),
    nro_vara varchar(4),
    vara varchar(30),
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

insert into doador (id, nome, tel1, voluntario, financeiro, alimenticio, vestuario) values ( '-1', 'Desconhecido', 'Desconhecido', true, true, true, true );


--------------DOAÇÕES

create table doacao(
    id smallserial primary key,
    tipo varchar(15) not null,
    valor decimal(7,2),
    quantidade int,
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
    check (tipo = 'ENTRADA' or tipo = 'SAIDA') -- banco é case sensitive, front e back estão preparados para MAIUSCULO
);

create table lista_produtos(
    id smallserial primary key,
    nome varchar(30) not null,
    produtos varchar(30) array not null,    --array guarda o ID dos produtos  que foram adicionados na lista, formato '{abc,def,ghi}'
    qtd int array not null,         --array guarda a quantidade respectiva dos produtos adicionados na lista, formato '{1,2,3}'
    check (array_length(produtos, 1) = array_length(qtd, 1))    --checa se os arrays de produtos e quantidades são de tamanhos iguais
);



--------------USUARIO

create table usuario(
    id smallserial primary key,
    nomeusuario varchar(20) not null,
    senha varchar(20) not null,
    foto varchar(100)
);

--------------EVENTOS

/*create table evento(
    id smallserial primary key,
    descrição varchar(50) not null, --nome do evento, ex: festa de dia das crianças
    data date not null,
    observações varchar(300) --observações adicionais, como quantidade de pessoas participantes, recursos necessário, e afins
);*/






--------------INSERTS
/*insert into acolhido values (default, 'Pafuncio', '25-12-2006', 'M', '21-10-2017', 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '15-11-2017');
insert into acolhido values (default, 'Moquidesia', '17-10-2009', 'F', '22-08-2017', 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'AB+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '19-11-2017');
insert into acolhido values (default, 'Clementino', '7-12-2011', 'M', '23-05-2017', 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '04-08-2017');
insert into acolhido values (default, 'Epitafio', '17-5-2014', 'M', '22-06-2016', 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '27-12-2016');
insert into acolhido values (default, 'Robervaldo', '12-9-2013', 'M', '17-11-2016', 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '01-11-2017');
insert into acolhido values (default, 'Acheropita', '14-11-2015', 'F', '29-08-2016', 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '15-08-2017');
insert into acolhido values (default, 'Aleteia', '4-9-2014', 'F', '02-12-2017', 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '03-12-2017');
insert into acolhido values (default, 'Valdomiro', '9-11-2014', 'M', '15-11-2017', 'santo andre', 'sp', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '22-11-2017');*/

insert into acolhido values (default, 'Pafuncio', '25-12-2006', 'M', '21-10-2017', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '15-11-2017');
insert into acolhido values (default, 'Moquidesia', '17-10-2009', 'F', '22-08-2017', null, '436587456', 'sp', null, null, null, 'AB+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '19-11-2017');
insert into acolhido values (default, 'Clementino', '7-12-2011', 'M', '23-05-2017', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '04-08-2017');
insert into acolhido values (default, 'Epitafio', '17-5-2014', 'M', '22-06-2016', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '27-12-2016');
insert into acolhido values (default, 'Robervaldo', '12-9-2013', 'M', '17-11-2016', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '01-11-2017');
insert into acolhido values (default, 'Acheropita', '14-11-2015', 'F', '29-08-2016', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '15-08-2017');
insert into acolhido values (default, 'Aleteia', '4-9-2014', 'F', '02-12-2017', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '03-12-2017');
insert into acolhido values (default, 'Valdomiro', '9-11-2014', 'M', '15-11-2017', null, '436587456', 'sp', null, null, null, 'O+', null, 1093.20, 'p', 'p', 'p', '26', null, default, default, '22-11-2017');

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


insert into usuario values (default, 'buda', '123', null);

----------------------------------------------------------------
/*
quantidade de acolhidos do mês anterior:
conta se
mes e ano de saida é >= mês passado do ano atual
e se
mes e ano de entrada é <= mes passado do ano atual

*/

select count(*) as qtd
from acolhido
where date_part('month', data_entrada) <= date_part('month', current_date)-0
and date_part('year', data_entrada) <= date_part('year', current_date)
and date_part('month', data_saida) >= date_part('month', current_date)-0
and date_part('year', data_saida) = date_part('year', current_date);

select count(*)
from acolhido
where date_part('month', data_entrada) <= date_part('month', current_date)
and date_part('year', data_entrada) <= date_part('year', current_date)
and date_part('month', data_saida) >= date_part('month', current_date)
and date_part('year', data_saida) = date_part('year', current_date);