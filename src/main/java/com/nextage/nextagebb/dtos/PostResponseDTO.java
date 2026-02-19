/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.dtos;

import com.nextage.nextagebb.model.Post;
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
        Integer likesCount) {
    
    public PostResponseDTO(Post post) {
        this(
            post.getId(),
            post.getText(),
            post.getImageUrl(),
            post.getCreatedAt(),
            post.getAuthor().getId(),
            post.getAuthor().getName(),
            post.getAuthor().getPhotoUrl(),
            post.getLikedBy().size()
        );
    }
    
}
