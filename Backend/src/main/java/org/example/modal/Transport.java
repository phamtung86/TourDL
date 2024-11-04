package org.example.modal;

import jakarta.persistence.*;

@Entity
@Table(name = "transport")
public class Transport {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "name")
    private String name;

    public Transport() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Tranport{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}
