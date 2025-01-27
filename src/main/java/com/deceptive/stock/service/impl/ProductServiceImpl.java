package com.deceptive.stock.service.impl;

import com.deceptive.stock.mapper.product.ProductRequestMapper;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.ProductRequest;
import com.deceptive.stock.repo.ProductRepo;
import com.deceptive.stock.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
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
    public Page<Product> getProductsByBrand(int page, int size, Integer id) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepo.findByBrandId(id, pageable);
    }
}