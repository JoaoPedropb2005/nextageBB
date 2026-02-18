package com.nextage.nextagebb.controllers;

import com.nextage.nextagebb.dtos.CharacterDTO;
import com.nextage.nextagebb.model.Character;
import com.nextage.nextagebb.model.Game;
import com.nextage.nextagebb.model.Photo;
import com.nextage.nextagebb.model.User;
import com.nextage.nextagebb.repositories.CharacterRepository;
import com.nextage.nextagebb.service.GameService;
import com.nextage.nextagebb.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/characters")
public class CharacterController {

    @Autowired
    private CharacterRepository characterRepository;

    @Autowired
    private GameService gameService;
    
    @Autowired
    private PhotoService photoService;
    
    @PostMapping(consumes = "multipart/form-data")
    public ResponseEntity create(@RequestBody CharacterDTO info, @RequestParam(value = "file", required = false) MultipartFile file) {
        
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Game game = gameService.findOrCreate(info.gameIdApi(), info.gameName(), info.gameImage());
       
        Character newCharacter = new Character();
        newCharacter.setName(info.name());
        newCharacter.setCharacterClass(info.characterClass());
        newCharacter.setRace(info.race());
        newCharacter.setRole(info.role());
        
        if(file != null && !file.isEmpty()){
            Photo photo = photoService.storeFile(file);
            
            String url = photoService.generateUrl(photo.getId());
            
            newCharacter.setPhotoUrl(url);
        } else {
                newCharacter.setPhotoUrl(null);
        }
        
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