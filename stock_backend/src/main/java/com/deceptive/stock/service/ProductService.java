package com.deceptive.stock.service;

import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.product.ProductRequest;
import com.deceptive.stock.payload.product.ProductResponse;
import org.springframework.data.domain.Page;

import java.util.List;

public interface ProductService {
    List<Product> getAllProducts();

    Product getProductById(Integer id);

    Product saveProduct(ProductRequest productRequest);

    PagedResponse<ProductResponse> getProductsByBrand(int page, int size, Integer id);
    PagedResponse<ProductResponse> getProductsByCategory(int page, int size, Integer id);

    void deleteProduct(Integer id);
}
