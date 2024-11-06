package org.example.modal;


import jakarta.persistence.*;

import java.io.Serializable;

@Entity
@Table(name = "user_tour_order")
public class UserTourOrder {


    @EmbeddedId
    private UserTourOrderKey id;

    @ManyToOne
    @MapsId("userId") // Chỉ ra rằng userId trong UserTourOrderKey là khóa ngoại
    @JoinColumn(name = "user_id") // Tên cột trong bảng UserTourOrder là user_id
    private Users user;

    @ManyToOne
    @MapsId("tourOrderId") // Chỉ ra rằng tourOrderId trong UserTourOrderKey là khóa ngoại
    @JoinColumn(name = "tour_order_id") // Tên cột trong bảng UserTourOrder là tour_order_id
    private TourOrder tourOrder;

    @Column(name = "status")
    private String status;

    public UserTourOrder() {
    }

    public UserTourOrderKey getId() {
        return id;
    }

    public void setId(UserTourOrderKey id) {
        this.id = id;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public TourOrder getTourOrder() {
        return tourOrder;
    }

    public void setTourOrder(TourOrder tourOrder) {
        this.tourOrder = tourOrder;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "UserTourOrder{" +
                "id=" + id +
                ", user=" + user +
                ", tourOrder=" + tourOrder +
                ", status='" + status + '\'' +
                '}';
    }

    @Embeddable
    public static class UserTourOrderKey implements Serializable {
        @Column(name = "user_id")
        private int userId;

        @Column(name = "tour_order_id")
        private int tourOrderId;

        public UserTourOrderKey() {
        }

        public int getUserId() {
            return userId;
        }

        public void setUserId(int userId) {
            this.userId = userId;
        }

        public int getTourOrderId() {
            return tourOrderId;
        }

        public void setTourOrderId(int tourOrderId) {
            this.tourOrderId = tourOrderId;
        }

    }
}
