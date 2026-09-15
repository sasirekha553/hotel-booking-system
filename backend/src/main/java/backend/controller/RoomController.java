package backend.controller;

import backend.model.Room;
import backend.repository.RoomRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "*")
public class RoomController {

    private final RoomRepository roomRepository;

    public RoomController(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }

    @GetMapping("/hotel/{hotelId}")
    public List<Room> getRoomsByHotel(@PathVariable Long hotelId) {
        return roomRepository.findByHotelId(hotelId);
    }
}