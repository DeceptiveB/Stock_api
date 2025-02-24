package com.deceptive.stock.mapper.category;

import com.deceptive.stock.model.Category;
import com.deceptive.stock.payload.category.CategoryResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class CategoryResponseMapper implements Function<Category, CategoryResponse> {
    @Override
    public CategoryResponse apply(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName()
        );
    }
}
