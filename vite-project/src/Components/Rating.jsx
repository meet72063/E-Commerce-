import React, { useState } from "react";
import { Rating } from "@material-tailwind/react";

export function DefaultRating() {
    const [rating, setRating] = useState(3);



    return (
        <div className="flex gap-4">
            <Rating
                value={rating}

                size="lg"
                direction="horizontal"
                readonly
            />
            <div>
                Based on 2 reviews
            </div>
        </div>
    );
}
