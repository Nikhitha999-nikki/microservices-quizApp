package com.nikhitha.quiz_service.service;

import com.nikhitha.quiz_service.dao.AppUserDao;
import com.nikhitha.quiz_service.model.AppUser;
import com.nikhitha.quiz_service.model.AuthRequest;
import com.nikhitha.quiz_service.model.AuthResponse;
import com.nikhitha.quiz_service.security.JwtService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    private final AppUserDao appUserDao;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public AuthService(AppUserDao appUserDao,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtService jwtService) {
        this.appUserDao = appUserDao;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
    }

    public ResponseEntity<AuthResponse> register(AuthRequest request) {
        if (request == null || isBlank(request.getUsername()) || isBlank(request.getPassword())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        if (appUserDao.existsByUsername(request.getUsername())) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        AppUser user = new AppUser();
        user.setUsername(request.getUsername().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");
        appUserDao.save(user);

        String token = jwtService.generateToken(user.getUsername());
        return new ResponseEntity<>(new AuthResponse(token, user.getUsername()), HttpStatus.CREATED);
    }

    public ResponseEntity<AuthResponse> login(AuthRequest request) {
        if (request == null || isBlank(request.getUsername()) || isBlank(request.getPassword())) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword())
        );

        String token = jwtService.generateToken(request.getUsername());
        return new ResponseEntity<>(new AuthResponse(token, request.getUsername()), HttpStatus.OK);
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }
}
