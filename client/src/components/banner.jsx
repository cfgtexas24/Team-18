import React from "react";

function Banner() {
    return ( 
        <div>
        <div class="w-full h-[95px] bg-[#F3ECEC]">
            <div class="flex justify-between">
                <img class="p-[24px] self-auto" src="/images/abide-logo.png"></img>
                <div className="p-[30px] font-sans text-xl font-semibold">Patient Portal</div>
            </div>
        </div>
        <div class="w-full h-[1px] bg-[#D39E94]"></div>
        </div>
     );
}

export default Banner;