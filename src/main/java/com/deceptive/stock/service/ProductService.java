package com.deceptive.stock.service;

import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.ProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProductById(Integer id);

    Product saveProduct(ProductRequest productRequest);

    Page<Product> getProductsByBrand(int page, int size, Integer id);
}
