package com.nikhitha.quiz_service.controller;

import com.nikhitha.quiz_service.model.AuthRequest;
import com.nikhitha.quiz_service.model.AuthResponse;
import com.nikhitha.quiz_service.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("quiz/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest request) {
        return authService.register(request);
    }

    @PostMapping("login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest request) {
        return authService.login(request);
    }
}
