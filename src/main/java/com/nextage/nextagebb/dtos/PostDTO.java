/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.dtos;

import org.springframework.web.multipart.MultipartFile;

/**
 *
 * @author jppb2
 */
public record PostDTO(String text, Long characterId, MultipartFile file) {
    
}
