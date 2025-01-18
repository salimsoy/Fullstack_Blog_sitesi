package com.example.web_app.security;

import java.nio.charset.StandardCharsets;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;
import java.security.Key;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.WeakKeyException;




@Component
public class JwtTokenProvider {
    @Value("${questapp.app.secret}")
    private String APP_SECRET;

    @Value("${questapp.expires.in}")
    private Long EXPIRES_IN;

    private Key key;

    private Key getSigningKey() {
        if (key == null) {
            // Anahtarın boyutunun yeterli olduğundan emin olun.
            byte[] keyBytes = APP_SECRET.getBytes(StandardCharsets.UTF_8);
            
            // HS256 için anahtarın boyutunun 256 bit olması gerektiğinden, aşağıdaki şekilde boyut kontrolü yapabilirsiniz.
            if (keyBytes.length < 32) {
                keyBytes = new byte[32]; // 256 bit anahtar boyutu sağlanır.
                System.arraycopy(APP_SECRET.getBytes(StandardCharsets.UTF_8), 0, keyBytes, 0, Math.min(APP_SECRET.length(), 32));
            }

            key = Keys.hmacShaKeyFor(keyBytes);
        }
        return key;
    }

    public String generateJwtToken(Authentication auth) {
        JwtUserDetails userDetails = (JwtUserDetails) auth.getPrincipal();  // Kullanıcı detaylarını alır
        Date expireDate = new Date(new Date().getTime() + EXPIRES_IN);  // Token'ın son geçerlilik tarihi
        return Jwts.builder()
                .setSubject(Long.toString(userDetails.getId()))  // Kullanıcı ID'sini subject olarak ayarlar
                .setIssuedAt(new Date())  // Token'ın verildiği zaman
                .setExpiration(expireDate)  // Token'ın bitiş zamanı
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)  // HMAC-SHA256 ile imzalar
                .compact();
    }

    Long getUserIdFromJwt(String token) {
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
        return Long.parseLong(claims.getSubject());
    }

    boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token);
            return !isTokenExpired(token);
        } catch (UnsupportedJwtException | MalformedJwtException | WeakKeyException | IllegalArgumentException | ExpiredJwtException e) {
            return false;
        }
    }

    private boolean isTokenExpired(String token) {
        Date expiration = Jwts.parserBuilder()
                .setSigningKey(getSigningKey())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getExpiration();
        return expiration.before(new Date());
    }
}
