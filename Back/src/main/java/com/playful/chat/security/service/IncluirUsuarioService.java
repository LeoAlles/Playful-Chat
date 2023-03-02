package com.playful.chat.security.service;


import com.playful.chat.controller.request.UsuarioRequest;
import com.playful.chat.controller.response.UsuarioResponse;
import com.playful.chat.model.User;
import com.playful.chat.repository.SystemUserRepository;
import com.playful.chat.security.domain.Authority;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


import static com.playful.chat.mapper.UsuarioMapper.toEntity;
import static com.playful.chat.mapper.UsuarioMapper.toResponse;
import static com.playful.chat.security.domain.RoleType.USUARIO;
import static org.springframework.http.HttpStatus.BAD_REQUEST;

@Service
public class IncluirUsuarioService {

    @Autowired
    private SystemUserRepository systemUserRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioResponse incluir(UsuarioRequest request) {

        if(systemUserRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(BAD_REQUEST, "Esse email não está disponível.");
        }

        User user = toEntity(request);
        user.setSenha(getSenhaCriptografada(request.getSenha()));
        user.adicionarPermissao(getPermissaoPadrao());
        user.setAtivo(true);

        systemUserRepository.save(user);

        return toResponse(user);
    }

    private String getSenhaCriptografada(String senhaAberta) {
        return passwordEncoder.encode(senhaAberta);
    }

    private Authority getPermissaoPadrao() {
        Authority authority = new Authority();
        authority.setRoleType(USUARIO);
        return authority;
    }
}
