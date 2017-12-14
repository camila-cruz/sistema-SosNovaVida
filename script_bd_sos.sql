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
    logradouro varchar(90),
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
    vara varchar(60),
    id_acolhido int not null references acolhido(id)
);

create table lista_acolhidos(
    id smallserial primary key,
    nome varchar(40) not null,
    id_acolhido int array not null, --array guarda o ID dos acolhidos que foram adicionados na lista, formato '{1,2,3}'
    --data date not null,
    --check (data >= current_date)
);

--------------DOADORES

create table doador(
    id smallserial primary key,
    nome varchar(100) not null,
    tel1 varchar(11),
    tel2 varchar(11),
    email varchar(40),
    --cep varchar(8),
    logradouro varchar(90),
    numero varchar(7),
    complemento varchar(40),
    bairro varchar(40),
    cidade varchar(40),
    uf varchar(2),
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
    quantidade int,
    descricao varchar(300),
    data date not null,
    id_doador int references doador(id),
    check (valor is not null or descricao is not null)
);

--------------ESTOQUE

create table estoque(
    id smallserial primary key,
    descricao varchar(50) not null,
    qtd int not null
);

create table movimentacao(
	id smallserial primary key,
	descricao varchar(50) not null,
    qtd int not null,
    data date not null,
    tipo varchar(7) not null,
    id_produto int not null references estoque(id),
    check (tipo = 'ENTRADA' or tipo = 'SAIDA') -- banco é case sensitive, front e back estão preparados para MAIUSCULO
);

create table lista_produtos(
    id smallserial primary key,
    nome varchar(30) not null,
    produtos varchar(50) array not null,    --array guarda o ID dos produtos  que foram adicionados na lista, formato '{abc,def,ghi}'
    qtd int array not null,         --array guarda a quantidade respectiva dos produtos adicionados na lista, formato '{1,2,3}'
    check (array_length(produtos, 1) = array_length(qtd, 1))    --checa se os arrays de produtos e quantidades são de tamanhos iguais
);



--------------USUARIO

create table usuario(
    id smallserial primary key,
    nomeusuario varchar(20) not null,
    senha varchar(20) not null,
    --foto varchar(100)
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
insert into estoque values (default, 'Feijao 1Kg', 12);
insert into estoque values (default, 'Macarrao 500g', 9);
insert into estoque values (default, 'Farinha 1Kg', 7);
insert into estoque values (default, 'Açucar 1Kg', 6);
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

select count(*) as qtd
from acolhido
where date_part('month', data_entrada) <= date_part('month', current_date)-$1
and date_part('year', data_entrada) <= date_part('year', current_date)
and date_part('month', data_saida) >= date_part('month', current_date)-$1
and date_part('year', data_saida) = date_part('year', current_date)
or date_part('month', data_entrada) <= date_part('month', current_date)=$1
and date_part('year', data_entrada) <= date_part('year', current_date)
and ativo=true;


-------------------------------------------------------------------------------------
--MASSA DE DADOS

insert into acolhido values (default, 'Maria Ferreira', '25-12-1990', 'F', '17-08-2017', '64266512732', '496856324', 'sp', null, null, null, 'AB-', 0, 957.20, null, null, null, null, null, default, false, '15-11-2017');
insert into acolhido values (default, 'Roberta Ferreira', '18-11-2010', 'F', '17-08-2017', null, '698657416', 'sp', 'Maria Ferreira', null, null, 'AB+', null, null, 'p', 'p', 'p', '29', null, 1, false, '15-11-2017');
insert into acolhido values (default, 'Miguel Batista da Silva', '15-08-2009', 'M', '18-10-2016', null, '463612589', 'sp', 'Eduarda Silva', null, null, 'O+', null, null, 'p', 'p', 'p', '29', null, default, true, null);
insert into acolhido values (default, 'Maria Eduarda Torres', '09-10-2011', 'F', '26-01-2017', null, '563258965', 'sp', 'Janaina Torres', null, 'Paracetamol', 'O+', null, null, 'p', 'm', 'm', '30', null, default, false, '18-07-2017');
insert into acolhido values (default, 'Fernando dos Santos', '11-11-2012', 'M', '14-07-2015', null, '233654785', 'sp', 'Neide dos Santos', null, null, 'AB+', null, null, 'p', 'm', 'p', '29', null, default, true, null);
insert into acolhido values (default, 'Fernanda das Neves', '15-01-2012', 'F', '25-09-2016', null, '595968632', 'sp', 'Cassia Liz das Nevez', null, null, 'A+', null, null, 'p', 'p', 'p', '27', null, default, false, '15-08-2017');
insert into acolhido values (default, 'Joao Vitor Dias da Silva', '09-09-2011', 'M', '28-08-2017', null, '436987548', 'sp', 'Telma Dias', 'Ricardo Silva', null, 'A-', null, null, 'p', 'p', 'm', '29', null, default, true, null);
insert into acolhido values (default, 'Bianca Matias de Jesus', '02-01-2013', 'F', '10-01-2017', null, '101520145', 'sp', 'Edineia de Jesus', null, null, 'AB-', null, null, 'p', 'p', 'p', '30', null, default, false, '10-08-2017');
insert into acolhido values (default, 'Camila de Lima', '01-10-2012', 'F', '02-12-2013', null, '101987548', 'sp', 'Claudia de Lima', null, 'Medicamentos com sulfa', 'O+', null, null, 'm', 'm', 'p', '30', null, default, false, '02-11-2017');
insert into acolhido values (default, 'Joana Dias da graça', '14-04-2014', 'F', '05-04-2013', null, '049658632', 'sp', null, null, null, 'O+', null, null, 'p', 'm', 'm', '29', null, default, false, '05-12-2017');
insert into acolhido values (default, 'Maria Aparecida da Silva', '14-09-1991', 'F', '14-10-2015', '61608052664', '485756322', 'sp', null, null, null, 'O-', 0, null, 'g', '48', '48', '37', null, default, false, '06-08-2017');
insert into acolhido values (default, 'Isabel da Silva', '17-04-2013', 'F', '14-10-2015', null, '498574896', 'sp', 'Maria Aparecida da Silva', 'Isaias Ferreira', null, 'O+', null, null, 'p', 'p', 'p', '29', null, 11, false, '06-08-2017');
insert into acolhido values (default, 'Pedro da Silva', '18-09-2011', 'M', '14-10-2015', null, '8996214569', 'sp', 'Maria Aparecida da Silva', null, null, 'AB+', null, null, 'p', 'p', 'p', '30', null, 11, false, '06-08-2018');
insert into acolhido values (default, 'Enzo Dias Soares', '15-08-2014', 'M', '10-10-2017', null, '159654865', 'sp', 'Dolores Dias Soares', null, null, 'O+', null, null, 'p', 'm', 'm', '30', null, default, true, null);
insert into acolhido values (default, 'Franciele da Silva Santos', '09-06-1989', 'F', '15-12-2013', '88681682946', '165987423', 'sp', null, null, null, 'O-', 1, 1002.15, 'm', '40', '38', '36', null, default, false, '17-10-2017');
insert into acolhido values (default, 'Lucas Santos', '09-09-2012', 'M', '03-03-2014', null, '465865231', 'sp', 'Franciele da Silva Santos', null, null, 'A-', null, null, 'p', 'p', 'm', '29', null, 15, false, '03-09-2017');
insert into acolhido values (default, 'Iara Ferraz Muniz', '29-01-1990', 'F', '15-12-2013', '42736726936', '465985236', 'sp', null, null, null, 'O+', 0, 960.12, 'gg', '48', '48', '39', null, default, false, '04-03-2017');
insert into acolhido values (default, 'Rafael Muniz', '30-12-2013', 'M', '15-12-2013', null, '465874569', 'sp', 'Iara Ferraz Muniz', null, null, 'B+', null, null, 'p', 'p', 'p', '26', null, 17, false, '04-03-2017');
insert into acolhido values (default, 'Pedro Dias batista', '27-08-2010', 'M', '10-10-2010', null, '965848521', 'sp', null, null, null, 'A+', null, null, 'p', 'p', 'p', '27', null, default, false, '11-01-2017');
insert into acolhido values (default, 'Maria Clara Fernandes', '26-09-2011', 'F', '15-12-2011', null, '132589654', 'sp', 'Izabele Fernandes', null, null, 'O-', null, null, 'm', 'm', 'm', '28', null, default, true, null);

insert into residencia values (default, '08666160', 'Rua Antonio Ronzella', '57', null, 'Chacaras Nova Suzano', 'Suzano', 'SP', 1);
insert into residencia values (default, '08673040', 'Rua Jose Garcia de Souza', '48', null, 'Parque Suzano', 'Suzano', 'SP', 2);
insert into residencia values (default, '08665295', 'Rua K', '15', 'fundos', 'Jardim Altos de Suzano', 'Suzano', 'SP', 4);
insert into residencia values (default, '08665305', 'Rua Maria Favoti Cusma', '300', null, 'Jardim Altos de Suzano', 'Suzano', 'SP', 6);
insert into residencia values (default, '08665260', 'Rua Mario Marques de Carvalho', '13', null, 'Jardim Altos de Suzano', 'Suzano', 'SP', 7);
insert into residencia values (default, '08673050', 'Rua Naçaes Unidas', '14', null, 'Parque Suzano', 'Suzano', 'SP', 10);
insert into residencia values (default, '08673060', 'Rua Otavio Miguel da Silva', '27', 'casa 2', 'Parque Suzano', 'Suzano', 'SP', 11);
insert into residencia values (default, '08673080', 'Rua Roberto Bianchi', '19', null, 'Parque Suzano', 'Suzano', 'SP', 14);
insert into residencia values (default, '08665290', 'Rua Sergio Ricardo Spitti', '22', null, 'Jardim Altos de Suzano', 'Suzano', 'SP', 15);
insert into residencia values (default, '08673020', 'Rua Sete de Setembro (Cidade Cruzeiro do Sul) - de 451/452 ao fim', '22', null, 'Parque Suzano', 'Suzano', 'SP', 17);
insert into residencia values (default, '08665270', 'Rua Waldemar Mesquita', '20', null, 'Jardim Altos de Suzano', 'Suzano', 'SP', 19);
insert into residencia values (default, '08665280', 'Rua Yasuo Iwo', '18', null, 'Jardim Altos de Suzano', 'Suzano', 'SP', 20);

insert into trabalho values (default, 'Posto Petrobras Nova Suzano', 'Frentista', 957.20, '08665295', 'Rua K', '97', 'fundos', 'Jardim Altos de Suzano', 'Suzano', 'SP', 1);
insert into trabalho values (default, 'Pizzaria Boa Massa', 'Balconista', 1002.15, '08673050', 'Rua Naçaes Unidas', '47', null, 'Parque Suzano', 'Suzano', 'SP', 15);
insert into trabalho values (default, 'Perfumaria Mil Aromas', 'Vendedora', 960.12, '08665270', 'Rua Waldemar Mesquita', '7', null, 'Jardim Altos de Suzano', 'Suzano', 'SP', 17);

insert into juridico values (default, '10094173420178260011', null, null, '4ª Vara Civel', 1);

insert into lista_acolhidos values (default, 'Apadrinhamento de Natal 2017', '{2,3,4,5,6,7,8,9,10,12,13,14,16,18,19,20}', current_date);

insert into usuario values (default, 'Simone', '123', null);

insert into doador values (-1, 'Desconhecido', 'xxxxxxxxx', null, null, null, null, null, null, null, null, null, true, true, true, true);
insert into doador values (default, 'Flavio Viotti', '11974859324', null, 'flavioviotti@hotmail.com', null, null, null, null, null, null, null, true, false, false, true);
insert into doador values (default, 'Roberto Reis de Santana', '11948588996', null, null, '09175360', 'Avenida Andrade Neves', '57', null, 'Vila Helena', 'Santo Andre', 'SP', false, true, false, false);
insert into doador values (default, 'Maria Neves Corvina', '1149968569', null, null, null, null, null, null, null, null, null, false, false, true, false);
insert into doador values (default, 'Claudio Aquiles da Costa', '1122726896', null, null, '09290000', 'Avenida Andre Ramalho', '38', null, 'Parque Joao Ramalho', 'Santo Andre', 'SP', false, false, false, true);
insert into doador values (default, 'Aparecida Bernadete de Soza', '11968635696', null, null, null, null, null, null, null, null, null, false, true, false, true);
insert into doador values (default, 'Clemente Aquino Silva', null, null, 'clemente,aquin0@gmail.com', '09280570', 'Avenida Antonio Cardoso', '157', null, 'Bangu', 'Santo Andre', 'SP', false, true, true, false);
insert into doador values (default, 'Gustavo Damalgio', null, null, 'gustavo.damal_gio@hotmail.com', '09531190', 'Alameda Terracota', '138', null, 'Ceramica', 'Sao Caetano do Sul', 'SP', false, false, false, true);
insert into doador values (default, 'Rebeca Soares', '11965663668', '1149856969', null, '09541155', 'Alameda Valdomiro Ferreira da Silva', '46', null, 'Santa Paula', 'Sao Caetano do Sul', 'SP', true, false, false, false);
insert into doador values (default, 'Neide Aparecida da Costa', '11965582121', null, null, null, null, null, null, null, null, null, false, true, false, false);
insert into doador values (default, 'Jose Machado de Almeida', null, null, 'jose.machalmeida@yahoo.com.br', '08625280', 'Avenida Jonas Profeta de Carvalho', '47', null, 'Jardim Itamaraca', 'Suzano', 'SP', false, false, true, false);

insert into doacao values (default, 'DINHEIRO', 10.00, null, null, '15-08-2017', -1);
insert into doacao values (default, 'DINHEIRO', 25.00, null, null, '17-11-2017', -1);
insert into doacao values (default, 'ALIMENTO', null, 12, 'Leite B 1L', '22-10-2017', 1);
insert into doacao values (default, 'ROUPA', null, 15, 'Roupas usadas de adulto - casacos', '14-11-2017', 6);
insert into doacao values (default, 'DINHEIRO', 70.00, null, null, '06-12-2017', 2);
insert into doacao values (default, 'ALIMENTO', null, 2, 'Farinha de trigo 1Kg', '04-12-2017', 4);
insert into doacao values (default, 'DINHEIRO', 30.00, null, null, '07-11-2017', -1);
insert into doacao values (default, 'DINHEIRO', 80.00, null, null, '08-09-2017', 6);
insert into doacao values (default, 'ROUPA', null, 8, 'Roupas usadas de adulto - blusa e calça femininas', '15-10-2017', 6);
insert into doacao values (default, 'DINHEIRO', 30.00, null, null, '14-11-2017', -1);
insert into doacao values (default, 'DINHEIRO', 100.00, null, null, '15-10-2017', 5);
insert into doacao values (default, 'ALIMENTO', null, 14, 'Feijao 1Kg', '18-11-2017', 7);
insert into doacao values (default, 'DINHEIRO', 80.00, null, null, '30-11-2017', -1);
insert into doacao values (default, 'ALIMENTO', null, 8, 'Bolacha agua e sal 200g', '22-11-2017', 1);
insert into doacao values (default, 'ALIMENTO', null, 1, 'Arroz 5Kg', '01-12-2017', 4);

insert into estoque values (default, 'Leite B 1L', 29);
insert into estoque values (default, 'Farinha de trigo 1Kg', 4);
insert into estoque values (default, 'Feijao 1Kg', 22);
insert into estoque values (default, 'Bolacha agua e sal 200g', 7);
insert into estoque values (default, 'Arroz 5Kg', 11);
insert into estoque values (default, 'Achocolatado 500g', 6);
insert into estoque values (default, 'Milho em lata', 14);

insert into movimentacao values (default, 'Leite B 1L', 12, '22-10-2017', 'ENTRADA', 1);
insert into movimentacao values (default, 'Farinha de trigo 1Kg', 2, '04-12-2017', 'ENTRADA', 2);
insert into movimentacao values (default, 'Feijao 1Kg', 14, '18-11-2017', 'ENTRADA', 3);
insert into movimentacao values (default, 'Bolacha agua e sal 200g', 8, '22-11-2017', 'ENTRADA', 4);
insert into movimentacao values (default, 'Arroz 5Kg', 1, '01-12-2017', 'ENTRADA', 5);
insert into movimentacao values (default, 'Leite B 1L', 5, '02-12-2017', 'SAIDA', 1);
insert into movimentacao values (default, 'Feijao 1Kg', 2, '03-12-2017', 'SAIDA', 3);
insert into movimentacao values (default, 'Arroz 5Kg', 1, '03-12-2017', 'SAIDA', 5);

insert into lista_produtos values (default, 'Necessidades Dezembro 2017', '{"Leite B 1L","Farinha de trigo 1Kg","Feijao 1Kg","Bolacha agua e sal 200g"}', '{12,5,10,15}');


