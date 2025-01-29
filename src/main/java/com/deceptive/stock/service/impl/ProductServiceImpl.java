package com.deceptive.stock.service.impl;

import com.deceptive.stock.mapper.product.ProductRequestMapper;
import com.deceptive.stock.mapper.product.ProductResponseMapper;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.product.ProductRequest;
import com.deceptive.stock.payload.product.ProductResponse;
import com.deceptive.stock.repo.ProductRepo;
import com.deceptive.stock.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductResponseMapper prodResMapper;
    @Autowired
    private ProductRequestMapper prodReqMapper;
    @Autowired
    private ProductRepo productRepo;

    @Override
    public List<Product> getAllProducts() {
        return productRepo.findAll().stream().toList();
    }

    @Override
    public Product getProductById(Integer id) {
        return null;
    }

    @Override
    public Product saveProduct(ProductRequest productRequest) {
        return productRepo.save(prodReqMapper.apply(productRequest));
    }

    @Override
    public PagedResponse<Product> getProductsByBrand(int page, int size, Integer id) {
        Pageable pageable = PageRequest.of(page, size);
        List<ProductResponse> products = productRepo.findByBrandId(id, pageable)
                .stream()
                .map(product -> prodResMapper.apply(product))
                .collect(Collectors.toCollection());
        return PagedResponse<ProductResponse>
    }
}