package com.bobo.server.controller;

import com.bobo.server.service.UserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping(path = "/all")
    public Object test(String userId, String userName){
        return userService.selectUserList(userId, userName);
    }
}
