import { useEffect } from "react";
import { useUser } from "../../context/user-context";

export const UserDetail = () => {
  const {setUser, user} = useUser();
useEffect(() => {

    },[user]); 
 return (
  <div style={{padding:200}}>
    HOLA {user?.userName}
    </div>
  );
}