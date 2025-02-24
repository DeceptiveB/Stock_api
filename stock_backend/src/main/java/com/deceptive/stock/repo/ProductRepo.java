package com.deceptive.stock.repo;

import com.deceptive.stock.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductRepo extends JpaRepository<Product, Integer> {
    Optional<Product> findByName(String name);

    Page<Product> findByCategoriesId(Integer id, Pageable pageable);

    Page<Product> findByBrandId(Integer id, Pageable pageable);
}
