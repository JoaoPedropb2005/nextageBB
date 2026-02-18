/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.controllers;

import com.nextage.nextagebb.model.Photo;
import com.nextage.nextagebb.service.PhotoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jppb2
 */
@RestController
@RequestMapping("/photos")
public class PhotoController {
    
    @Autowired
    private PhotoService photoService;
    
    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long id){
        Photo photo = photoService.getFile(id);
        
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + photo.getFileName() + "\"")
                .header(HttpHeaders.CONTENT_TYPE, photo.getType()) // define se é png, jpg, etc.
                .body(photo.getData());
    }
    
}
