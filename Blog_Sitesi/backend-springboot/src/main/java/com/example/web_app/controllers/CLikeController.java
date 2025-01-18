package com.example.web_app.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.web_app.entities.CLike;
import com.example.web_app.requests.CLikeCreateRequest;
import com.example.web_app.responses.CLikeResponse;
import com.example.web_app.services.CLikeService;

@RestController
@RequestMapping("/clikes")
public class CLikeController {
    private CLikeService cLikeService;

    public CLikeController(CLikeService cLikeService) {
        this.cLikeService = cLikeService;
    }

    @GetMapping
    public List<CLikeResponse> getAllCLikes(@RequestParam Optional<Long> commentId, @RequestParam Optional<Long> userId) {
        return cLikeService.getAllCLikes(commentId, userId);
    }

    @PostMapping
    public CLike createOneCLike(@RequestBody CLikeCreateRequest newCLike) {
        return cLikeService.createOneCLike(newCLike);
    }

    @GetMapping("/{cLikeId}")
    public CLike getOneCLike(@PathVariable Long cLikeId) {
        return cLikeService.getOneCLike(cLikeId);
    }

    @DeleteMapping("/{cLikeId}")
    public void deleteOneCLike(@PathVariable Long cLikeId) {
        cLikeService.deleteOneCLike(cLikeId);
    }
}
