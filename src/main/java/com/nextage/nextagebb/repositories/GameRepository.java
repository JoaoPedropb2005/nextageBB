package com.nextage.nextagebb.repositories;

import com.nextage.nextagebb.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;


/**
 * Repositório para a entidade Game.
 * Permite gerenciar os jogos disponíveis para os personagens se associarem.
 * @author Julia
 */
@Repository
public interface GameRepository extends JpaRepository<Game, Long> {

    // Busca jogos pelo nome
    List<Game> findByName(String name);

    // Busca jogos que contenham parte do nome (útil para campos de busca/autocomplete)
    List<Game> findByNameContainingIgnoreCase(String name);

    // Busca jogos por gênero (ex: RPG, FPS, MMO)
    List<Game> findByGenreIgnoreCase(String genre);
}