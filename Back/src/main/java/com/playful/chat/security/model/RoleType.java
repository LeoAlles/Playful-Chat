package com.playful.chat.security.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum RoleType {

    USUARIO(Nomes.USUARIO),
    ADMIN(Nomes.ADMIN);

    public static class Nomes {
        public static final String USUARIO = "ROLE_USUARIO";
        public static final String ADMIN = "ROLE_ADMIN";
    }

    private final String role;
}
