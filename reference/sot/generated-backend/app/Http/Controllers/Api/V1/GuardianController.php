<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\Api\V1\GuardianResource;
use App\Models\Guardian;
use Illuminate\Http\Request;

class GuardianController extends BaseApiController
{
    public function index(Request $request)
    {
        $this->authorize('viewAny', Guardian::class);
        $guardians = Guardian::query()->with('students')->paginate($request->per_page ?? 20);
        return $this->paginated(GuardianResource::class, $guardians);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'phone' => ['nullable', 'string', 'max:20'],
            'email' => ['nullable', 'email'],
            'occupation' => ['nullable', 'string', 'max:100'],
            'address' => ['nullable', 'string'],
        ]);
        $guardian = Guardian::create($validated);
        return $this->success(new GuardianResource($guardian), 'Guardian created', 201);
    }

    public function show(Guardian $guardian)
    {
        $guardian->load('students');
        return $this->success(new GuardianResource($guardian));
    }

    public function update(Request $request, Guardian $guardian)
    {
        $guardian->update($request->only(['first_name', 'last_name', 'phone', 'email', 'occupation', 'address']));
        return $this->success(new GuardianResource($guardian), 'Guardian updated');
    }

    public function destroy(Guardian $guardian)
    {
        $guardian->delete();
        return $this->success(null, 'Guardian deleted', 204);
    }
}
