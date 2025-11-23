import type { ReactElement } from "react"; 

export function SidebarItem({text, icon}: { 
    text: string; 
    icon: ReactElement; 
}) {
    return (
        <div className="flex text-gray-700 p-3 cursor-pointer hover:bg-gray-200 rounded max-w-100 pl-4 transition-all duration-150">
            <div className="pr-2">
                {icon} 
            </div>
            <div>
                {text} 
            </div>
        </div>
    );
}
