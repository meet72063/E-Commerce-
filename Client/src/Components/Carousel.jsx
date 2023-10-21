import { Carousel } from "@material-tailwind/react";

export default function CarouselDefault({ productmages }) {
    return (
        <Carousel className="rounded-sm" autoplay={true} loop={true}>{productmages.map((url, index) => {
            return <div className=" h-full  w-full bg-white " key={index}>
                <img
                    src={url}
                    alt="image 1"
                    className="w-full h-full md:max-h-[500px]  "

                />
            </div>
        })}



        </Carousel>
    );
}