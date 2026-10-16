<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Notification;
use Illuminate\Http\Request;

class NotificationController extends BaseApiController
{
    public function index(Request $request)
    {
        $notifications = Notification::where('user_id', $request->user()->id)
            ->orderByDesc('created_at')->paginate(20);
        return $this->success($notifications->items());
    }

    public function markRead(Request $request, Notification $notification)
    {
        if ($notification->user_id !== $request->user()->id) {
            return $this->error('Not your notification.', 403);
        }
        $notification->update(['read_at' => now()]);
        return $this->success($notification, 'Marked as read');
    }

    public function markAllRead(Request $request)
    {
        Notification::where('user_id', $request->user()->id)->whereNull('read_at')->update(['read_at' => now()]);
        return $this->success(null, 'All notifications marked as read');
    }
}
