package com.bobo.server.service;

import com.bobo.server.dao.user.UserMapper;
import com.bobo.server.entity.user.User;
import com.bobo.server.utils.CommonUtil;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Resource
    private UserMapper userMapper;


    @Override
    public List<User> selectUserList(String userId, String fullName) {
        return userMapper.selectUserListByField(userId,fullName);
    }

    @Override
    public Integer addUser(User user) {
        user.setUserId(CommonUtil.getUUID());
        return userMapper.insertSelective(user);
    }

    @Override
    public Integer editUser(User user) {
        return userMapper.updateByPrimaryKeySelective(user);
    }

    @Override
    public Integer delUser(String userId) {
        return userMapper.deleteByPrimaryKey(userId);
    }
}
