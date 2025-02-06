package com.deceptive.stock.payload.category;

import com.deceptive.stock.model.Category;

import java.util.List;

public record CategoryResponse(
        Integer id,
        String name
) {
    public CategoryResponse(Category cat){
        this(
                cat.getId(),
                cat.getName()
        );
    }
}
