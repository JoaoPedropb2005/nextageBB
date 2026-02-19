/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Record.java to edit this template
 */
package com.nextage.nextagebb.dtos;

import com.nextage.nextagebb.model.enums.CharacterClass;
import com.nextage.nextagebb.model.enums.CharacterRole;
import com.nextage.nextagebb.model.enums.Race;
import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author jppb2
 */
public record CharacterDTO(
        String name,
        CharacterClass characterClass,
        Race race,
        CharacterRole role,
        Long gameIdApi,
        String gameName,
        String gameImage,
        
        MultipartFile file
        ) {

}
