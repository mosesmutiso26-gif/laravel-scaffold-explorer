<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\LibraryBook;
use App\Services\LibraryCirculationService;
use Illuminate\Http\Request;

class LibraryController extends BaseApiController
{
    public function __construct(private LibraryCirculationService $circulationService) {}

    public function index(Request $request)
    {
        $query = LibraryBook::query()->with('copies');
        if ($request->filled('search')) {
            $s = $request->search;
            $query->where(fn($q) => $q->where('title', 'like', "%{$s}%")->orWhere('author', 'like', "%{$s}%")->orWhere('isbn', 'like', "%{$s}%"));
        }
        if ($request->filled('category')) $query->where('category', $request->category);
        $books = $query->paginate($request->per_page ?? 20);
        return $this->success($books->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'isbn' => ['required', 'string', 'unique:library_books,isbn'],
            'title' => ['required', 'string'],
            'author' => ['required', 'string'],
            'publisher' => ['nullable', 'string'],
            'category' => ['nullable', 'string'],
            'publication_year' => ['nullable', 'integer'],
            'total_copies' => ['nullable', 'integer', 'min:1'],
            'shelf_location' => ['nullable', 'string'],
        ]);
        $validated['available_copies'] = $validated['total_copies'] ?? 1;
        $book = LibraryBook::create($validated);
        for ($i = 1; $i <= $book->total_copies; $i++) {
            $book->copies()->create(['copy_number' => 'C-' . str_pad($i, 3, '0', STR_PAD_LEFT), 'status' => 'Available']);
        }
        return $this->success($book, 'Book added', 201);
    }

    public function show(LibraryBook $libraryBook)
    {
        $libraryBook->load('copies');
        return $this->success($libraryBook);
    }

    public function update(Request $request, LibraryBook $libraryBook)
    {
        $libraryBook->update($request->only(['title', 'author', 'publisher', 'category', 'shelf_location']));
        return $this->success($libraryBook, 'Book updated');
    }

    public function destroy(LibraryBook $libraryBook)
    {
        $libraryBook->delete();
        return $this->success(null, 'Book deleted', 204);
    }

    public function issueLoan(Request $request)
    {
        $validated = $request->validate([
            'copy_id' => ['required', 'exists:library_copies,id'],
            'student_id' => ['required', 'exists:students,id'],
            'due_date' => ['required', 'date'],
        ]);
        $loan = $this->circulationService->issueLoan(
            $validated['copy_id'], $validated['student_id'],
            auth()->user()->staff?->id ?? 1, $validated['due_date']
        );
        return $this->success($loan, 'Loan issued', 201);
    }

    public function returnLoan(Request $request, int $loan)
    {
        $loan = \App\Models\LibraryLoan::findOrFail($loan);
        $returned = $this->circulationService->returnLoan($loan->id, auth()->user()->staff?->id ?? 1);
        return $this->success($returned, 'Book returned');
    }
}
