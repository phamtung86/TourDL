package org.example.service;

import org.example.modal.Users;
import org.example.reponsitory.UserReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserReponsitory userReponsitory;

    // get all user
    public ArrayList<Users> getAllUSer () {
        return (ArrayList<Users>) userReponsitory.findAll();
    }

    // create user
    public boolean createNewUser(Users user) {
        userReponsitory.save(user);
        return true;
    }

    // update user
    public boolean updateUser(int userId,Users user) {
        Optional<Users> userOpt = userReponsitory.findById(userId);
        if (userOpt.isPresent()) {
           Users userUpdate = userOpt.get();
           userUpdate.setName(user.getName());
           userUpdate.setPassWord(user.getPassWord());
           userUpdate.setName(user.getName());
           userUpdate.setPhoneNumber((user.getPhoneNumber()));
           userUpdate.setEmail(user.getEmail());
           userUpdate.setAddress(user.getAddress());
           userReponsitory.save(userUpdate);
           return true;
        }
        return false;
    }
}
