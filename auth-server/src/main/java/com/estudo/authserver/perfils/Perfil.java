package com.estudo.authserver.perfils;

import com.estudo.authserver.configuration.CloneObject;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Perfil implements CloneObject<Perfil> {

    @Getter
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Getter
    @Setter
    private String descricao;

    @Override
    public Perfil clone() {
        return new Perfil(this.id, this.descricao);
    }
}
