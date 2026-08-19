package com.billing_Application.Billing_webApplication.Configuration;

import com.billing_Application.Billing_webApplication.Service.CustomUserDetailService;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class CustomJwtFilter extends OncePerRequestFilter {

    @Autowired
    JwtHelper jwtHelper;

    @Autowired
    CustomUserDetailService customUserDetailsService;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String token = null;
        String username = null;

        // Don't process JWT for login/register
        String path = request.getServletPath();

        if (path.equals("/user/login") ||
                path.equals("/user/add")) {

            filterChain.doFilter(request, response);
            return;
        }

        // 1. Check Authorization Header
        String authHeader = request.getHeader("Authorization");

        if (authHeader != null && authHeader.startsWith("Bearer ")) {
            token = authHeader.substring(7);
        }

        // 2. If not found, check Cookie
        if (token == null && request.getCookies() != null) {

            for (Cookie cookie : request.getCookies()) {

                if ("token".equals(cookie.getName())) {
                    token = cookie.getValue();
                    break;
                }
            }
        }

        System.out.println("AUTH HEADER = " + authHeader);
        System.out.println("TOKEN PRESENT = " + (token != null));

        // 3. Validate token
        if (token != null) {

            try {

                username = jwtHelper.extractUsername(token);

                if (username != null &&
                        SecurityContextHolder
                                .getContext()
                                .getAuthentication() == null) {

                    UserDetails user =
                            customUserDetailsService
                                    .loadUserByUsername(username);

                    if (jwtHelper.validateToken(token, user)) {

                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(
                                        user,
                                        null,
                                        user.getAuthorities()
                                );

                        authToken.setDetails(
                                new WebAuthenticationDetailsSource()
                                        .buildDetails(request)
                        );

                        SecurityContextHolder
                                .getContext()
                                .setAuthentication(authToken);
                    }
                }

            } catch (ExpiredJwtException e) {

                System.out.println("JWT has expired");

                // Do NOT stop the filter chain.
                // Just treat the user as unauthenticated.

            } catch (Exception e) {

                System.out.println("Invalid JWT");

                // Do NOT stop the filter chain.
            }
        }

        filterChain.doFilter(request, response);
    }
}