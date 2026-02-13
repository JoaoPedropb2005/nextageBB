package com.nextage.nextagebb.repositories;

import com.nextage.nextagebb.model.Comment;
import com.nextage.nextagebb.model.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 * Repositório para a entidade Comment.
 * Gerencia a persistência dos comentários feitos pelos personagens nos posts.
 * @author Julia
 */
@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    // Busca todos os comentários de um post específico
    List<Comment> findByPost(Post post);

    // Busca comentários de um post específico ordenando do mais antigo para o mais novo (fluxo de chat)
    List<Comment> findByPostOrderByCreatedAtAsc(Post post);

    // Busca todos os comentários feitos por um personagem específico
    List<Comment> findByAuthor(com.nextage.nextagebb.model.Character author);

    // Conta quantos comentários um post tem (útil para exibir o contador na timeline)
    long countByPost(Post post);
}