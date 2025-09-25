<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    /** @use HasFactory<\Database\Factories\StudentFactory> */

    // protected $guarded = [];

    // fillable hosse ei 2 ta value ditei hobe
    protected $fillable = [
        'name',
        'email',
        'image',
        'files',
    ];

    protected $casts = [
        'files' => 'array',
    ];
    use HasFactory;
}
