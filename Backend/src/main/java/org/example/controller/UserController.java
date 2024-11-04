package org.example.controller;

import org.example.modal.Users;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
    public boolean addNewUser(@RequestBody Users user) {
        return userService.createNewUser(user);
    }
    @PutMapping("/users/{userID}")
    public boolean updateUser(@RequestBody Users user, @PathVariable int userID) {
        return userService.updateUser(userID, user);
    }
}
