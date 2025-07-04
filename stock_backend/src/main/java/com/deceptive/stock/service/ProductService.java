package com.deceptive.stock.service;

import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.product.ProductRequest;
import com.deceptive.stock.payload.product.ProductResponse;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface ProductService {
    Product updateProduct(Integer id, ProductRequest productRequest, MultipartFile image);

    PagedResponse<ProductResponse> getAllProducts(Map<String, String> params, int page, int size);

    ProductResponse getProductById(Integer id);

    Product saveProduct(ProductRequest productRequest, MultipartFile image);

    PagedResponse<ProductResponse> getProductsByBrand(int page, int size, Integer id);
    PagedResponse<ProductResponse> getProductsByCategory(int page, int size, Integer id);

    void deleteProduct(Integer id);
}
