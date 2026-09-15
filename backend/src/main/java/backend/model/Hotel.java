package backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "hotels")
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String location;
    private String city;
    private Double price;
    private Double rating;
    private Double latitude;
    private Double longitude;

    @Column(length = 1000)
    private String description;

    private String image;

    @ElementCollection
    private List<String> amenities;

    // Default Constructor
    public Hotel() {}

    // Constructor with Parameters
    public Hotel(String name, String location, String city, Double price, Double rating, Double latitude, Double longitude, String description, String image, List<String> amenities) {
        this.name = name;
        this.location = location;
        this.city = city;
        this.price = price;
        this.rating = rating;
        this.latitude = latitude;
        this.longitude = longitude;
        this.description = description;
        this.image = image;
        this.amenities = amenities;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public Double getLatitude() { return latitude; }
    public void setLatitude(Double latitude) { this.latitude = latitude; }

    public Double getLongitude() { return longitude; }
    public void setLongitude(Double longitude) { this.longitude = longitude; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImage() { return image; }
    public void setImage(String image) { this.image = image; }

    public List<String> getAmenities() { return amenities; }
    public void setAmenities(List<String> amenities) { this.amenities = amenities; }
}