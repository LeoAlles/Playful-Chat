package com.playful.chat.security.config;

import com.playful.chat.model.User;
import lombok.Getter;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;
import java.util.stream.Collectors;

@Getter
public class UserSecurity implements UserDetails {

    private final Long id;
    private final String username;
    private final String password;
    private final List<SimpleGrantedAuthority> authorities;

    private final boolean accountNonExpired;
    private final boolean accountNonLocked;
    private final boolean credentialsNonExpired;
    private final boolean enabled;

    public UserSecurity(User user) {

        this.id = user.getId();
        this.username = user.getEmail();
        this.password = user.getSenha();

        this.accountNonExpired = user.isAtivo();
        this.accountNonLocked = user.isAtivo();
        this.credentialsNonExpired = user.isAtivo();
        this.enabled = user.isAtivo();

        this.authorities = user.getPermissoes().stream()
                .map(permissao -> new SimpleGrantedAuthority(permissao.getRoleType().getRole()))
                .collect(Collectors.toList());
    }
}
