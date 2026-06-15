package com.serratec.grupo_dois.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.serratec.grupo_dois.model.Usuario;
import com.serratec.grupo_dois.repository.UsuarioRepository;
import com.serratec.grupo_dois.security.JwtUtils; // Importe o seu JwtUtils

import java.util.Optional;

@CrossOrigin(origins = "http://localhost:5173") // Permite requisições do React
@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtils jwtUtils; // Injeção do utilitário JWT

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Usuario dadosLogin) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(dadosLogin.getEmail());

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();
            // Verifica a senha (cuidado: em produção, use BCryptPasswordEncoder!)
            if (usuario.getSenha().equals(dadosLogin.getSenha())) {
                
                // GERA O TOKEN AQUI
                String token = jwtUtils.gerarToken(usuario.getEmail());
                
                // Retorna o token para o React
                return ResponseEntity.ok(token); 
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("E-mail ou senha incorretos.");
    }
}