package com.nextage.nextagebb.repositories;

import com.nextage.nextagebb.model.Character;
import com.nextage.nextagebb.model.Game;
import com.nextage.nextagebb.model.User;
import com.nextage.nextagebb.model.enums.CharacterClass;
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

    // busca todos os personagens de um usuário específico
    List<Character> findByUser(User user);

    // busca todos os personagens associados a um jogo específico
    List<Character> findByGame(Game game);

    // busca personagens por nome (exato)   
    List<Character> findByName(String name);

    // busca personagens cujo nome contenha uma parte do texto (ignora maiúsculas/minúsculas)
    List<Character> findByNameContainingIgnoreCase(String name);
    
    // busca personagens por classe
    List<Character> findByCharacterClass(CharacterClass characterClass);
}