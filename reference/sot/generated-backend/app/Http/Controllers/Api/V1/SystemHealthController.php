<?php

namespace App\Http\Controllers\Api\V1;

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

class SystemHealthController extends BaseApiController
{
    public function health()
    {
        $checks = [
            'database' => $this->checkDatabase(),
            'redis' => $this->checkRedis(),
        ];
        $allHealthy = collect($checks)->every(fn($c) => $c === 'ok');
        return $this->success([
            'status' => $allHealthy ? 'healthy' : 'degraded',
            'checks' => $checks,
            'timestamp' => now()->toIso8601String(),
        ]);
    }

    private function checkDatabase(): string
    {
        try {
            DB::select('SELECT 1');
            return 'ok';
        } catch (\Exception) {
            return 'error';
        }
    }

    private function checkRedis(): string
    {
        try {
            Cache::put('health_check', true, 10);
            return Cache::get('health_check') ? 'ok' : 'error';
        } catch (\Exception) {
            return 'error';
        }
    }
}
