<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreStudentRequest;
use App\Http\Requests\UpdateStudentRequest;
use App\Models\Student;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class StudentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('students/index', [
            'students' => Student::all(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('students/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreStudentRequest $request)
    {
        $image = $request->file('image')?->store('students', 'public');
        $files = [];
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                $path = $file->store('student-files', 'public');
                $files[] = $path;
            }
        }

        Student::create([
            'name' => $request->name,
            'email' => $request->email,
            'image' => $image,
            'files' => $files,
        ]);

        return to_route('students.index');
    }

    public function show(Student $student)
    {
        return Inertia::render('students/show', [
            'student' => $student,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Student $student)
    {
        return Inertia::render('students/edit', [
            'student' => $student,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateStudentRequest $request, Student $student)
    {
        $image = $student->image;
        if ($request->file('image')) {
            if ($student->image) {
                Storage::disk('public')->delete($student->image);
            }
            $image = $request->file('image')->store('students', 'public');
        }

        $currentFiles = $student->files ?? [];
        $newFiles = [];
        $filesToKeep = [];

        // Process files from the request
        // Ensure 'files' input is an array, defaulting to empty array if null
        $requestedFiles = $request->input('files', []);
        if (!is_array($requestedFiles)) {
            $requestedFiles = []; // Ensure it's an array even if it's a single non-array value
        }

        foreach ($requestedFiles as $file) {
            // If it's a string, it's an existing file path to keep
            if (is_string($file)) {
                $filesToKeep[] = $file;
            }
        }

        // Handle newly uploaded files
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                if ($file instanceof \Illuminate\Http\UploadedFile) {
                    $path = $file->store('student-files', 'public');
                    $newFiles[] = $path;
                }
            }
        }

        // Identify files to delete (those in currentFiles but not in filesToKeep)
        $filesToDelete = array_diff($currentFiles, $filesToKeep);
        foreach ($filesToDelete as $file) {
            Storage::disk('public')->delete($file);
        }

        // Combine files to keep and newly uploaded files
        $updatedFiles = array_merge($filesToKeep, $newFiles);

        $student->update([
            'name' => $request->name,
            'email' => $request->email,
            'image' => $image,
            'files' => $updatedFiles,
        ]);

        return to_route('students.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Student $student)
    {
        if ($student->image) {
            Storage::disk('public')->delete($student->image);
        }
        $student->delete();

        return redirect()->route('students.index');
    }
}
