package com.bobo.server.controller;

import com.bobo.server.entity.user.User;
import com.bobo.server.service.UserService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/user")
public class UserController {

    @Resource
    private UserService userService;

    @GetMapping(path = "/all")
    public Object userAll(String userId, String fullName){
        return userService.selectUserList(userId, fullName);
    }

    @PostMapping(path = "/add")
    public Object addUser(@RequestBody User user){
        return userService.addUser(user);
    }

    @PostMapping(path = "/edit/{userId}")
    public Object editUser(@RequestBody User user){
        return userService.editUser(user);
    }

    @PostMapping(path = "/del/{userId}")
    public Object editUser(@PathVariable String userId){
        return userService.delUser(userId);
    }
}
