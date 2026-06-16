package com.serratec.grupo_dois.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.serratec.grupo_dois.model.Usuario;
import com.serratec.grupo_dois.repository.UsuarioRepository;
import com.serratec.grupo_dois.security.JwtUtils;
import java.util.HashMap;
import java.util.Map;

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtils jwtUtils; 

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario dadosLogin) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(dadosLogin.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            if (usuario.getSenha().equals(dadosLogin.getSenha())) {
                
            	String token = jwtUtils.gerarToken(usuario.getEmail());
                
                Map<String, String> resposta = new HashMap<>();
                resposta.put("token", token);
                resposta.put("username", usuario.getEmail());
                
                return ResponseEntity.ok(resposta);
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos.");
    }
}