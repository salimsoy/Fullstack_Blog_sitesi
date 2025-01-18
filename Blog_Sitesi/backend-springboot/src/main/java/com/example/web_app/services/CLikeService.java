package com.example.web_app.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import com.example.web_app.entities.CLike;
import com.example.web_app.entities.Comment;
import com.example.web_app.entities.User;
import com.example.web_app.repos.CLikeRepository;
import com.example.web_app.requests.CLikeCreateRequest;
import com.example.web_app.responses.CLikeResponse;

@Service
public class CLikeService {
    private CLikeRepository cLikeRepository;
    private UserService userService;
    private CommentService commentService;

    public CLikeService(CLikeRepository cLikeRepository, UserService userService) {
        this.cLikeRepository = cLikeRepository;
        this.userService = userService;
    }
    
    

 
    @Autowired
    public void setCommentService(CommentService commentService) {
        this.commentService = commentService;
    }



	public List<CLikeResponse> getAllCLikes(Optional<Long> commentId, Optional<Long> userId) {
        List<CLike> cLikes;
        if (commentId.isPresent() && userId.isPresent())
            cLikes = cLikeRepository.findByCommentIdAndUserId(commentId.get(), userId.get());
        else if (commentId.isPresent())
            cLikes = cLikeRepository.findByCommentId(commentId.get());
        else if (userId.isPresent())
            cLikes = cLikeRepository.findByUserId(userId.get());
        else
            cLikes = cLikeRepository.findAll();
        return cLikes.stream().map(cLike -> new CLikeResponse(cLike)).collect(Collectors.toList());
    }

    public CLike createOneCLike(CLikeCreateRequest newCLike) {
        User user = userService.getOneUser(newCLike.getUserId());
        Comment comment = commentService.getOneComment(newCLike.getCommentId());
        if (user == null)
            return null;
        if (comment == null)
            return null;
        CLike toSave = new CLike();
        toSave.setId(newCLike.getId());
        toSave.setComment(comment);
        toSave.setUser(user);
        return cLikeRepository.save(toSave);
    }

    public CLike getOneCLike(Long cLikeId) {
        return cLikeRepository.findById(cLikeId).orElse(null);
    }

    public void deleteOneCLike(Long cLikeId) {
        cLikeRepository.deleteById(cLikeId);
    }
}
