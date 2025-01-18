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

import com.example.web_app.entities.Like;
import com.example.web_app.requests.LikeCreateRequest;
import com.example.web_app.responses.LikeResponse;
import com.example.web_app.services.LikeService;


@RestController
@RequestMapping("/likes")
public class LikeController {
	private LikeService likeService;

	public LikeController(LikeService likeService) {
		this.likeService = likeService;
	}
	
	@GetMapping
	public List<LikeResponse> getAllLike(@RequestParam Optional<Long> postId,@RequestParam Optional<Long> userId){
		return likeService.getAllLike(postId,userId);
	}
	@PostMapping
	public Like createOneLike (@RequestBody LikeCreateRequest newLike) {
		return likeService.createOneLike(newLike);
	}
	@GetMapping("/{likeId}")
	public Like getOneLike(@PathVariable Long likeId) {
		return likeService.getOneLike(likeId);
		
	}
	@DeleteMapping("/{likeId}")
	public void deleteOneLike(@PathVariable Long likeId) {
		likeService.deleteOneLike(likeId);
		
	}
	

}
