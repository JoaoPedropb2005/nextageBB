/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.service;

import com.nextage.nextagebb.model.Game;
import com.nextage.nextagebb.repositories.GameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 *
 * @author jppb2
 */
@Service
public class GameService {
    
    @Value("${api.rawg.key}")
    private String apiKey;
    
    @Autowired 
    private GameRepository gameRepository;
    
    @Autowired
    private RestTemplate restTemplate;
    
    // Método para o Frontend pesquisar jogos (Traz da API)
    public String searchGamesByName(String name) {
        String url = "https://api.rawg.io/api/games?search=" + name + "&genres=massively-multiplayer&key=" + apiKey;
        return restTemplate.getForObject(url, String.class);
    }
    
    public Game findOrCreate(Long idApi, String name, String imageUrl){
        return gameRepository.findByIdApi(idApi).orElseGet(() -> {
            Game newGame = new Game();
            newGame.setIdApi(idApi);
            newGame.setName(name);
            newGame.setImageUrl(imageUrl);
            newGame.setGenre("MMO");
            return gameRepository.save(newGame);
        });
    }
}
