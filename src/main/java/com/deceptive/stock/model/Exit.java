package com.deceptive.stock.model;

import com.deceptive.stock.model.audit.UserDateAudit;
import jakarta.persistence.*;

import java.util.Set;

@Table
@Entity
public class Exit extends UserDateAudit {

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

    @ManyToMany(mappedBy = "exits")
    private Set<Product> products;
}
