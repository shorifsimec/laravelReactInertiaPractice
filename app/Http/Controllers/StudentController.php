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
                $files[] = [
                    'path' => $path,
                    'original_name' => $file->getClientOriginalName(),
                ];
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

        $currentFiles = $student->files ?? []; // This will now be an array of objects
        $filesToKeep = []; // Will store objects {path, original_name}
        $newlyUploadedFiles = []; // Will store objects {path, original_name}

        // Process files from the request (these are the files the frontend wants to keep/add)
        $requestedFiles = $request->input('files', []);
        if (!is_array($requestedFiles)) {
            $requestedFiles = [];
        }

        foreach ($requestedFiles as $file) {
            // If it's an array, it's an existing file object {path, original_name} to keep
            if (is_array($file) && isset($file['path']) && isset($file['original_name'])) {
                $filesToKeep[] = $file;
            }
        }

        // Handle newly uploaded files (these are actual UploadedFile instances)
        if ($request->hasFile('files')) {
            foreach ($request->file('files') as $file) {
                if ($file instanceof \Illuminate\Http\UploadedFile) {
                    $path = $file->store('student-files', 'public');
                    $newlyUploadedFiles[] = [
                        'path' => $path,
                        'original_name' => $file->getClientOriginalName(),
                    ];
                }
            }
        }

        // Identify files to delete
        // Get paths of files that were originally on the student record
        $currentFilePaths = array_column($currentFiles, 'path');
        // Get paths of files that the frontend wants to keep
        $filesToKeepPaths = array_column($filesToKeep, 'path');

        $filesToDeletePaths = array_diff($currentFilePaths, $filesToKeepPaths);

        foreach ($filesToDeletePaths as $path) {
            Storage::disk('public')->delete($path);
        }

        // Combine files to keep and newly uploaded files
        $updatedFiles = array_merge($filesToKeep, $newlyUploadedFiles);

        $updated = $student->update([
            'name' => $request->name,
            'email' => $request->email,
            'image' => $image,
            'files' => $updatedFiles,
        ]);

        // If no attributes were changed by the update method, explicitly touch the model
        // to ensure the 'updated_at' timestamp is updated.
        if (!$updated) {
            $student->touch();
        }

        return to_route('students.index')->with('success', 'Student updated successfully.');
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
