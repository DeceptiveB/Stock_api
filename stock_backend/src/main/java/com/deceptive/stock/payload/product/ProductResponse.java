package com.deceptive.stock.payload.product;

import com.deceptive.stock.model.Category;
import com.deceptive.stock.payload.category.CategoryResponse;

import java.util.List;
import java.util.Locale;
import java.util.Set;

public record ProductResponse(
        Integer id,
        String name,
        String brand,
        String description,
        List<CategoryResponse> categories,
        int quantity,
        String image
) {
}
