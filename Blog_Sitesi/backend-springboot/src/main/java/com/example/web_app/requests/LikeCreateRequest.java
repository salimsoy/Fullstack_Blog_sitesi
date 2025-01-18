package com.example.web_app.requests;

import lombok.Data;

@Data
public class LikeCreateRequest {
	Long id;
	Long userId;
	Long postId;

}
