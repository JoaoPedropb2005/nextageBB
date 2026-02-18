/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.service;

import com.nextage.nextagebb.model.Photo;
import com.nextage.nextagebb.repositories.PhotoRepository;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

/**
 *
 * @author jppb2
 */
public class PhotoService {
    
    @Autowired
    private PhotoRepository photoRepository;
    
    public Photo storeFile(MultipartFile file) {
        // Normaliza o nome do arquivo
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());

        try {
            // Validação simples
            if(fileName.contains("..")) {
                throw new RuntimeException("Nome de arquivo inválido " + fileName);
            }

            // Cria o objeto Photo com os bytes do arquivo
            Photo photo = new Photo(fileName, file.getContentType(), file.getBytes());

            return photoRepository.save(photo);

        } catch (IOException ex) {
            throw new RuntimeException("Não foi possível salvar o arquivo " + fileName, ex);
        }
    }
    
    public Photo getFile(Long fileId){
     
        return photoRepository.findById(fileId).orElseThrow(() -> new RuntimeException("Arquivo não encontrado com id " + fileId));
      
    }
    
    public String generateUrl(Long photoId){
        return ServletUriComponentsBuilder.fromCurrentContextPath().path("/photos").path(photoId.toString()).toUriString();
    }
}
