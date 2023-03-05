package com.playful.chat.security.config;

import com.playful.chat.model.UserModel;
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

    public UserSecurity(UserModel userModel) {

        this.id = userModel.getId();
        this.username = userModel.getEmail();
        this.password = userModel.getPassword();

        this.accountNonExpired = userModel.isActive();
        this.accountNonLocked = userModel.isActive();
        this.credentialsNonExpired = userModel.isActive();
        this.enabled = userModel.isActive();

        this.authorities = userModel.getAuthorities().stream()
                .map(authority -> new SimpleGrantedAuthority(authority.getRoleType().getRole()))
                .collect(Collectors.toList());
    }
}
