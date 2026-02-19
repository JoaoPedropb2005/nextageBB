/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Record.java to edit this template
 */
package com.nextage.nextagebb.dtos;

import com.nextage.nextagebb.model.Comment;
import java.time.LocalDateTime;

/**
 *
 * @author jppb2
 */
public record CommentResponseDTO(
        Long id,
        String text,
        LocalDateTime CreatedAt,
        Long authorId,
        String authorName,
        String authorPhotoUrl) {

    public CommentResponseDTO(Comment comment) {
        this(
                comment.getId(),
                comment.getText(),
                comment.getCreatedAt(),
                comment.getAuthor().getId(),
                comment.getAuthor().getName(),
                comment.getAuthor().getPhotoUrl()
        );

    }

}
