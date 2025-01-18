package com.example.web_app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import com.example.web_app.entities.Like;
import com.example.web_app.entities.Post;
import com.example.web_app.entities.User;
import com.example.web_app.repos.PostRepository;
import com.example.web_app.requests.PostCreateRequest;
import com.example.web_app.requests.PostUpdateRequest;
import com.example.web_app.responses.LikeResponse;
import com.example.web_app.responses.PostResponse;

@Service
public class PostService {
	private PostRepository postRepository;
	private UserService userService;
	private LikeService likeService;
	

	public PostService(PostRepository postRepository, UserService userService) {
		this.postRepository = postRepository;
		this.userService = userService;
	}
	@Autowired
	public void setLikeService(LikeService likeService) {
		this.likeService=likeService;
	}
	
	 


	public List<PostResponse> getAllPost(Optional<Long> userId) {
		List<Post> list;
		if(userId.isPresent()) {
			list= postRepository.findByUserId(userId.get());}
		else {
		list=postRepository.findAll();}
		
		return list.stream().map(p ->{ 
		List<LikeResponse> likes = likeService.getAllLike(Optional.of(p.getId()),  Optional.empty());
		return new PostResponse(p,likes);}).collect(Collectors.toList());
		
		
		
	}

	public Post saveOnePost(Post newPost) {
		return postRepository.save(newPost);
	}

	public Post getOnePostById(Long postId) {
		return postRepository.findById(postId).orElse(null);
		
	}

	public Post createOnePost(PostCreateRequest newPostRequest) {
	   User user= userService.getOneUser(newPostRequest.getUserId());
	   if(user==null)
		   return null;
	   Post toSave= new Post();
	   toSave.setId(newPostRequest.getId());
	   toSave.setText(newPostRequest.getText());
	   toSave.setTitle(newPostRequest.getTitle());
	   toSave.setUser(user);
		return postRepository.save(toSave);
	}


	public Post updateOnePostById(Long postId, PostUpdateRequest updatePost) {
		Optional<Post> post = postRepository.findById(postId);
		if(post.isPresent()) {
			Post toUpdate=post.get();
			toUpdate.setText(updatePost.getText());
			toUpdate.setTitle(updatePost.getTitle());
			postRepository.save(toUpdate);
			return toUpdate;
		}
	 return null;
	}


	public void deleteOnePostById(Long postId) {
		postRepository.deleteById(postId);
	
		
	}
	


	

}
