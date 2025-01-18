package com.example.web_app.repos;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.web_app.entities.User;
   // jparepositoryde hazır queryler var ve bunları kullanabiliyoruz bu yüzden bunu kullandık
public interface UserRepository extends JpaRepository<User, Long> {

	User findByUserName(String userName);
	

}
