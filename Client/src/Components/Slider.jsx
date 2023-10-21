
export function SliderCustomStyles({ rating }) {
    return (
        <div className="">
            <div className="h-4 bg-white  border">
                <div
                    className="h-4 bg-[#2ec946] "
                    style={{ width: `${rating.toFixed(1)}%` }}
                ></div>
            </div>
        </div>
    );
}


