/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.dtos;

import com.nextage.nextagebb.model.Post;
import com.nextage.nextagebb.model.Character;
import java.time.LocalDateTime;

/**
 *
 * @author jppb2
 */
public record PostResponseDTO(
        Long id,
        String text,
        String imageUrl,
        LocalDateTime createdAt,
        Long authorId,
        String authorName,
        String authorPhotoUrl,
        Integer likesCount,
        Boolean likedByMe) {
    
    public PostResponseDTO(Post post, Character myChar) {
        this(
            post.getId(),
            post.getText(),
            post.getImageUrl(),
            post.getCreatedAt(),
            post.getAuthor().getId(),
            post.getAuthor().getName(),
            post.getAuthor().getPhotoUrl(),
            post.getLikedBy().size(),
            // compara pelo Id em vez de comparar o objeto inteiro
            myChar != null && post.getLikedBy().stream().anyMatch(liker -> liker.getId().equals(myChar.getId()))
        );
    }
    
}
