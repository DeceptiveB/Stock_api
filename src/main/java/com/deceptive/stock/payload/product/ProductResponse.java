package com.deceptive.stock.payload.product;

import com.deceptive.stock.model.Category;

import java.util.List;
import java.util.Locale;
import java.util.Set;

public record ProductResponse(
        String name,
        String brand,
        String description,
        List<Integer> categories,
        int quantity
) {
}
