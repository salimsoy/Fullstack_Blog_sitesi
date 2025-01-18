package com.example.web_app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;


import com.example.web_app.entities.Like;
import com.example.web_app.entities.Post;
import com.example.web_app.entities.User;
import com.example.web_app.repos.LikeRepository;
import com.example.web_app.requests.LikeCreateRequest;
import com.example.web_app.responses.LikeResponse;

@Service
public class LikeService {
	private LikeRepository likeRepository;
	private UserService userService;
	private PostService postService;


	public LikeService(LikeRepository likeRepository, UserService userService, PostService postService) {

		this.likeRepository = likeRepository;
		this.userService = userService;
		this.postService = postService;
	}

	public List<LikeResponse> getAllLike(Optional<Long> postId, Optional<Long> userId) {
		List<Like> like;
		if(postId.isPresent()&& userId.isPresent())
			like= likeRepository.findByPostIdAndUserId(postId.get(),userId.get());
		else if(postId.isPresent())
			like=likeRepository.findByPostId(postId.get());
		else if(userId.isPresent())
			like= likeRepository.findByUserId(userId.get());
		else
		    like =likeRepository.findAll();
		return like.stream().map(list -> new LikeResponse(list)).collect(Collectors.toList());
	}

	public Like createOneLike(LikeCreateRequest newLike) {
		User user=userService.getOneUser(newLike.getUserId());
		Post post =postService.getOnePostById(newLike.getPostId());
		if(user==null)
			return null;
		if(post==null)
			return null;
		Like toSave= new Like() ;
		toSave.setId(newLike.getId());
		toSave.setPost(post);
		toSave.setUser(user);
		return likeRepository.save(toSave);
	}

	public Like getOneLike(Long likeId) {
		
		return likeRepository.findById(likeId).orElse(null);
	}

	public void deleteOneLike(Long likeId) {
		likeRepository.deleteById(likeId);
		
	}
	
	
	
	

}
