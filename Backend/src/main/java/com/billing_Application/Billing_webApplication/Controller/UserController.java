package com.billing_Application.Billing_webApplication.Controller;

import com.billing_Application.Billing_webApplication.Service.UserService;
import com.billing_Application.Billing_webApplication.io.Loginform;
import com.billing_Application.Billing_webApplication.io.UserInfoResponse;
import com.billing_Application.Billing_webApplication.io.UserRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {

    @Autowired
    UserService userService;


    @PostMapping("/login")
    public void loginuser(@ModelAttribute Loginform loginform, HttpServletResponse response) throws Exception {
          userService.Login(loginform,response);
    }

    @GetMapping("/me")
    public UserInfoResponse fetch(){
        return userService.getUserInfo();
    }




}
