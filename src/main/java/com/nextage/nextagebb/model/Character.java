/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.nextage.nextagebb.model;

import com.nextage.nextagebb.model.enums.CharacterClass;
import com.nextage.nextagebb.model.enums.CharacterRole;
import com.nextage.nextagebb.model.enums.Race;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author jppb2
 */

@Entity
@Table(name = "tb_characters")
public class Character {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String name;
    
    @Enumerated(EnumType.STRING)
    @Column(name = "character_class", nullable = false)
    private CharacterClass characterClass;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Race race;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CharacterRole role;
    
    private String photoUrl;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;
    
    // Lista de personagens que ESTE personagem está seguindo
    @ManyToMany
    @JoinTable(
        name = "tb_character_followers",
        joinColumns = @JoinColumn(name = "follower_id"),
        inverseJoinColumns = @JoinColumn(name = "followed_id")
    )
    private Set<Character> following = new HashSet<>();
    
    // Lista de personagens que seguem ESTE personagem
    // Usamos mappedBy para dizer que a tabela de ligação já foi definida acima
    @ManyToMany(mappedBy = "following")
    private Set<Character> followers = new HashSet<>();
    
    public Character(){
        
    }
    
    public Character(Long id, String name, CharacterClass characterClass, Race race, CharacterRole role, String photoUrl, User user, Game game){
        this.id = id;
        this.name = name;
        this.characterClass = characterClass;
        this.race = race;
        this.role = role;
        this.photoUrl = photoUrl;
        this.user = user;
        this.game = game;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }

    public Set<Character> getFollowing() {
        return following;
    }

    public void setFollowing(Set<Character> following) {
        this.following = following;
    }
    
    // Adiciona um personagem na lista de seguidos
    public void startFollowing(Character target) {
        this.following.add(target);
    }

    // Remove um personagem da lista
    public void stopFollowing(Character target) {
        this.following.remove(target);
    }

    public Set<Character> getFollowers() {
        return followers;
    }

    public void setFollowers(Set<Character> followers) {
        this.followers = followers;
    }

    public CharacterClass getCharacterClass() {
        return characterClass;
    }

    public void setCharacterClass(CharacterClass characterClass) {
        this.characterClass = characterClass;
    }

    public Race getRace() {
        return race;
    }

    public void setRace(Race race) {
        this.race = race;
    }

    public CharacterRole getRole() {
        return role;
    }

    public void setRole(CharacterRole role) {
        this.role = role;
    }

    
    
}
