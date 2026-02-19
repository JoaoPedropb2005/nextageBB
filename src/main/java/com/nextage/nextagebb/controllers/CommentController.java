/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.controllers;

import com.nextage.nextagebb.dtos.CommentRequestDTO;
import com.nextage.nextagebb.dtos.CommentResponseDTO;
import com.nextage.nextagebb.model.User;
import com.nextage.nextagebb.model.Character;
import com.nextage.nextagebb.model.Comment;
import com.nextage.nextagebb.model.Post;
import com.nextage.nextagebb.repositories.CharacterRepository;
import com.nextage.nextagebb.repositories.CommentRepository;
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
public class CommentController {

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private CharacterRepository characterRepository;

    @PostMapping("/{postId}/comments")
    public ResponseEntity<CommentResponseDTO> createComment(@PathVariable Long postId, @RequestBody CommentRequestDTO data) {

        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

        Character character = characterRepository.findById(data.characterId()).orElseThrow(() -> new RuntimeException("Personagem não encontrado"));

        if (!character.getUser().getId().equals(user.getId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post não encontrado"));

        Comment newComment = new Comment();
        newComment.setText(data.text());
        newComment.setCreatedAt(LocalDateTime.now());
        newComment.setPost(post);
        newComment.setAuthor(character);

        commentRepository.save(newComment);

        return ResponseEntity.ok(new CommentResponseDTO(newComment));
    }

    @GetMapping("/{postId}/comments")
    public ResponseEntity<List<CommentResponseDTO>> getComments(@PathVariable Long postId) {

        Post post = postRepository.findById(postId).orElseThrow(() -> new RuntimeException("Post não encontrado"));

        List<Comment> comments = commentRepository.findByPostOrderByCreatedAtAsc(post);

        // Converte as entidades para DTO
        List<CommentResponseDTO> response = comments.stream()
                .map(CommentResponseDTO::new)
                .toList();

        return ResponseEntity.ok(response);

    }

}
