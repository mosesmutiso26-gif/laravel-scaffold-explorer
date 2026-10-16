<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SchoolSetting extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'motto', 'address', 'phone', 'email', 'logo_path', 'timezone', 'currency_code', 'currency_symbol'];
}
