package org.example.service;

import org.apache.catalina.User;
import org.example.modal.Users;
import org.example.reponsitory.UserReponsitory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserReponsitory userReponsitory;
    private final PasswordEncoder passwordEncoder;

    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    // get all user
    public ArrayList<Users> getAllUSer () {
        return (ArrayList<Users>) userReponsitory.findAll();
    }
    // create user
    public boolean createNewUser(Users user) {
        Optional<Users> userOpt = userReponsitory.findById(user.getId());
        if(userOpt.isEmpty()){
            user.setPassWord(passwordEncoder.encode(user.getPassWord()));
            userReponsitory.save(user);
            return true;
        }
        return false;

    }
    public Users getUserByEmail(String email){
        return userReponsitory.findByEmail(email);
    }

    // update user
    public boolean updateUser(int userId,Users user) {
        Optional<Users> userOpt = userReponsitory.findById(userId);
        if (userOpt.isPresent()) {
           Users userUpdate = userOpt.get();
           userUpdate.setUserName(user.getUserName());
//           userUpdate.setPassWord(user.getPassWord());
           userUpdate.setName(user.getName());
           userUpdate.setPhoneNumber((user.getPhoneNumber()));
           userUpdate.setEmail(user.getEmail());
           userUpdate.setAddress(user.getAddress());
//           userUpdate.setRole(user.getRole());
           userReponsitory.save(userUpdate);
           return true;
        }
        return false;
    }

    // get total account user
    public int getTotalAccountUser() {
        return userReponsitory.totalAccountUser();
    }
}
