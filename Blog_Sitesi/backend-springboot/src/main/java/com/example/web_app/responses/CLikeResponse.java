package com.example.web_app.responses;

import com.example.web_app.entities.CLike;

import lombok.Data;

@Data
public class CLikeResponse {
	Long id;
	Long commentId;;
	Long userId;
	public CLikeResponse(CLike entity) {
	
		this.id = entity.getId();
		this.commentId = entity.getComment().getId();
		this.userId = entity.getUser().getId();
	}
	
	
	
	

}
