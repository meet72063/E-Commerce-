import { Rating } from "@material-tailwind/react";

export function DefaultRating({ totalReviews, averageRating }) {



    return (
        <div className="flex gap-4">
            <Rating
                value={Math.round(averageRating)}

                size="lg"
                direction="horizontal"
                readonly
            />
            <div>
                Based on {totalReviews} reviews
            </div>
        </div>
    );
}
