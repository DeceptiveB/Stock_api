package com.deceptive.stock.repo;

import com.deceptive.stock.model.Brand;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BrandRepo extends JpaRepository<Brand, Integer> {
    Optional<Brand> findByName(String brand);
    List<Brand> findByNameContainingIgnoreCase(String brand);
}
