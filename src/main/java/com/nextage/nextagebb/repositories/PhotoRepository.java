/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.repositories;

import com.nextage.nextagebb.model.Photo;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 *
 * @author jppb2
 */
public interface PhotoRepository extends JpaRepository<Photo, Long> {
    
}
