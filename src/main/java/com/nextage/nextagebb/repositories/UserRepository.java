package com.nextage.nextagebb.repositories;

import com.nextage.nextagebb.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

/**
 * Repositório para a entidade User.
 * Essencial para o processo de autenticação e gestão de contas dos gamers.
 * @author Julia
 */
@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     * Busca um usuário pelo e-mail.
     * Este método será utilizado pelo Spring Security durante o processo de login.
     */
    Optional<User> findByEmail(String email);

    /**
     * Verifica se já existe um usuário cadastrado com o e-mail informado.
     * Útil para validações no formulário de cadastro.
     */
    Boolean existsByEmail(String email);
}
