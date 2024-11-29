package org.example.modal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;

@Entity
@Table(name = "tour_calendar")
@Getter
@Setter
@ToString(exclude = "tour")
@NoArgsConstructor
public class Calendar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "start_date", nullable = false, updatable = false)
    @CreationTimestamp
    private Timestamp startDate;

    @Column(name = "slot", nullable = false)
    private int slot;

    @Column(name = "voucher_id")
    private Integer voucherId;

    @ManyToOne
    @JoinColumn(name = "tour_id", referencedColumnName = "id", nullable = false)
    private Tour tour;
}
