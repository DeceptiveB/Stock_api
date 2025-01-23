package com.deceptive.stock.model;

import com.deceptive.stock.model.audit.UserDateAudit;
import jakarta.persistence.*;

import java.util.Set;


@Table
@Entity
public class Product {
     @Id
     @SequenceGenerator(
             name = "product_id_sequence",
             sequenceName = "product_id_sequence"
     )
    @GeneratedValue(
            generator = "product_id_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Integer id;

     private String name;

     private String description;

    @ManyToMany
    @JoinTable(
            name="product_category",
            joinColumns=@JoinColumn(name="product_id"),
            inverseJoinColumns=@JoinColumn(name="category_id")
    )
    private Set<Category> categories;

    @ManyToOne
    @JoinColumn(name = "brand_id", nullable = false)
    private Brand brand;

    private int quantity;

    @ManyToMany
    @JoinTable(
            name="product_entry",
            joinColumns=@JoinColumn(name="product_id"),
            inverseJoinColumns=@JoinColumn(name="entry_id")
    )
    private Set<Entry> entries;

    @ManyToMany
    @JoinTable(
            name="product_exit",
            joinColumns=@JoinColumn(name="product_id"),
            inverseJoinColumns=@JoinColumn(name="exit_id")
    )
    private Set<Exit> exits;

    public Product() {
    }

    public Product(String name,
                   Brand brand,
                   Set<Category> categories,
                   String description){
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.categories = categories;
    }

    public Product(String name,
                   Brand brand,
                   String description){
        this.name = name;
        this.brand = brand;
        this.description = description;
    }

    public Product(String name,
                   String description,
                   Brand brand,
                   Set<Category> categories,
                   int quantity) {
        this.name = name;
        this.brand = brand;
        this.description = description;
        this.categories = categories;
        this.quantity = quantity;
    }

    public Product(
            Integer id,
            String name,
            String description,
            Brand brand,
            Set<Category> categories,
            int quantity,
            Set<Entry> entries,
            Set<Exit> exits) {
        this.id = id;
        this.name = name;
        this.categories = categories;
        this.brand = brand;
        this.quantity = quantity;
        this.entries = entries;
        this.exits = exits;
    }

    public Product(String name,
                   String description,
                   Brand brand,
                   Set<Category> categories,
                   int quantity,
                   Set<Entry> entries,
                   Set<Exit> exits) {
        this.name = name;
        this.categories = categories;
        this.brand = brand;
        this.quantity = quantity;
        this.entries = entries;
        this.exits = exits;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Brand getBrand() {
        return brand;
    }

    public void setBrand(Brand brand) {
        this.brand = brand;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public Set<Entry> getEntries() {
        return entries;
    }

    public void setEntries(Set<Entry> entries) {
        this.entries = entries;
    }

    public Set<Exit> getExits() {
        return exits;
    }

    public void setExits(Set<Exit> exits) {
        this.exits = exits;
    }
}
