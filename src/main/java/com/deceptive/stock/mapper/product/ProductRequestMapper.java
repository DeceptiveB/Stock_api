package com.deceptive.stock.mapper.product;

import com.deceptive.stock.exception.ResourceNotFoundException;
import com.deceptive.stock.model.Brand;
import com.deceptive.stock.model.Category;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.payload.ProductRequest;
import com.deceptive.stock.repo.BrandRepo;
import com.deceptive.stock.repo.CategoryRepo;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.function.Function;

@Service
public class ProductRequestMapper implements Function<ProductRequest, Product> {
    private CategoryRepo categoryRepo;
    private BrandRepo brandRepo;
    public ProductRequestMapper(CategoryRepo categoryRepo,
                                BrandRepo brandRepo){
        this.categoryRepo = categoryRepo;
        this.brandRepo = brandRepo;
    }
    @Override
    public Product apply(ProductRequest productRequest) {
        Set<Category> categories = new HashSet<>();
        for(Integer cat: productRequest.categories().orElse(new HashSet<>())){
            categories.add(this.categoryRepo.findById(cat)
                                   .orElseThrow(() -> new ResourceNotFoundException("Category", "Id", cat)));
        }
        Brand brand = brandRepo.findByName(productRequest.brand())
                .orElseThrow(() -> new ResourceNotFoundException("Brand", "Name", productRequest.brand()));

        Product product = new Product();
        product.setName(productRequest.name());
        product.setDescription(productRequest.description());
        product.setBrand(brand);
        if (!categories.isEmpty())
            product.setCategories(categories);

        return product;
    }
}
