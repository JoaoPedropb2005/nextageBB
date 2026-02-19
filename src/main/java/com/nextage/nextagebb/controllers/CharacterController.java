package com.nextage.nextagebb.controllers;

import com.nextage.nextagebb.dtos.CharacterDTO;
import com.nextage.nextagebb.dtos.CharacterResponseDTO;
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
import org.springframework.http.HttpStatus;
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
    public ResponseEntity create(@ModelAttribute CharacterDTO info) {
        
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Game game = gameService.findOrCreate(info.gameIdApi(), info.gameName(), info.gameImage());
       
        Character newCharacter = new Character();
        newCharacter.setName(info.name());
        newCharacter.setCharacterClass(info.characterClass());
        newCharacter.setRace(info.race());
        newCharacter.setRole(info.role());
        
        if(info.file() != null && !info.file().isEmpty()){
            Photo photo = photoService.storeFile(info.file());
            
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
    public ResponseEntity<List<CharacterResponseDTO>> listMyCharacters() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        List<Character> characters = characterRepository.findByUser(user);
        
        List<CharacterResponseDTO> response = characters.stream()
                .map(CharacterResponseDTO::new)
                .toList();
                
        return ResponseEntity.ok(response);
    }

    @GetMapping("/user/{userId}")
    public List<Character> listByGamer(@PathVariable Long userId) {
        // usuário temporário apenas com o ID para fazer a busca
        User dummyUser = new User();
        dummyUser.setId(userId);
        return characterRepository.findByUser(dummyUser);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CharacterResponseDTO> getById(@PathVariable Long id) {
        return characterRepository.findById(id)
                .map(CharacterResponseDTO::new)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping("/{myCharacterId}/follow/{targetId}")
    public ResponseEntity followCharacter(@PathVariable Long myCharacterId, @PathVariable Long targetId){
        
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Character myChar = characterRepository.findById(myCharacterId)
                .orElseThrow(() -> new RuntimeException("Seu personagem não encontrado"));
        
        if (!myChar.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        
        Character target = characterRepository.findById(targetId)
                .orElseThrow(() -> new RuntimeException("Personagem alvo não encontrado"));
        
        if (myCharacterId.equals(targetId)) {
            return ResponseEntity.badRequest().body("Você não pode seguir a si mesmo");
        }
        
        myChar.startFollowing(target);
        characterRepository.save(myChar);
        
        return ResponseEntity.ok("Agora você está seguindo " + target.getName() + "!");
        
    }
    
    @DeleteMapping("/{myCharacterId}/follow/{targetId}")
    public ResponseEntity unfollowCharacter(@PathVariable Long myCharacterId, @PathVariable Long targetId) {
        
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Character myChar = characterRepository.findById(myCharacterId)
                .orElseThrow(() -> new RuntimeException("Seu personagem não encontrado"));

        if (!myChar.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Character target = characterRepository.findById(targetId)
                .orElseThrow(() -> new RuntimeException("Alvo não encontrado"));

        myChar.stopFollowing(target);
        characterRepository.save(myChar);

        return ResponseEntity.ok("Deixou de seguir " + target.getName());
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<CharacterResponseDTO>> searchSameGameCharacters(
            @RequestParam Long myCharacterId, 
            @RequestParam String name) {
        
        Character myChar = characterRepository.findById(myCharacterId)
                .orElseThrow(() -> new RuntimeException("Personagem não encontrado"));
                
        if (myChar.getGame() == null) {
            return ResponseEntity.badRequest().build(); 
        }
        
        Long gameId = myChar.getGame().getId();
        
        List<Character> found = characterRepository.searchByGameAndName(gameId, name, myCharacterId);
        
        // Converte para DTO
        List<CharacterResponseDTO> response = found.stream()
                .map(CharacterResponseDTO::new)
                .toList();
                
        return ResponseEntity.ok(response);
    }
    
}