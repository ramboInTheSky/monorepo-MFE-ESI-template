export class ReviewStarsApiContract {
    itemNumber!: string
    totalReviewCount!: number
    overallStarRating!: number
}

export interface ReviewStarsData {
    id: string
    totalReviewCount: number
    overallStarRating: number
    baseUrl: string
}
