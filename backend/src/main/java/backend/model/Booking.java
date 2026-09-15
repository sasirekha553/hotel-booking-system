package backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String customerName;
    private String customerEmail;
    private LocalDate checkInDate;
    private LocalDate checkOutDate;
    private Double totalPrice;

    @ManyToOne
    @JoinColumn(name = "hotel_id")
    private Hotel hotel;
    @ManyToOne
@JoinColumn(name = "room_id")
private Room room;
    public Booking() {}

    public Booking(String customerName, String customerEmail, LocalDate checkInDate, LocalDate checkOutDate, Double totalPrice, Hotel hotel) {
        this.customerName = customerName;
        this.customerEmail = customerEmail;
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.totalPrice = totalPrice;
        this.hotel = hotel;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }

    public String getCustomerEmail() { return customerEmail; }
    public void setCustomerEmail(String customerEmail) { this.customerEmail = customerEmail; }

    public LocalDate getCheckInDate() { return checkInDate; }
    public void setCheckInDate(LocalDate checkInDate) { this.checkInDate = checkInDate; }

    public LocalDate getCheckOutDate() { return checkOutDate; }
    public void setCheckOutDate(LocalDate checkOutDate) { this.checkOutDate = checkOutDate; }

    public Double getTotalPrice() { return totalPrice; }
    public void setTotalPrice(Double totalPrice) { this.totalPrice = totalPrice; }

    public Hotel getHotel() { return hotel; }
    public void setHotel(Hotel hotel) { this.hotel = hotel; }
public Room getRoom() {
    return room;
}

public void setRoom(Room room) {
    this.room = room;
}
}