package com.deceptive.stock.controller;

import com.deceptive.stock.model.Category;
import com.deceptive.stock.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping
    public ResponseEntity<List<Category>> getCategoriesByName(
            @RequestParam(required = false) String name
                                                             ){
        List<Category> categories;
        if (name != null && !name.isBlank()){
            categories = catService.getCategoriesByNameLike(name);
        }else {
            categories = catService.getAllCategories();
        }
        return ResponseEntity.ok().body(categories);
    }
}
