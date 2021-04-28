package com.bobo.server.service;

import com.bobo.server.entity.user.User;

import java.util.List;

public interface UserService {

    List<User> selectUserList(String userId, String userName);
}
