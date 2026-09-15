package backend.controller;

import backend.model.Hotel;
import backend.repository.HotelRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/hotels")
@CrossOrigin(origins = "*") // Cross-origin access handle panna
public class HotelController {

    private final HotelRepository hotelRepository;

    public HotelController(HotelRepository hotelRepository) {
        this.hotelRepository = hotelRepository;
    }

    @GetMapping
    public List<Hotel> getAllHotels() {
        return hotelRepository.findAll();
    }
    @GetMapping("/search")
public List<Hotel> searchHotels(@RequestParam String city) {
    return hotelRepository.findByCityContainingIgnoreCase(city);
}
}