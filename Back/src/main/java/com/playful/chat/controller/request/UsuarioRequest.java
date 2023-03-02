package com.playful.chat.controller.request;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
public class UsuarioRequest {

    @NotBlank
    @Length(max = 255)
    private String nome;

    @Email
    @NotNull
    @Length(max = 255)
    private String email;

    @Length(max = 50)
    private String nickname;

    @Length(max = 512)
    private String imagemPerfil;

    @NotBlank
    @Length(max = 128)
    private String senha;
}
