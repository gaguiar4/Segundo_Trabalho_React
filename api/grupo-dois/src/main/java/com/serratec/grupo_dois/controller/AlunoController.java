package com.serratec.grupo_dois.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.serratec.grupo_dois.model.Aluno;
import com.serratec.grupo_dois.repository.AlunoRepository;

@RestController
@RequestMapping("/alunos")
@CrossOrigin(origins = "http://localhost:5173")
public class AlunoController {

	@Autowired
	private AlunoRepository repository;
	
	@PostMapping
	public ResponseEntity<Aluno> cadastrar(@RequestBody Aluno aluno) {
		Aluno novoAluno = repository.save(aluno);
		return ResponseEntity.ok(novoAluno);
	}
	
	@GetMapping
	public ResponseEntity<List<Aluno>> listarAlunos() {
		List<Aluno> lista = repository.findAll();
		return ResponseEntity.ok(lista);
	}
}
