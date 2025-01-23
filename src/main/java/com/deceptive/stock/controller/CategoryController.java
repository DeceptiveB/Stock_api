package com.deceptive.stock.controller;

import com.deceptive.stock.model.Category;
import com.deceptive.stock.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService catService;

    @PostMapping
    public ResponseEntity<Category> saveCategory(
            @Valid @RequestBody Category category
            ){
        return ResponseEntity.ok().body(catService.saveCategory(category.getName()));
    }
}
