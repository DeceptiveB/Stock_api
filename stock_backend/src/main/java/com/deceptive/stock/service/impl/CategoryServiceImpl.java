package com.deceptive.stock.service.impl;

import com.deceptive.stock.model.Category;
import com.deceptive.stock.repo.CategoryRepo;
import com.deceptive.stock.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    @Autowired
    private CategoryRepo categoryRepo;
    @Override
    public Category saveCategory(String name) {
        Category cat = new Category(name);
        return categoryRepo.save(cat);
    }

    @Override
    public List<Category> getAllCategories() {
        return categoryRepo.findAll();
    }

    @Override
    public List<Category> getCategoriesByNameLike(String name) {
        return categoryRepo.findByNameContainingIgnoreCase(name);
    }
}
