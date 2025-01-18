import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


function Auth() {
  const [isLogin, setIsLogin] = useState(true); // Giriş mi kayıt mı kontrolü
  const [userName,setUserName]= useState("")
  const[password,setPassword]=useState("")
  const navigate = useNavigate();
  
  const hendleUserName = (value) =>{
    setUserName(value);
  }
  const hendlePassword = (value) =>{
    setPassword(value);
  }


  const sendRequest = (path) =>{
    fetch("http://localhost:8081/auth/"+path,
    {
        method: "POST",
        headers:{
            "Content-Type": "application/json",
        },
        body:JSON.stringify({
            userName:userName ,
            password:password ,
        }),
    })
    .then((res)=> res.json())
    .then((result) => {
      if (result && result.massage) {
        localStorage.setItem("tokenKey", result.massage);
        localStorage.setItem("currentUser", result.userId);
        localStorage.setItem("userName", userName);
        console.log(localStorage.getItem("tokenKey"))
    } else {
        console.error("Token bulunamadı: ", result);
    }
    })
    .catch((err)=> console.log(err))

}
  const handleButton = async (path) => {
    try{
    
    if(path == "login"){
       await sendRequest(path);
      setUserName("")
      setPassword("")
      navigate("/auth")
      
      

    }
     else if(path=="register"){
      sendRequest(path);
       setUserName("")
       setPassword("")
       navigate("/auth")}
    

  }catch (error) {
    console.error("Kayıt işlemi sırasında bir hata oluştu:", error);}
  };

 

  
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-center mb-4">
                {isLogin ? "Giriş Yap" : "Kayıt Ol"}
              </h3>
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Kullanıcı Adı
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-control"
                    placeholder="Kullanıcı Adınızı Girin"
                    value={userName}
                    required
                  onChange={(i) => hendleUserName(i.target.value)}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Şifre
                  </label>
                  <input
                    type="password"
                    id="password"
                    className="form-control"
                    placeholder="Şifrenizi Girin"
                    value={password}
                    required
                    onChange={(i) => hendlePassword(i.target.value)}
                  />
                </div>
                <div className="d-grid">
                {isLogin ? (
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleButton("login")}
                    >
                      Giriş Yap
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => handleButton("register")}
                    >
                      Kayıt Ol
                    </button>
                  )}
                </div>
              </form>
              <div className="text-center mt-3">
                <p>
                  {isLogin
                    ? "Hesabınız yok mu? "
                    : "Zaten bir hesabınız var mı? "}
                  <button
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => setIsLogin(!isLogin)}
                  >
                    {isLogin ? "Kayıt Ol" : "Giriş Yap"}
                  </button>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
