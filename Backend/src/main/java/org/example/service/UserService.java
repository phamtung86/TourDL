package org.example.service;

import org.example.exception.ExistedException;
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
    public void createNewUser(Users user) {
        // Kiểm tra xem id đã tồn tại trong cơ sở dữ liệu hay chưa
        if (userReponsitory.existsById(user.getId())) {
            throw new ExistedException(user.getId() + " is exist");
        }

        // Kiểm tra xem userName đã tồn tại hay chưa
        if (userReponsitory.existsByUserName(user.getUserName())) {
            throw new ExistedException(user.getUserName() + " is exist");
        }

        // Kiểm tra xem email đã tồn tại hay chưa
        if (userReponsitory.existsByEmail(user.getEmail())) {
            throw new ExistedException(user.getEmail() + " is exist");
        }

        // Nếu tất cả các điều kiện trên không gặp lỗi, lưu người dùng vào cơ sở dữ liệu
        user.setPassWord(passwordEncoder.encode(user.getPassWord()));
        userReponsitory.save(user);
    }

    public Users getUserByEmail(String email){
        return userReponsitory.findByEmailOrUsername(email);
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
