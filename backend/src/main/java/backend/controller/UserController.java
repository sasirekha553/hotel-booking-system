package backend.controller;

import backend.model.User;
import backend.repository.UserRepository;
import backend.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userRepository.save(user);
    }

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody User loginUser) {

        User user = userRepository.findByEmail(loginUser.getEmail())
                .orElse(null);

        if (user == null) {
            throw new RuntimeException("Invalid email or password");
        }

        if (!user.getPassword().equals(loginUser.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }

        String token = jwtUtil.generateToken(user.getEmail());

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("token", token);
        response.put("user", user);

        return response;
    }

    @GetMapping("/{email}")
    public User getUserByEmail(@PathVariable String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    @PostMapping("/verify-password")
public Map<String, Object> verifyPassword(@RequestBody Map<String, String> request) {

    String email = request.get("email");
    String password = request.get("password");

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    Map<String, Object> response = new HashMap<>();

    if (user.getPassword().equals(password)) {
        response.put("success", true);
        response.put("message", "Password verified");
    } else {
        response.put("success", false);
        response.put("message", "Incorrect password");
    }

    return response;
}
}