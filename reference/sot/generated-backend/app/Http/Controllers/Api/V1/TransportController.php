<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Vehicle;
use App\Models\TransportRoute;
use App\Models\TransportAssignment;
use Illuminate\Http\Request;

class TransportController extends BaseApiController
{
    public function index(Request $request)
    {
        $vehicles = Vehicle::query()->with('routes')->paginate($request->per_page ?? 20);
        return $this->success($vehicles->items());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'registration' => ['required', 'string', 'unique:vehicles,registration'],
            'make' => ['nullable', 'string'],
            'model' => ['nullable', 'string'],
            'capacity' => ['required', 'integer', 'min:1'],
            'type' => ['required', 'in:Bus,Van,Minibus'],
        ]);
        $validated['status'] = 'Active';
        $vehicle = Vehicle::create($validated);
        return $this->success($vehicle, 'Vehicle created', 201);
    }

    public function show(Vehicle $vehicle)
    {
        $vehicle->load('routes');
        return $this->success($vehicle);
    }

    public function update(Request $request, Vehicle $vehicle)
    {
        $vehicle->update($request->only(['make', 'model', 'capacity', 'status', 'insurance_expiry', 'inspection_expiry']));
        return $this->success($vehicle, 'Vehicle updated');
    }

    public function destroy(Vehicle $vehicle)
    {
        $vehicle->delete();
        return $this->success(null, 'Vehicle deleted', 204);
    }
}
