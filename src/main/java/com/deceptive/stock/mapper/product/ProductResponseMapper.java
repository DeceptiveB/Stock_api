package com.deceptive.stock.mapper.product;

import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.product.ProductResponse;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ProductResponseMapper implements Function<Product, ProductResponse> {
    @Override
    public ProductResponse apply(Product product) {
        ProductResponse prodResponse = new ProductResponse(
                product.getName(),
                product.getBrand().getName(),
                product.getDescription(),
                product.getCategories(),
                product.getQuantity());
        return null;
    }
}
