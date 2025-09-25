<?php

use App\Models\Student;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Transform existing files data
        foreach (Student::all() as $student) {
            if (is_array($student->files)) {
                $transformedFiles = [];
                foreach ($student->files as $file) {
                    // If it's a string, assume it's an old path and create an object
                    if (is_string($file)) {
                        $transformedFiles[] = [
                            'path' => $file,
                            'original_name' => basename($file), // Use basename as original name for existing
                        ];
                    } else {
                        // If it's already an object, keep it as is
                        $transformedFiles[] = $file;
                    }
                }
                $student->files = $transformedFiles;
                $student->save();
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Reverse the transformation (optional, but good practice)
        foreach (Student::all() as $student) {
            if (is_array($student->files)) {
                $transformedFiles = [];
                foreach ($student->files as $file) {
                    // If it's an object, extract the path
                    if (is_array($file) && isset($file['path'])) {
                        $transformedFiles[] = $file['path'];
                    } else {
                        // If it's already a string, keep it as is
                        $transformedFiles[] = $file;
                    }
                }
                $student->files = $transformedFiles;
                $student->save();
            }
        }
    }
};
