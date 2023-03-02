package com.playful.chat.controller;


import com.playful.chat.controller.request.UsuarioRequest;
import com.playful.chat.controller.response.UsuarioResponse;
import com.playful.chat.security.service.IncluirUsuarioService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

    @Autowired
    private IncluirUsuarioService incluirUsuarioService;


    @PostMapping
    public UsuarioResponse incluir(@RequestBody UsuarioRequest request) {
        return incluirUsuarioService.incluir(request);
    }


}
