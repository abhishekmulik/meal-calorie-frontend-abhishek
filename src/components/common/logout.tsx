import { useLogout } from "@/hooks/useLogout";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";


function Logout() {
    const logout = useLogout();
  return (
    <Button variant={"outline"} onClick={logout}><LogOut/></Button>
  )
}

export default Logout