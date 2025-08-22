<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class BookLog extends Model
{
    use HasFactory;
    protected $fillable = ['action', 'timestamp', 'actor_id', 'book_id'];

    public function actor()
    {
        return $this->belongsTo(User::class, 'actor_id');
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
