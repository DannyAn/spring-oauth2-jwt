CREATE table perfil(
	id serial not null,
    descricao varchar(150) not null,
	CONSTRAINT pk_perfil PRIMARY KEY(id)
);

INSERT INTO perfil(descricao) VALUES ('Administrador');

CREATE TABLE usuario(
    id serial not null,
    nome varchar(150) not null,
	login varchar(150) not null,
	senha varchar(150) not null,
	perfil_id int not null,
    CONSTRAINT pk_usuario PRIMARY KEY(id),
	CONSTRAINT fk_usuario_perfil FOREIGN KEY(perfil_id)
		REFERENCES perfil(id)
);

INSERT INTO usuario(nome, login, senha, perfil_id) VALUES('Administrador', 'Administrador', '$2a$10$QAsmswjBAxAzPteYv.Qq4uVL0jFienzrbTfGC4E4tIrEId1GUwBPq', 1);