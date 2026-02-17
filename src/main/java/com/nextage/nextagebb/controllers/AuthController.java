/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.controllers;

import com.nextage.nextagebb.dtos.LoginDTO;
import com.nextage.nextagebb.dtos.LoginResponseDTO;
import com.nextage.nextagebb.dtos.RegisterDTO;
import com.nextage.nextagebb.model.User;
import com.nextage.nextagebb.repositories.UserRepository;
import com.nextage.nextagebb.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jppb2
 */
@RestController
@RequestMapping("/auth")
public class AuthController {
    
    @Autowired
    private AuthenticationManager authenticationManager;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TokenService tokenService;
    
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO data){
    
        var usernamePassword = new UsernamePasswordAuthenticationToken(data.email(), data.password());

        var auth = authenticationManager.authenticate(usernamePassword);
        
        var user = (User) auth.getPrincipal();
        
        var token = tokenService.generateToken(user);
        
        return ResponseEntity.ok(new LoginResponseDTO(token, user.getId(), user.getName()));
    }
    
    @PostMapping("/register")
    public ResponseEntity register(@RequestBody RegisterDTO data){
        
      if(this.userRepository.findByEmail(data.email()).isPresent()){
          return ResponseEntity.badRequest().body("E-mail já cadastrado!");
      }
      
      String encryptedPassword= new BCryptPasswordEncoder().encode(data.password());
      
      User newUser = new User();
      newUser.setEmail(data.email());
      newUser.setName(data.name());
      newUser.setPassword(encryptedPassword);
      
      this.userRepository.save(newUser);
      
      return ResponseEntity.ok().build();
    }
    
}
