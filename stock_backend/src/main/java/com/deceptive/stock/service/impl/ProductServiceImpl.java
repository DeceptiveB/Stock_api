package com.deceptive.stock.service.impl;

import com.deceptive.stock.exception.ResourceNotFoundException;
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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Value("${app.image.directory}")
    private String imageDirectory;

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

        return productRepo.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product", "Id", id));
    }

    @Override
    public Product saveProduct(ProductRequest productRequest, MultipartFile file) {
        Product product = prodReqMapper.apply(productRequest);

        if (file != null && !file.isEmpty()) {
            String filePath = imageDirectory + file.getOriginalFilename();
            String uniqueFileName = System.currentTimeMillis() + "_" + filePath;
            try {
                Files.copy(file.getInputStream(), Path.of(filePath), StandardCopyOption.REPLACE_EXISTING);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            product.setImagePath(uniqueFileName);
        }

        Product prod = productRepo.save(product);;

        return prod;
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

    @Override
    public void deleteProduct(Integer id) {
        Product product = productRepo.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product", "Id", id)
                                                            );
        productRepo.delete(product);
    }


}