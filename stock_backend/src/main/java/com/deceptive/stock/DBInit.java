package com.deceptive.stock;

import com.deceptive.stock.model.Brand;
import com.deceptive.stock.model.Category;
import com.deceptive.stock.model.Entry;
import com.deceptive.stock.model.Product;
import com.deceptive.stock.repo.BrandRepo;
import com.deceptive.stock.repo.CategoryRepo;
import com.deceptive.stock.repo.ProductRepo;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@Component
public class DBInit {
    @Autowired
    private BrandRepo brandRepo;

    @Autowired
    private ProductRepo prodRepo;

    @Autowired
    private CategoryRepo categoryRepo;

    @PostConstruct
    private void postConstruct(){
        //Category electronic = new Category("Elctronics");
        //Category monitors = new Category("Monitors");
        //Category displays = new Category("Displays");
        //Brand dell = new Brand("Dell");
        //Product monitor = new Product(
        //        "Monitor",
        //        "Monitor de 24 pulgadas con una base que permite girar la pantalla en vertical",
        //        dell,
        //        Set.of(electronic, monitors, displays),
        //        0);
        ////User user = userRepo.findById(1).orElseThrow(() -> new ResourceNotFoundException("user", "id", 1));
        ////Book book = new Book("Artemis", List.<Genre>of(genre),"A city in the moon. And there is a heist");
        //categoryRepo.save(electronic);
        //categoryRepo.save(monitors);
        //categoryRepo.save(displays);
        //brandRepo.save(dell);
        //prodRepo.save(monitor);
    }
}
