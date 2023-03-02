package com.playful.chat.model;


import com.playful.chat.security.domain.Authority;
import lombok.*;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

import static javax.persistence.GenerationType.IDENTITY;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter @EqualsAndHashCode(of = "id") @ToString(of = "id")
public class User {

    @Id
    @GeneratedValue(strategy = IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String nome;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(unique = true)
    private String nickname;

    @Column(nullable = false)
    private String senha;

    private String imagemPerfil;

    @Column(nullable = false)
    private boolean ativo;

    @OneToMany(mappedBy = "userModel", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Authority> permissoes = new ArrayList<>();

    public void adicionarPermissao(Authority authority) {
        this.permissoes.add(authority);
        authority.setUser(this);
    }
}
