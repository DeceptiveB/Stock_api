package com.deceptive.stock.repo;

import com.deceptive.stock.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CategoryRepo extends JpaRepository<Category, Integer> {
    Optional<Category> findByName(String name);

    List<Category> findByNameContainingIgnoreCase(String name);
}
