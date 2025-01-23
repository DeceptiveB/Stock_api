package com.deceptive.stock.model;

import com.deceptive.stock.model.audit.UserDateAudit;
import jakarta.persistence.*;

import java.util.Set;

@Table
@Entity
public class Entry extends UserDateAudit {
    @Id
    @SequenceGenerator(
            name = "exit_id_sequence",
            sequenceName = "exit_id_sequence"
    )
    @GeneratedValue(
            generator = "exit_id_sequence",
            strategy = GenerationType.SEQUENCE
    )
    private Integer id;

    @ManyToMany(mappedBy = "entries")
    private Set<Product> products;
}
