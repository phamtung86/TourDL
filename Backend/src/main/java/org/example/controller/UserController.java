package org.example.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.example.dto.UserDTO;
import org.example.exception.ExistedException;
import org.example.exception.UserException;
import org.example.mail.GenericResponse;
import org.example.mail.ISendMailService;
import org.example.modal.PasswordResetToken;
import org.example.modal.Users;
import org.example.response.ApiResponse;
import org.example.service.IPasswordTokenService;
import org.example.service.IUserService;
import org.example.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

import static org.example.modal.PasswordResetToken.EXPIRATION;
import static org.springframework.http.HttpStatus.CONFLICT;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Locale;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/User")
public class UserController {
    @Autowired
    private IUserService userService;
    @Autowired
    private ISendMailService sendMailService;
    @Autowired
    private MessageSource messages;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private IPasswordTokenService passwordResetToken;
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
        return userService.findUserByEmail(email);
    }
    @PostMapping("/resetPassword")
    public GenericResponse resetPassword(HttpServletRequest request,
                                         @RequestParam("email") String userEmail) {
        Users user = userService.findUserByEmail(userEmail);
        if (user == null) {
            throw new UserException("No user found with email: " + userEmail);
        }

        // Tạo token mới và thiết lập thời gian hết hạn
        PasswordResetToken token = new PasswordResetToken();
        token.setToken(UUID.randomUUID().toString());
        token.setUser(user);
        Timestamp now = new Timestamp(System.currentTimeMillis());
        Timestamp expiryDate = new Timestamp(now.getTime() + (EXPIRATION * 60 * 1000)); // 24 giờ
        token.setExpiryDate(expiryDate);
        token.setCreatedAt(now);

        // Lưu token vào cơ sở dữ liệu
        passwordResetToken.createNewPasswordToken(token);

        // Gửi email chứa token reset mật khẩu
        SimpleMailMessage mail = sendMailService.constructResetTokenEmail(
                "http://localhost:3124", request.getLocale(), token.getToken(), user);
        mailSender.send(mail);

        // Trả về thông báo thành công
        String message = messages.getMessage("message.resetPassword", null, "Vui lòng kiểm tra email của bạn", request.getLocale());
        return new GenericResponse(message);
    }

    @GetMapping("/changePassword")
    public ResponseEntity<?> showChangePasswordPage(Locale locale,
                                                    @RequestParam("token") String token) {
        String result = sendMailService.validatePasswordResetToken(token);
        if (result != null) {
            String message = messages.getMessage("auth.message." + result, null, locale);
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(new GenericResponse(message));
        }
        return ResponseEntity.ok(new GenericResponse("Token hợp lệ. Tiến hành đặt lại mật khẩu."));
    }

    @PostMapping("/savePassword")
    public GenericResponse savePassword(final Locale locale, @RequestBody UserDTO userDTO) {
        System.out.println(userDTO.getToken());
        String result = sendMailService.validatePasswordResetToken(userDTO.getToken());
        if (result != null) {
            String message = messages.getMessage("message.resetPassword", null, "Lỗi trong quá trình đặt lại mật khẩu", locale);
            return new GenericResponse(message);
        }

        Optional<Users> user = userService.getUserByPasswordResetToken(userDTO.getToken());
        if (user.isPresent()) {
            userService.changeUserPassword(user.get(), userDTO.getNewPassword());
            return new GenericResponse(messages.getMessage(
                    "message.resetPasswordSuc", null, "Thay đổi mật khẩu thành công", locale));
        } else {
            return new GenericResponse(messages.getMessage(
                    "auth.message.invalid", null, locale));
        }
    }
    private String getAppUrl(HttpServletRequest request) {
        return request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + "/api/User" + request.getContextPath();
    }
}
