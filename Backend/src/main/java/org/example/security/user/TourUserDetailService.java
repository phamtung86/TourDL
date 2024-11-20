package org.example.security.user;
import org.example.exception.UserNameNotFoundException;
import org.example.modal.Users;
import org.example.reponsitory.UserReponsitory;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service

public class TourUserDetailService implements UserDetailsService {
    private final UserReponsitory userReponsitory;

    public TourUserDetailService(UserReponsitory userReponsitory) {
        this.userReponsitory = userReponsitory;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Users users = Optional.ofNullable(userReponsitory.findByEmail(email))
                .orElseThrow(()->new UserNameNotFoundException("User not found"));
        return TourUserDetail.buildUserDetails(users);
    }
}
