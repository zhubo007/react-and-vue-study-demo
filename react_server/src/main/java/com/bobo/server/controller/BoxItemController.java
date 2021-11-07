package com.bobo.server.controller;

import com.bobo.server.entity.boxItem.BoxItem;
import com.bobo.server.service.BoxItemService;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;

@RestController
@RequestMapping(path = "/boxItem")
public class BoxItemController {

    @Resource
    private BoxItemService boxItemService;

    @GetMapping(path = "/all")
    public Object getAllProject(String boxCodeP){
        return boxItemService.selectBoxItem(boxCodeP);
    }

    @PostMapping(path = "/add")
    public Object addProject(@RequestBody BoxItem boxItem){
        return boxItemService.addBoxItem(boxItem);
    }

    @PostMapping(path = "/update/{boxId}")
    public Object updateProject(@RequestBody BoxItem boxItem){
        return boxItemService.updateBoxItem(boxItem);
    }

    @PostMapping(path = "/delete/{boxId}")
    public Object deleteProject(@PathVariable(name = "boxId") Integer boxId){
        return boxItemService.deleteBoxItem(boxId);
    }
}
