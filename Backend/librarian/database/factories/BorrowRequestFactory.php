<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\User;
use App\Models\Book;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BorrowRequest>
 */
class BorrowRequestFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $borrowedAt = $this->faker->dateTimeBetween('-1 month', 'now');
        $dueAt = (clone $borrowedAt)->modify('+14 days');
        $returnedAt = $this->faker->boolean(70) // 70% chance book has been returned
            ? $this->faker->dateTimeBetween($borrowedAt, $dueAt)
            : null;

        return [
            'user_id'     => User::factory(),
            'book_id'     => Book::factory(),
            'status'      => $this->faker->randomElement(['pending', 'approved', 'rejected', 'returned']),
            'borrowed_at' => $borrowedAt,
            'due_at'      => $dueAt,
            'returned_at' => $returnedAt,
        ];
    }
}
