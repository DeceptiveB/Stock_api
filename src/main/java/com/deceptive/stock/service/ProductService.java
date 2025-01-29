package com.deceptive.stock.service;

import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.product.ProductRequest;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProductById(Integer id);

    Product saveProduct(ProductRequest productRequest);

    Page<Product> getProductsByBrand(int page, int size, Integer id);
}
