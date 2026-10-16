<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\CmsPage;
use App\Models\CmsAnnouncement;
use App\Models\Enquiry;
use Illuminate\Http\Request;

class CmsController extends BaseApiController
{
    public function index(Request $request)
    {
        if (str_contains($request->path(), 'cms-pages')) {
            $pages = CmsPage::query()->paginate($request->per_page ?? 20);
            return $this->success($pages->items());
        }
        if (str_contains($request->path(), 'cms-announcements')) {
            $announcements = CmsAnnouncement::query()->where('status', 'Published')->paginate($request->per_page ?? 20);
            return $this->success($announcements->items());
        }
        $enquiries = Enquiry::query()->paginate($request->per_page ?? 20);
        return $this->success($enquiries->items());
    }

    public function store(Request $request)
    {
        if (str_contains($request->path(), 'cms-pages')) {
            $validated = $request->validate([
                'slug' => ['required', 'string', 'unique:cms_pages,slug'],
                'title' => ['required', 'string'],
                'content' => ['nullable', 'string'],
            ]);
            $validated['status'] = 'Draft';
            $validated['last_edited_by'] = auth()->user()->staff?->id ?? 1;
            return $this->success(CmsPage::create($validated), 'Page created', 201);
        }
        if (str_contains($request->path(), 'cms-announcements')) {
            $validated = $request->validate([
                'title' => ['required', 'string'],
                'body' => ['required', 'string'],
            ]);
            $validated['status'] = 'Draft';
            $validated['created_by'] = auth()->user()->staff?->id ?? 1;
            return $this->success(CmsAnnouncement::create($validated), 'Announcement created', 201);
        }
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'email' => ['nullable', 'email'],
            'phone' => ['nullable', 'string'],
            'subject' => ['required', 'string'],
            'message' => ['required', 'string'],
        ]);
        $validated['status'] = 'New';
        return $this->success(Enquiry::create($validated), 'Enquiry submitted', 201);
    }

    public function show($id)
    {
        if (str_contains(request()->path(), 'cms-pages')) return $this->success(CmsPage::findOrFail($id));
        if (str_contains(request()->path(), 'cms-announcements')) return $this->success(CmsAnnouncement::findOrFail($id));
        return $this->success(Enquiry::findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        if (str_contains($request->path(), 'cms-pages')) {
            CmsPage::findOrFail($id)->update($request->only(['title', 'content', 'status', 'published_at']));
            return $this->success(CmsPage::find($id), 'Page updated');
        }
        if (str_contains($request->path(), 'cms-announcements')) {
            CmsAnnouncement::findOrFail($id)->update($request->only(['title', 'body', 'status', 'published_at']));
            return $this->success(CmsAnnouncement::find($id), 'Announcement updated');
        }
        Enquiry::findOrFail($id)->update($request->only(['status']));
        return $this->success(Enquiry::find($id), 'Enquiry updated');
    }

    public function destroy($id)
    {
        if (str_contains(request()->path(), 'cms-pages')) CmsPage::findOrFail($id)->delete();
        elseif (str_contains(request()->path(), 'cms-announcements')) CmsAnnouncement::findOrFail($id)->delete();
        else Enquiry::findOrFail($id)->delete();
        return $this->success(null, 'Deleted', 204);
    }
}
