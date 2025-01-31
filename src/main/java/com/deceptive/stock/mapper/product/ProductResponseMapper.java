package com.deceptive.stock.mapper.product;

import com.deceptive.stock.model.Category;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.product.ProductResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ProductResponseMapper implements Function<Product, ProductResponse> {
    @Override
    public ProductResponse apply(Product product) {
        return new ProductResponse(
                product.getName(),
                product.getBrand().getName(),
                product.getDescription(),
                product.getCategories().stream().map(
                        Category::getId).toList(),
                product.getQuantity());
    }
}
