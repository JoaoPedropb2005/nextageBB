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

    // busca todos os comentários de um post específico
    List<Comment> findByPost(Post post);

    // busca comentários de um post específico ordenando do mais antigo pro mais novo (fluxo de chat)
    List<Comment> findByPostOrderByCreatedAtAsc(Post post);

    // busca todos os comentários feitos por um personagem específico
    List<Comment> findByAuthor(com.nextage.nextagebb.model.Character author);

    // conta quantos comentários um post tem (bom pra exibir o contador na tela)
    long countByPost(Post post);
}