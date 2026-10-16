<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\AuditEntry;
use Illuminate\Http\Request;

class AuditController extends BaseApiController
{
    public function index(Request $request)
    {
        $query = AuditEntry::query()->with('actor');
        if ($request->filled('action')) $query->where('action', $request->action);
        if ($request->filled('auditable_type')) $query->where('auditable_type', $request->auditable_type);
        $entries = $query->orderByDesc('created_at')->paginate($request->per_page ?? 50);
        return $this->success($entries->items());
    }
}
