package com.deceptive.stock.repo;

import com.deceptive.stock.model.Entry;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EntryRepo extends JpaRepository<Entry, Integer> {
}
