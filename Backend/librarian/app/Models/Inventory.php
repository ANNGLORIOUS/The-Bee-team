<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;


class Inventory extends Model
{
    use HasFactory;
    protected $fillable = ['book_id', 'shelf_location', 'condition'];

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}
