import { Document, Schema, Model, model, Types } from 'mongoose';

interface Review {
    userId: Types.ObjectId;
    targetType: 'restaurant' | 'driver';
    driverId: Types.ObjectId;
    restaurantId: Types.ObjectId,
    rating: number;
    review?: string;
}

export interface ReviewDocument extends Document, Review { }

const reviewSchema: Schema<ReviewDocument> = new Schema({
    driverId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
    restaurantId: {
        type: Schema.Types.ObjectId,
        ref: 'restaurants',
    },
    targetType: {
        type: String,
        enum: ['restaurant', 'driver'],
        required: true,
    },
    rating: {
        type: Number,
    },
    review: {
        type: String,
    },
}, {
    timestamps: true,
    versionKey: false,
});

const ReviewModel: Model<ReviewDocument> = model('Review', reviewSchema);

export default ReviewModel;
