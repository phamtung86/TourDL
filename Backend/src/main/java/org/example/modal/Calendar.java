package org.example.modal;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.Date;

@Entity
@Table(name = "tour_calendar")
@Getter
@Setter
@ToString
@NoArgsConstructor
public class Calendar {
    @Column(name = "id")
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @Column(name = "start_date")
    @CreationTimestamp
    @Temporal(TemporalType.TIMESTAMP)
    private Timestamp startDate;
    @Column(name = "slot")
    private int slot;
    @Column(name = "voucher_id")
    private Integer voucherId;
    @ManyToOne()
    @JoinColumn(name = "tour_id", referencedColumnName = "id")
    private Tour tour;

//    public Calendar() {
//    }

}