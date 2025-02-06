package com.deceptive.stock.service.impl;

import com.deceptive.stock.mapper.product.ProductRequestMapper;
import com.deceptive.stock.mapper.product.ProductResponseMapper;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.product.ProductRequest;
import com.deceptive.stock.payload.product.ProductResponse;
import com.deceptive.stock.repo.ProductRepo;
import com.deceptive.stock.service.ProductService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    private static final Logger logger = LoggerFactory.getLogger(ProductServiceImpl.class);
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
    public PagedResponse<ProductResponse> getProductsByBrand(int page, int size, Integer id) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productsPage = productRepo.findByBrandId(id, pageable);
        List<ProductResponse> products = productsPage.stream()
                .map(product -> prodResMapper.apply(product))
                .toList();
        return new PagedResponse<>(products, productsPage.getNumber(),
                                   productsPage.getSize(),
                                   productsPage.getTotalElements(),
                                   productsPage.getTotalPages(),
                                   productsPage.isLast());
    }

    @Override
    public PagedResponse<ProductResponse> getProductsByCategory(int page, int size, Integer id) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> productsPage = productRepo.findByCategoriesId(id, pageable);
        List<ProductResponse> products = productsPage.stream()
                .map(product -> prodResMapper.apply(product))
                .toList();
        return new PagedResponse<>(products, productsPage.getNumber(),
                productsPage.getSize(),
                productsPage.getTotalElements(),
                productsPage.getTotalPages(),
                productsPage.isLast());
    }
}