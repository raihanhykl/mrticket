'use client';
import React, { useState } from 'react';

export default function Page() {
    const [rating, setRating] = useState<number | ''>('');
    const [review, setReview] = useState<string>('');
    const [error, setError] = useState<string>('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Validasi
        if (rating === '' || review.trim() === '') {
            setError('Rating dan review harus diisi.');
            return;
        }

        // Reset error jika validasi berhasil
        setError('');

        // Logic pengiriman form
        console.log('Rating:', rating);
        console.log('Review:', review);
        
        // Clear form after submission
        setRating('');
        setReview('');
    };

    return (
        <div className="max-w-screen-xl mx-auto p-9">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                    <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
                        Rating (1-5)
                    </label>
                    <input
                        id="rating"
                        name="rating"
                        type="number"
                        min={1}
                        max={5}
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Masukkan rating"
                    />
                </div>

                <div>
                    <label htmlFor="review" className="block text-sm font-medium text-gray-700">
                        Review
                    </label>
                    <textarea
                        id="review"
                        name="review"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                        className="mt-1 p-2 border rounded w-full"
                        placeholder="Tulis ulasan Anda"
                        rows={4}
                    />
                </div>

                {error && <p className="text-red-500">{error}</p>}

                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
