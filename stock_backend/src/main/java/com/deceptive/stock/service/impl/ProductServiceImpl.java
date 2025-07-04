package com.deceptive.stock.service.impl;

import com.deceptive.stock.exception.ResourceNotFoundException;
import com.deceptive.stock.mapper.product.ProductRequestMapper;
import com.deceptive.stock.mapper.product.ProductResponseMapper;
import com.deceptive.stock.model.Brand;
import com.deceptive.stock.model.Category;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.PagedResponse;
import com.deceptive.stock.payload.product.ProductRequest;
import com.deceptive.stock.payload.product.ProductResponse;
import com.deceptive.stock.repo.BrandRepo;
import com.deceptive.stock.repo.CategoryRepo;
import com.deceptive.stock.repo.ProductRepo;
import com.deceptive.stock.service.ProductService;
import com.deceptive.stock.specification.ProductSpecification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Consumer;
import java.util.stream.Collectors;

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
    @Autowired
    private BrandRepo brandRepo;
    @Autowired
    private CategoryRepo catRepo;
    @Override
    public Product updateProduct(Integer id, ProductRequest productRequest, MultipartFile file) {
        Product product = productRepo.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product", "id", id));
        if (productRequest.name() != null){
            product.setName(productRequest.name());
        }
        if (productRequest.brand() != null){
            Brand brand = brandRepo.findByName(productRequest.brand()).orElseThrow(
                    () -> new ResourceNotFoundException("Brand", "name", productRequest.brand()));
            product.setBrand(brand);
        }
        if (productRequest.description() != null){
            product.setDescription(productRequest.description());
        }

        if(!productRequest.categories().isEmpty()){
            Set<Category> categories = productRequest.categories()
                    .stream()
                    .map((cat) -> catRepo.findByName(cat).
                            orElseThrow(
                                    () -> new ResourceNotFoundException("Category", "name", cat)
                                       ))
                    .collect(Collectors.toSet());
            product.setCategories(categories);
        }

        if (file != null && !file.isEmpty()) {
            try {
                Files.createDirectories(Paths.get("uploads"));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            String uniqueFileName = saveFile(file);
            product.setImagePath(uniqueFileName);
        }

        return productRepo.save(product);
    }

    @Override
    public PagedResponse<ProductResponse> getAllProducts(Map<String, String> params, int page, int size) {
        String name = params.get("name");
        Pageable pageable = PageRequest.of(page, size);
        Specification<Product> spec = ProductSpecification.filterBy(name);
        Page<Product> productPage = productRepo.findAll(spec, pageable);
        List<ProductResponse> productResponses = productPage.
                stream().
                map(product -> prodResMapper.apply(product)).
                toList();
        return new PagedResponse<>(
                productResponses,
                productPage.getNumber(),
                productPage.getSize(),
                productPage.getTotalElements(),
                productPage.getTotalPages(),
                productPage.isLast()
                );
    }

    @Override
    public ProductResponse getProductById(Integer id) {
        Product product = productRepo.findById(id).orElseThrow(
                () -> new ResourceNotFoundException("Product", "Id", id));
        return prodResMapper.apply(product);
    }

    @Override
    public Product saveProduct(ProductRequest productRequest, MultipartFile file) {
        Product product = prodReqMapper.apply(productRequest);

        if (file != null && !file.isEmpty()) {
            try {
                Files.createDirectories(Paths.get("uploads"));
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
            String uniqueFileName = saveFile(file);
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

    private void updateIfNotNull(Consumer<String> setter, String value) {
        if (value != null && !value.isBlank()) {
            setter.accept(value);
        }
    }

    public String saveFile(MultipartFile file) {
        String uniqueFileName = System.currentTimeMillis() + "_" + file.getOriginalFilename();
        String filePath = imageDirectory + uniqueFileName;
        try {
            Files.copy(file.getInputStream(), Path.of(filePath), StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return uniqueFileName;
    }

}