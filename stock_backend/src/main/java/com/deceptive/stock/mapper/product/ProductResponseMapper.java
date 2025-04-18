package com.deceptive.stock.mapper.product;

import com.deceptive.stock.mapper.category.CategoryResponseMapper;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.category.CategoryResponse;
import com.deceptive.stock.payload.product.ProductResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class ProductResponseMapper implements Function<Product, ProductResponse> {
    CategoryResponseMapper categoryResponseMapper;

    public ProductResponseMapper(CategoryResponseMapper categoryResponseMapper) {
        this.categoryResponseMapper = categoryResponseMapper;
    }

    @Override
    public ProductResponse apply(Product product) {
        String fileUrl = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/uploads/")
                .path(product.getImagePath())
                .toUriString();
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getBrand().getName(),
                product.getDescription(),
                product.getCategories().stream().map(
                        CategoryResponse::new)
                        .toList(),
                product.getTotalStock(),
                fileUrl);
    }
}
