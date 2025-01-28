package com.deceptive.stock.service;

import com.deceptive.stock.model.Category;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface CategoryService {
    Category saveCategory(String name);

    List<Category> getAllCategories();
}
