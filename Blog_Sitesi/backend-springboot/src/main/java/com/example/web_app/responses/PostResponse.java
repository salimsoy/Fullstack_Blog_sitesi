package com.example.web_app.responses;

import java.util.List;

import com.example.web_app.entities.Like;
import com.example.web_app.entities.Post;

import lombok.Data;

@Data
public class PostResponse {
	
	Long id;
	Long userId;
	String userName;
	String title;
	String text;
	List <LikeResponse> postLikes;
	
	public PostResponse (Post p, List<LikeResponse> likes) {
		this.id=p.getId();
		this.userId=p.getUser().getId();
		this.userName=p.getUser().getUserName();
		this.title=p.getTitle();
		this.text=p.getText();
		this.postLikes=likes;
		
	}
	

}
