package com.deceptive.stock.service;

import com.deceptive.stock.model.Category;
import org.springframework.stereotype.Service;

public interface CategoryService {
    Category saveCategory(String name);
}
