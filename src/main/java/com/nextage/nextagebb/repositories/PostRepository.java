package com.nextage.nextagebb.repositories;

import com.nextage.nextagebb.model.Character;
import com.nextage.nextagebb.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositório para a entidade Post.
 * Responsável por gerenciar os textos, curtidas e a timeline dos personagens.
 * @author Julia
 */
@Repository
public interface PostRepository extends JpaRepository<Post, Long> {

    // busca todos os posts de um autor específico (útil para a tela de Perfil)
    List<Post> findByAuthorOrderByCreatedAtDesc(Character author);

    // busca posts que contenham uma palavra-chave específica
    List<Post> findByTextContainingIgnoreCase(String keyword);
    
    /**
     * Esta é a consulta pra TELA:
     * Busca posts de todos os personagens que o personagem logado segue.
     */
    @Query("SELECT p FROM Post p WHERE p.author IN (SELECT f FROM Character c JOIN c.following f WHERE c.id = :characterId) ORDER BY p.createdAt DESC")
    List<Post> findTimelineByCharacterId(@Param("characterId") Long characterId);

    // conta quantos likes um post recebeu
    @Query("SELECT size(p.likedBy) FROM Post p WHERE p.id = :postId")
    Integer countLikesByPostId(@Param("postId") Long postId);
    
    // --- A QUERY DA TIMELINE ---
    @Query("SELECT p FROM Post p WHERE p.author IN " +
           "(SELECT f FROM Character c JOIN c.following f WHERE c.id = :myCharacterId) " +
           "ORDER BY p.createdAt DESC")
    List<Post> findTimeline(@Param("myCharacterId") Long myCharacterId);
    
    List<Post> findAllByOrderByCreatedAtDesc();
}