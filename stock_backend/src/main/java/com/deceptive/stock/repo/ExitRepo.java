package com.deceptive.stock.repo;

import com.deceptive.stock.model.Exit;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExitRepo extends JpaRepository<Exit, Integer> {
}
