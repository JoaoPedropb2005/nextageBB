package com.nextage.nextagebb.controllers;

import com.nextage.nextagebb.dtos.CharacterDTO;
import com.nextage.nextagebb.model.Character;
import com.nextage.nextagebb.model.Game;
import com.nextage.nextagebb.model.User;
import com.nextage.nextagebb.repositories.CharacterRepository;
import com.nextage.nextagebb.service.GameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {

    @Autowired
    private CharacterRepository characterRepository;

    @Autowired
    private GameService gameService;
    
    @PostMapping
    public ResponseEntity create(@RequestBody CharacterDTO info) {
        
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Game game = gameService.findOrCreate(info.gameIdApi(), info.gameName(), info.gameImage());
       
        Character newCharacter = new Character();
        newCharacter.setName(info.name());
        newCharacter.setCharacterClass(info.characterClass());
        newCharacter.setRace(info.race());
        newCharacter.setRole(info.role());
        newCharacter.setPhotoUrl(info.photoUrl());
        
        newCharacter.setGame(game);
        newCharacter.setUser(user);
        
        characterRepository.save(newCharacter);
        
        return ResponseEntity.ok().build();
    }
    
    @GetMapping("/my-characters")
    public List<Character> listMyCharacters(){
        
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        return characterRepository.findByUser(user);
    }

    @GetMapping("/user/{userId}")
    public List<Character> listByGamer(@PathVariable Long userId) {
        // usuário temporário apenas com o ID para fazer a busca
        User dummyUser = new User();
        dummyUser.setId(userId);
        return characterRepository.findByUser(dummyUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Character> getById(@PathVariable Long id) {
        return characterRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}