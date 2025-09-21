
import React, { useState } from "react";
// import { useEffect } from "react";
import { createContext } from "react";
export const AuthContext = createContext();
 
export const AuthProvider = ({ children }) => {
  // const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [token, setToken] = useState("");
  const [isLogin, setIsLogin] = useState(token ? true : false);
  const [userName, setUserName] = useState("")
  const [isSlideOpen, setIsSlideOpen] = useState(true)
    const [showOption, setShowOption] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
      const [previewFile, setPreviewFile] = useState(null)
      const [file, setFile] = useState(null)
      const [isUploaded, setIsUploaded] = useState(file ? true : false)

  // useEffect(() => {
  //   setIsLogin(token ? true : false);
  // }, [token]);

  return (
    <AuthContext.Provider value={{ isLogin, setIsLogin, token, setToken,userName,setUserName,isSlideOpen,setIsSlideOpen,showOption,setShowOption,isSubmit,setIsSubmit,previewFile,setPreviewFile,file, setFile, isUploaded, setIsUploaded }}>
      {children}
    </AuthContext.Provider>
  );
};
