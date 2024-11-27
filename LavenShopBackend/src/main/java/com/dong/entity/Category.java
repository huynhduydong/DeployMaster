package com.dong.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true)
    private String urlKey;

    private String thumbnailUrl;
    private Long parentId;
//    private boolean isPrimary;

    @OneToMany(mappedBy = "category")
    private Set<Product> products = new HashSet<>();
}
