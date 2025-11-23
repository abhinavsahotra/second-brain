import { DeleteIcon } from "../Icons/DeleteIcon";
import { Document } from "../Icons/Document";
import { ShareIcon } from "../Icons/ShareIcon";

interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube",

}
export function Card(props: CardProps) {
    return <div>
        <div className="p-4 bg-white rounded-md border-gray-200 max-w-72 min-w-72 max-h-60 overflow-y-auto border ">
            <div className="flex justify-between">
                <div className="flex gap-2">
                    <div className="text-gray-500"><Document /></div>
                   <div className="font-semibold"> {props.title}
                   </div>
                </div>
                <div className="flex gap-4 text-gray-500">
                    <a href={props.link} target="_blank">
                        <ShareIcon />
                    </a>
                    <DeleteIcon />
                </div>
            </div>

            
            <div className="p-4">
            {props.type === "youtube" && <iframe className="w-full" src={props.link.replace("watch", "embed").replace("?v=","/")}title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}


            {props.type === "twitter" && <blockquote className="twitter-tweet">
                <a href={props.link.replace("x.com","twitter.com")}></a>
            </blockquote>}
            </div>
            
        </div>

    </div>
}