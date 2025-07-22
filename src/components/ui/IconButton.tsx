import React from "react";

type IconButtonProps = {
    onClick:()=> void;
    Icon:React.ElementType;
    title?:string;
    size?:number;
    className?:string;
}

 const IconButton:React.FC<IconButtonProps> = ({onClick, Icon,title,size = 16,className="cursor-pointer"}) =>(
    <button onClick={onClick} title={title} className={className} >
        <Icon size={size} />
    </button>
)

export default IconButton;