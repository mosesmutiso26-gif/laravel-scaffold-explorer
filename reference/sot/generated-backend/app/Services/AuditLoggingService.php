<?php

namespace App\Services;

use App\Models\AuditEntry;
use Illuminate\Support\Facades\Request;

class AuditLoggingService
{
    public function record(string $action, string $auditableType, int $auditableId, ?array $before = null, ?array $after = null): AuditEntry
    {
        return AuditEntry::create([
            'actor_id' => auth()->id(),
            'action' => $action,
            'auditable_type' => $auditableType,
            'auditable_id' => $auditableId,
            'before' => $before,
            'after' => $after,
            'ip_address' => Request::ip(),
            'correlation_id' => request()->attributes->get('correlation_id'),
        ]);
    }
}
