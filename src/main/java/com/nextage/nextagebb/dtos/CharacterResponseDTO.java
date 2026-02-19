/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.dtos;
import com.nextage.nextagebb.model.Character;

/**
 *
 * @author jppb2
 */
public record CharacterResponseDTO(
        Long id,
        String name,
        String characterClass,
        String race,
        String role,
        String photoUrl,
        String gameName) {
    
    public CharacterResponseDTO(Character character) {
        this(
            character.getId(),
            character.getName(),
            character.getCharacterClass().toString(), // Se for Enum, use .toString()
            character.getRace().toString(),
            character.getRole().toString(),
            character.getPhotoUrl(),
            character.getGame().getName()
        );
    }
    
}
