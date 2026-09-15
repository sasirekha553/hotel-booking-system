package backend;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import backend.repository.HotelRepository;
import backend.repository.BookingRepository;
import backend.repository.RoomRepository;

import backend.model.Hotel;
import backend.model.Room;

import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    private final HotelRepository hotelRepository;
    private final BookingRepository bookingRepository;
    private final RoomRepository roomRepository;

    public DataInitializer(
            HotelRepository hotelRepository,
            BookingRepository bookingRepository,
            RoomRepository roomRepository) {

        this.hotelRepository = hotelRepository;
        this.bookingRepository = bookingRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public void run(String... args) throws Exception {

        // =========================
        // CLEAR OLD DATA
        // =========================

        bookingRepository.deleteAll();
        roomRepository.deleteAll();
        hotelRepository.deleteAll();


        // =========================
        // HOTEL 1
        // =========================

        Hotel h1 = new Hotel();

        h1.setName("Grand Palace");
        h1.setLocation("Coimbatore");
        h1.setCity("Coimbatore");
        h1.setPrice(3500.0);
        h1.setRating(4.5);
        h1.setLatitude(11.0168);
        h1.setLongitude(76.9558);

        h1.setImage(
            "https://images.unsplash.com/photo-1566073771259-6a8506099945"
        );

        h1.setAmenities(
            List.of("AC", "WiFi", "Pool", "Parking", "Garden")
        );


        // =========================
        // HOTEL 2
        // =========================

        Hotel h2 = new Hotel();

        h2.setName("Ocean View Resort");
        h2.setLocation("Chennai");
        h2.setCity("Chennai");
        h2.setPrice(5000.0);
        h2.setRating(4.8);
        h2.setLatitude(13.0827);
        h2.setLongitude(80.2707);

        h2.setImage(
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
        );

        h2.setAmenities(
            List.of("AC", "WiFi", "Pool", "Parking")
        );


        // =========================
        // HOTEL 3
        // =========================

        Hotel h3 = new Hotel();

        h3.setName("Mountain Bliss");
        h3.setLocation("Ooty");
        h3.setCity("Ooty");
        h3.setPrice(4200.0);
        h3.setRating(4.6);
        h3.setLatitude(11.4102);
        h3.setLongitude(76.6950);

        h3.setImage(
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
        );

        h3.setAmenities(
            List.of("AC", "WiFi", "Garden", "Parking")
        );


        // =========================
        // HOTEL 4
        // =========================

        Hotel h4 = new Hotel();

        h4.setName("City Center Inn");
        h4.setLocation("Bangalore");
        h4.setCity("Bangalore");
        h4.setPrice(3000.0);
        h4.setRating(4.2);
        h4.setLatitude(12.9716);
        h4.setLongitude(77.5946);

        h4.setImage(
            "https://images.unsplash.com/photo-1590490360182-c33d57733427"
        );

        h4.setAmenities(
            List.of("AC", "WiFi", "Parking")
        );


        // =========================
        // HOTEL 5
        // =========================

        Hotel h5 = new Hotel();

        h5.setName("Royal Heritage");
        h5.setLocation("Madurai");
        h5.setCity("Madurai");
        h5.setPrice(2800.0);
        h5.setRating(4.4);
        h5.setLatitude(9.9252);
        h5.setLongitude(78.1198);

        h5.setImage(
            "https://images.unsplash.com/photo-1561501900-3701fa6a0864"
        );

        h5.setAmenities(
            List.of("AC", "WiFi", "Garden")
        );


        // =========================
        // HOTEL 6
        // =========================

        Hotel h6 = new Hotel();

        h6.setName("Palm Beach Resort");
        h6.setLocation("Pondicherry");
        h6.setCity("Pondicherry");
        h6.setPrice(4800.0);
        h6.setRating(4.7);
        h6.setLatitude(11.9416);
        h6.setLongitude(79.8083);

        h6.setImage(
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
        );

        h6.setAmenities(
            List.of("AC", "WiFi", "Pool", "Parking", "Garden")
        );


        // =========================
        // SAVE HOTELS
        // =========================

        hotelRepository.saveAll(
            List.of(h1, h2, h3, h4, h5, h6)
        );


        // =========================
        // HOTEL 1 ROOMS
        // =========================

        Room r1 = new Room();

        r1.setRoomType("Deluxe Room");
        r1.setPrice(3500.0);
        r1.setTotalRooms(10);
        r1.setAvailableRooms(10);
        r1.setImage(
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
        );
        r1.setHotel(h1);


        Room r2 = new Room();

        r2.setRoomType("Family Room");
        r2.setPrice(5000.0);
        r2.setTotalRooms(5);
        r2.setAvailableRooms(5);
        r2.setImage(
            "https://images.unsplash.com/photo-1590490360182-c33d57733427"
        );
        r2.setHotel(h1);


        // =========================
        // HOTEL 2 ROOMS
        // =========================

        Room r3 = new Room();

        r3.setRoomType("Deluxe Room");
        r3.setPrice(5000.0);
        r3.setTotalRooms(8);
        r3.setAvailableRooms(8);
        r3.setImage(
            "https://images.unsplash.com/photo-1584132967334-10e028bd69f7"
        );
        r3.setHotel(h2);


        Room r4 = new Room();

        r4.setRoomType("Sea View Room");
        r4.setPrice(6500.0);
        r4.setTotalRooms(4);
        r4.setAvailableRooms(4);
        r4.setImage(
            "https://images.unsplash.com/photo-1566665797739-1674de7a421a"
        );
        r4.setHotel(h2);


        // =========================
        // HOTEL 3 ROOMS
        // =========================

        Room r5 = new Room();

        r5.setRoomType("Mountain View Room");
        r5.setPrice(4200.0);
        r5.setTotalRooms(6);
        r5.setAvailableRooms(6);
        r5.setImage(
            "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"
        );
        r5.setHotel(h3);


        Room r6 = new Room();

        r6.setRoomType("Luxury Cottage");
        r6.setPrice(5500.0);
        r6.setTotalRooms(4);
        r6.setAvailableRooms(4);
        r6.setImage(
            "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
        );
        r6.setHotel(h3);


        // =========================
        // HOTEL 4 ROOMS
        // =========================

        Room r7 = new Room();

        r7.setRoomType("Executive Room");
        r7.setPrice(3000.0);
        r7.setTotalRooms(8);
        r7.setAvailableRooms(8);
        r7.setImage(
            "https://images.unsplash.com/photo-1590490360182-c33d57733427"
        );
        r7.setHotel(h4);


        Room r8 = new Room();

        r8.setRoomType("Premium Room");
        r8.setPrice(4500.0);
        r8.setTotalRooms(5);
        r8.setAvailableRooms(5);
        r8.setImage(
            "https://images.unsplash.com/photo-1611892440504-42a792e24d32"
        );
        r8.setHotel(h4);


        // =========================
        // HOTEL 5 ROOMS
        // =========================

        Room r9 = new Room();

        r9.setRoomType("Heritage Room");
        r9.setPrice(2800.0);
        r9.setTotalRooms(7);
        r9.setAvailableRooms(7);
        r9.setImage(
            "https://images.unsplash.com/photo-1561501900-3701fa6a0864"
        );
        r9.setHotel(h5);


        Room r10 = new Room();

        r10.setRoomType("Royal Suite");
        r10.setPrice(4500.0);
        r10.setTotalRooms(3);
        r10.setAvailableRooms(3);
        r10.setImage(
            "https://images.unsplash.com/photo-1578683010236-d716f9a3f461"
        );
        r10.setHotel(h5);


        // =========================
        // HOTEL 6 ROOMS
        // =========================

        Room r11 = new Room();

        r11.setRoomType("Beach View Room");
        r11.setPrice(4800.0);
        r11.setTotalRooms(6);
        r11.setAvailableRooms(6);
        r11.setImage(
            "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9"
        );
        r11.setHotel(h6);


        Room r12 = new Room();

        r12.setRoomType("Premium Sea View");
        r12.setPrice(6500.0);
        r12.setTotalRooms(3);
        r12.setAvailableRooms(3);
        r12.setImage(
            "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"
        );
        r12.setHotel(h6);


        // =========================
        // SAVE ALL ROOMS
        // =========================

        roomRepository.saveAll(
            List.of(
                r1, r2,
                r3, r4,
                r5, r6,
                r7, r8,
                r9, r10,
                r11, r12
            )
        );


        // =========================
        // SUCCESS MESSAGE
        // =========================

        System.out.println("=================================");
        System.out.println("6 Hotels Added Successfully!");
        System.out.println("12 Rooms Added Successfully!");
        System.out.println("All Rooms Are AVAILABLE!");
        System.out.println("=================================");
    }
}