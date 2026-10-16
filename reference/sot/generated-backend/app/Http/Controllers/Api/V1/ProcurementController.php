<?php

namespace App\Http\Controllers\Api\V1;

use App\Models\Supplier;
use App\Models\PurchaseOrder;
use App\Models\PurchaseRequest;
use App\Enums\PurchaseOrderStatus;
use App\Services\InventoryMovementService;
use Illuminate\Http\Request;
use App\Exceptions\BusinessRuleException;
use Illuminate\Support\Str;

class ProcurementController extends BaseApiController
{
    public function index(Request $request)
    {
        if (str_contains($request->path(), 'suppliers')) {
            $suppliers = Supplier::query()->paginate($request->per_page ?? 20);
            return $this->success($suppliers->items());
        }
        $pos = PurchaseOrder::query()->with(['supplier', 'items', 'createdBy'])->paginate($request->per_page ?? 20);
        return $this->success($pos->items());
    }

    public function store(Request $request)
    {
        if (str_contains($request->path(), 'suppliers')) {
            $validated = $request->validate([
                'name' => ['required', 'string'],
                'phone' => ['nullable', 'string'],
                'email' => ['nullable', 'email'],
                'address' => ['nullable', 'string'],
                'contact_person' => ['nullable', 'string'],
                'account_number' => ['nullable', 'string'],
            ]);
            $validated['status'] = 'Active';
            return $this->success(Supplier::create($validated), 'Supplier created', 201);
        }
        $validated = $request->validate([
            'supplier_id' => ['required', 'exists:suppliers,id'],
            'items' => ['required', 'array', 'min:1'],
            'items.*.description' => ['required', 'string'],
            'items.*.unit' => ['nullable', 'string'],
            'items.*.quantity' => ['required', 'numeric', 'min:0.01'],
            'items.*.unit_price' => ['required', 'numeric', 'min:0'],
        ]);
        $total = collect($validated['items'])->sum(fn($i) => $i['quantity'] * $i['unit_price']);
        $po = PurchaseOrder::create([
            'po_number' => 'PO-' . date('Y') . '-' . Str::padLeft(PurchaseOrder::count() + 1, 6, '0'),
            'supplier_id' => $validated['supplier_id'],
            'created_by' => auth()->user()->staff?->id ?? 1,
            'total' => $total,
            'status' => PurchaseOrderStatus::Draft,
        ]);
        foreach ($validated['items'] as $item) {
            $po->items()->create([
                'description' => $item['description'],
                'unit' => $item['unit'] ?? 'pcs',
                'quantity' => $item['quantity'],
                'unit_price' => $item['unit_price'],
                'line_total' => $item['quantity'] * $item['unit_price'],
            ]);
        }
        return $this->success($po->load('items'), 'Purchase order created', 201);
    }

    public function approvePO(PurchaseOrder $po)
    {
        if (!in_array($po->status, [PurchaseOrderStatus::Submitted, PurchaseOrderStatus::Draft])) {
            throw new BusinessRuleException('Only draft or submitted POs can be approved.');
        }
        $po->update([
            'status' => PurchaseOrderStatus::Approved,
            'approved_by' => auth()->user()->staff?->id ?? 1,
            'approved_at' => now(),
        ]);
        return $this->success($po, 'PO approved');
    }

    public function show($id)
    {
        if (str_contains(request()->path(), 'suppliers')) {
            return $this->success(Supplier::with('purchaseOrders')->findOrFail($id));
        }
        return $this->success(PurchaseOrder::with(['supplier', 'items', 'goodsReceipts'])->findOrFail($id));
    }

    public function update(Request $request, $id)
    {
        if (str_contains($request->path(), 'suppliers')) {
            Supplier::findOrFail($id)->update($request->only(['name', 'phone', 'email', 'address', 'contact_person', 'status']));
            return $this->success(Supplier::find($id), 'Supplier updated');
        }
        PurchaseOrder::findOrFail($id)->update($request->only(['status']));
        return $this->success(PurchaseOrder::find($id), 'PO updated');
    }

    public function destroy($id)
    {
        if (str_contains(request()->path(), 'suppliers')) {
            Supplier::findOrFail($id)->delete();
        } else {
            PurchaseOrder::findOrFail($id)->delete();
        }
        return $this->success(null, 'Deleted', 204);
    }
}
