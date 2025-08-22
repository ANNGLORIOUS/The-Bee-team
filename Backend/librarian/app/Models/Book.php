<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Book extends Model
{
    use HasFactory;
    protected $fillable = ['title', 'author', 'isbn', 'category', 'availability'];

    public function borrowRequests()
    {
        return $this->hasMany(BorrowRequest::class);
    }

    public function inventory()
    {
        return $this->hasOne(Inventory::class);
    }

    public function logs()
    {
        return $this->hasMany(BookLog::class);
    }
}
