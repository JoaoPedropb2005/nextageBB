/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.controllers;

import com.nextage.nextagebb.dtos.PostDTO;
import com.nextage.nextagebb.model.Post;
import com.nextage.nextagebb.model.User;
import com.nextage.nextagebb.model.Character;
import com.nextage.nextagebb.repositories.CharacterRepository;
import com.nextage.nextagebb.repositories.PostRepository;
import java.time.LocalDateTime;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jppb2
 */
@RestController
@RequestMapping("/posts")
public class PostController {
    
    @Autowired
    private PostRepository postRepository;
    
    @Autowired
    private CharacterRepository characterRepository;
    
    @PostMapping
    public ResponseEntity create(@RequestBody PostDTO data){
        
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        
        Character character = characterRepository.findById(data.characterId()).orElseThrow(() -> new RuntimeException("Personagem não encontrado"));
        
        if(!character.getUser().getId().equals(user.getId())){
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Esse personagem não é seu!");
        }
        
        Post newPost = new Post();
        newPost.setText(data.text());
        newPost.setImageUrl(data.imageUrl());
        newPost.setCreatedAt(LocalDateTime.now());
        newPost.setAuthor(character);
        
        postRepository.save(newPost);
        
        return ResponseEntity.ok().build();
        
    }
    
    @GetMapping("/post-character/{characterId}")
    public List<Post> getPostsByCharacter(@PathVariable Long characterId){
            Character character = new Character();
            character.setId(characterId);
            return postRepository.findByAuthorOrderByCreatedAtDesc(character);
    }
}
t