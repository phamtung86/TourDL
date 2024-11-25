package org.example.modal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "tour")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Tour {
    private static final long serialVersionUID = 1L;
    @Column(name = "id")
    @Id
    private String id;

    @Column(name = "name")
    private String name;

    @Column(name = "price")
    double price;

    @Column(name = "image")
    private String imageLink;

    @Column(name = "file_name")
    private String fileName;

    @Column(name = "destination")
    private String destination;

    @Column(name = "departure_point")
    private String departurePoint;

    @Column(name = "slot")
    private int slot;

    @OneToOne
    @JoinColumn(name = "transport_id", referencedColumnName = "id")
    private Transport transport;

    @OneToOne
    @JoinColumn(name = "tour_type_id", referencedColumnName = "id")
    private TourType tourType;

}
