'use client';
import { addReview } from '@/action/user.action';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
type Props = {
    params: {
      event_id: number;
    };
  };

export default function Page({ params }: Props) {
    const [rating, setRating] = useState<number | ''>('');
    const [review, setReview] = useState<string>('');
    const [error, setError] = useState<string>('');
    const session = useSession();

    const event_id = params.event_id;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (session.status === 'unauthenticated') {
            alert('Anda harus login terlebih dahulu.');
            return;
        }

        const access_token = session.data?.user.access_token;
        
        if (rating === '' || review.trim() === '') {
            setError('Rating dan review harus diisi.');
            return;
        }
        setError('');

        console.log('Rating:', rating);
        console.log('Review:', review);

        await addReview(String(access_token), event_id ,review, rating );

        // setRating('');
        // setReview('');
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
