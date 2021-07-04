package com.bobo.server.controller;

import com.bobo.server.service.BoxItemService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Map;
/**
 * 
 * @author ZB
 *
 */
@RestController
@RequestMapping(path = "/common")
public class CommonController {

    @Resource
    private BoxItemService boxItemService;

    @GetMapping(path = "/getBoxItem")
    public Object test(String boxId, String boxName){
        return boxItemService.selectBoxItem(boxId, boxName);
    }
}
