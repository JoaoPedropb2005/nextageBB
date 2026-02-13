package com.nextage.nextagebb.controllers;

import com.nextage.nextagebb.model.Character;
import com.nextage.nextagebb.repositories.CharacterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {

    @Autowired
    private CharacterRepository characterRepository;

    @PostMapping
    public Character create(@RequestBody Character character) {
        return characterRepository.save(character);
    }

    @GetMapping("/user/{userId}")
    public List<Character> listByGamer(@PathVariable Long userId) {
        return characterRepository.findByUser(new com.nextage.nextagebb.model.User(userId, null, null, null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Character> getById(@PathVariable Long id) {
        return characterRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}