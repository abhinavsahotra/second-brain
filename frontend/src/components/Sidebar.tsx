import { Logo } from "../Icons/Logo";
import { TwitterIcon } from "../Icons/TwitterIcon";
import { YoutubeIcon } from "../Icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar() {
    return(
        <div className="h-screen bg-white fixed left-0 top-0 pl-4">
            <div className="flex gap-4 pt-6 text-2xl text-black">
               <div className="text-purple-800"><Logo/></div> Second-Brain
            </div>
            <nav className="pt-2 m-4">
                <SidebarItem text={"Youtube"} icon={<YoutubeIcon/>}/>
                <SidebarItem text={"Twitter"} icon={<TwitterIcon/>}/>
            </nav>
        </div>
    )
}