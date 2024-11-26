package org.example.controller;

import org.example.exception.ExistedException;
import org.example.modal.Users;
import org.example.response.ApiResponse;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import static org.springframework.http.HttpStatus.CONFLICT;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/User")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public ArrayList<Users> getUsers() {
        return userService.getAllUSer();
    }

    @PostMapping("/users")
    public ResponseEntity<ApiResponse> addNewUser(@RequestBody Users user) {
        try {
             userService.createNewUser(user);
             return ResponseEntity.ok(new ApiResponse("Create Successful",user));
        } catch (ExistedException e) {
            return ResponseEntity.status(CONFLICT).body(new ApiResponse(e.getMessage(),null));
        }
    }

    @PutMapping("/users/{userID}")
    public boolean updateUser(@RequestBody Users user, @PathVariable int userID) {
        return userService.updateUser(userID, user);
    }

    @GetMapping("/TotalUsers")
    public int getTotalUsers() {
        return userService.getTotalAccountUser();
    }
    @GetMapping("Users/{email}")
    public Users getbyEmail(@PathVariable("email") String email){
        return userService.getUserByEmail(email);
    }
}
