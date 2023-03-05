package com.playful.chat.controller.request;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Getter
@Setter
public class UserRequest {

    @NotBlank
    @Length(max = 255)
    private String name;

    @Email
    @NotNull
    @Length(max = 255)
    private String email;

    @NotBlank
    @Length(max = 128)
    private String password;

    private String birthDate;
}
