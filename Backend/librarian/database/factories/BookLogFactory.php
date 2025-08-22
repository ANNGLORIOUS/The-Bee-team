<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use App\Models\Book;
use App\Models\User;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\BookLog>
 */
class BookLogFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'book_id' => Book::factory(),
            'action' => $this->faker->randomElement(['added', 'updated', 'borrowed', 'returned']),
            'timestamp' => now(),
            'actor_id' => User::factory(),
        ];
    }
}
