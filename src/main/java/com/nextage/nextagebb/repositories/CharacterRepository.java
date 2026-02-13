package com.nextage.nextagebb.repositories;

import com.nextage.nextagebb.model.Character;
import com.nextage.nextagebb.model.Game;
import com.nextage.nextagebb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositório para a entidade Character.
 * Fornece métodos para operações CRUD e consultas personalizadas.
 *  @author Julia
 */

@Repository
public interface CharacterRepository extends JpaRepository<Character, Long> {

    // Busca todos os personagens de um usuário específico
    List<Character> findByUser(User user);

    // Busca todos os personagens associados a um jogo específico
    List<Character> findByGame(Game game);

    // Busca personagens por nome (exato)   
    List<Character> findByName(String name);

    // Busca personagens cujo nome contenha uma parte do texto (ignora maiúsculas/minúsculas)
    List<Character> findByNameContainingIgnoreCase(String name);
    
    // Busca personagens por classe
    List<Character> findByCharacterClass(String characterClass);
}