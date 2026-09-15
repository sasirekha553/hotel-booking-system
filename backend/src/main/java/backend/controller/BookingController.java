package backend.controller;

import backend.model.Booking;
import backend.model.Hotel;
import backend.repository.BookingRepository;
import backend.repository.HotelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import backend.model.Room;
import backend.repository.RoomRepository;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private HotelRepository hotelRepository;

    @Autowired
private RoomRepository roomRepository;
    @PostMapping
public Booking createBooking(@RequestBody Booking booking) {

    if (booking.getHotel() != null && booking.getHotel().getId() != null) {

        Hotel hotel = hotelRepository.findById(booking.getHotel().getId())
                .orElseThrow(() -> new RuntimeException("Hotel not found"));

        booking.setHotel(hotel);
    }

    if (booking.getRoom() != null && booking.getRoom().getId() != null) {

        Room room = roomRepository.findById(booking.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getAvailableRooms() <= 0) {
            throw new RuntimeException("Room is sold out");
        }

        room.setAvailableRooms(room.getAvailableRooms() - 1);

        roomRepository.save(room);

        booking.setRoom(room);
    }

    return bookingRepository.save(booking);
}

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
    @DeleteMapping("/{id}")
public String cancelBooking(@PathVariable Long id) {

    Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

    if (booking.getRoom() != null) {

        Room room = roomRepository.findById(booking.getRoom().getId())
                .orElseThrow(() -> new RuntimeException("Room not found"));

        if (room.getAvailableRooms() < room.getTotalRooms()) {
            room.setAvailableRooms(room.getAvailableRooms() + 1);
            roomRepository.save(room);
        }
    }

    bookingRepository.delete(booking);

    return "Booking cancelled successfully";
}
}