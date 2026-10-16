import { useSyncExternalStore } from 'react';

export type SupplierStatus = 'Active' | 'Inactive' | 'Pending review';
export type RequisitionStatus = 'Draft' | 'Submitted' | 'Under review' | 'Approved' | 'Rejected' | 'Converted';
export type RequisitionPriority = 'Low' | 'Normal' | 'High' | 'Urgent';
export type QuotationStatus = 'Pending' | 'Submitted' | 'Evaluated' | 'Recommended' | 'Not recommended';
export type PurchaseOrderStatus = 'Draft' | 'Pending approval' | 'Approved' | 'Sent' | 'Partially received' | 'Received' | 'Cancelled';
export type GRNStatus = 'Draft' | 'Finalized' | 'Reversed';
export type ItemCategory = 'Stationery' | 'Textbooks' | 'Laboratory' | 'Cleaning' | 'Kitchen' | 'Boarding' | 'Uniforms' | 'Sports' | 'Maintenance' | 'ICT' | 'Furniture' | 'Medical';
export type MovementType = 'Goods receipt' | 'Issue' | 'Return to store' | 'Transfer in' | 'Transfer out' | 'Adjustment' | 'Damage' | 'Write-off' | 'Opening balance';
export type IssueStatus = 'Draft' | 'Submitted' | 'Approved' | 'Partially issued' | 'Issued' | 'Acknowledged' | 'Closed' | 'Rejected';
export type TransferStatus = 'Requested' | 'Approved' | 'Dispatched' | 'In transit' | 'Received' | 'Completed';
export type StockCountStatus = 'Open' | 'Counted' | 'Recount' | 'Approved' | 'Posted';
export type InvoiceStatus = 'Pending' | 'Matched' | 'Discrepancy' | 'Approved' | 'Paid';

export type Supplier = {
  id: string;
  code: string;
  name: string;
  category: string;
  contact: string;
  phone: string;
  email: string;
  address: string;
  paymentTerms: string;
  status: SupplierStatus;
  deliveryPerformance: number;
  totalOrders: number;
  totalValue: number;
};

export type RequisitionLine = {
  id: string;
  itemCode: string;
  description: string;
  quantity: number;
  unit: string;
  estimatedUnitPrice: number;
  total: number;
};

export type Requisition = {
  id: string;
  reference: string;
  requester: string;
  department: string;
  date: string;
  requiredBy: string;
  priority: RequisitionPriority;
  justification: string;
  budgetCategory: string;
  lines: RequisitionLine[];
  totalEstimate: number;
  status: RequisitionStatus;
  approvedBy: string | null;
  approvalNote: string;
};

export type Quotation = {
  id: string;
  rfqRef: string;
  supplierId: string;
  supplierName: string;
  poRef: string;
  amount: number;
  deliveryDays: number;
  status: QuotationStatus;
  submittedDate: string;
  evaluationNote: string;
};

export type PurchaseOrderLine = {
  id: string;
  itemCode: string;
  description: string;
  quantity: number;
  unit: string;
  unitPrice: number;
  total: number;
  receivedQty: number;
};

export type PurchaseOrder = {
  id: string;
  poNumber: string;
  supplierId: string;
  supplierName: string;
  requisitionRef: string;
  department: string;
  lines: PurchaseOrderLine[];
  total: number;
  deliveryLocation: string;
  requiredDate: string;
  paymentTerms: string;
  status: PurchaseOrderStatus;
  approvedBy: string | null;
  createdBy: string;
  createdDate: string;
};

export type GRNLine = {
  id: string;
  itemCode: string;
  description: string;
  orderedQty: number;
  deliveredQty: number;
  acceptedQty: number;
  rejectedQty: number;
  batch: string;
  expiry: string | null;
};

export type GoodsReceivedNote = {
  id: string;
  grnNumber: string;
  poId: string;
  poNumber: string;
  supplierName: string;
  deliveryNote: string;
  deliveryDate: string;
  store: string;
  lines: GRNLine[];
  status: GRNStatus;
  receivedBy: string;
  inspectedBy: string;
  discrepancy: string;
};

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  category: ItemCategory;
  unit: string;
  store: string;
  onHand: number;
  reorderLevel: number;
  maxLevel: number;
  reorderQty: number;
  unitCost: number;
  batchTracked: boolean;
  expiryTracked: boolean;
  status: 'Active' | 'Inactive';
  preferredSupplierId: string | null;
};

export type StockMovement = {
  id: string;
  itemCode: string;
  itemName: string;
  type: MovementType;
  quantity: number;
  unit: string;
  store: string;
  reference: string;
  date: string;
  user: string;
  reason: string;
  balanceAfter: number;
};

export type IssueRequest = {
  id: string;
  reference: string;
  department: string;
  requester: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  purpose: string;
  requiredDate: string;
  status: IssueStatus;
  issuedQty: number;
  storekeeper: string;
  date: string;
};

export type StockTransfer = {
  id: string;
  reference: string;
  fromStore: string;
  toStore: string;
  itemCode: string;
  itemName: string;
  quantity: number;
  unit: string;
  status: TransferStatus;
  dispatchedBy: string;
  receivedBy: string | null;
  dispatchDate: string;
  receiptDate: string | null;
};

export type StockCountLine = {
  id: string;
  itemCode: string;
  itemName: string;
  expectedQty: number;
  countedQty: number;
  variance: number;
  note: string;
};

export type StockCount = {
  id: string;
  reference: string;
  store: string;
  date: string;
  counter: string;
  status: StockCountStatus;
  lines: StockCountLine[];
};

export type SupplierInvoice = {
  id: string;
  invoiceNumber: string;
  supplierId: string;
  supplierName: string;
  poRef: string;
  grnRef: string;
  amount: number;
  date: string;
  status: InvoiceStatus;
  discrepancy: string;
};

export type ProcurementNotification = {
  id: string;
  recipient: string;
  title: string;
  detail: string;
  unread: boolean;
  createdDate: string;
};

export type ProcurementAuditEntry = {
  id: string;
  actor: string;
  action: string;
  target: string;
  timestamp: string;
};

export type ProcurementDemoState = {
  suppliers: Supplier[];
  requisitions: Requisition[];
  quotations: Quotation[];
  purchaseOrders: PurchaseOrder[];
  grns: GoodsReceivedNote[];
  inventory: InventoryItem[];
  movements: StockMovement[];
  issues: IssueRequest[];
  transfers: StockTransfer[];
  stockCounts: StockCount[];
  invoices: SupplierInvoice[];
  notifications: ProcurementNotification[];
  audit: ProcurementAuditEntry[];
};

const seed: ProcurementDemoState = {
  suppliers: [
    { id: 'sup-001', code: 'SUP-001', name: 'Textbook Centre Ltd', category: 'Textbooks', contact: 'James Mwangi', phone: '0711 234 567', email: 'sales@textbookcentre.co.ke', address: 'Kijabe Street, Nairobi', paymentTerms: 'Net 30', status: 'Active', deliveryPerformance: 92, totalOrders: 14, totalValue: 1850000 },
    { id: 'sup-002', code: 'SUP-002', name: 'Office Point Kenya', category: 'Stationery', contact: 'Grace Wanjiru', phone: '0722 345 678', email: 'orders@officepoint.co.ke', address: 'Moi Avenue, Nairobi', paymentTerms: 'Net 14', status: 'Active', deliveryPerformance: 88, totalOrders: 22, totalValue: 420000 },
    { id: 'sup-003', code: 'SUP-003', name: 'Labtech Scientific', category: 'Laboratory', contact: 'Dr. Samuel Kariuki', phone: '0733 456 789', email: 'info@labtech.co.ke', address: 'Ngong Road, Nairobi', paymentTerms: 'Net 45', status: 'Active', deliveryPerformance: 95, totalOrders: 8, totalValue: 680000 },
    { id: 'sup-004', code: 'SUP-004', name: 'CleanPro Supplies', category: 'Cleaning', contact: 'Mary Akinyi', phone: '0744 567 890', email: 'sales@cleanpro.co.ke', address: 'Industrial Area, Nairobi', paymentTerms: 'Net 30', status: 'Active', deliveryPerformance: 85, totalOrders: 18, totalValue: 240000 },
    { id: 'sup-005', code: 'SUP-005', name: 'Fresh Farm Distributors', category: 'Kitchen', contact: 'Peter Otieno', phone: '0755 678 901', email: 'orders@freshfarm.co.ke', address: 'Wakulima Market, Nairobi', paymentTerms: 'COD', status: 'Active', deliveryPerformance: 78, totalOrders: 45, totalValue: 920000 },
    { id: 'sup-006', code: 'SUP-006', name: 'TechHub Solutions', category: 'ICT', contact: 'Daniel Kamau', phone: '0766 789 012', email: 'info@techhub.co.ke', address: 'Westlands, Nairobi', paymentTerms: 'Net 30', status: 'Pending review', deliveryPerformance: 0, totalOrders: 0, totalValue: 0 },
    { id: 'sup-007', code: 'SUP-007', name: 'SportsGear Kenya', category: 'Sports', contact: 'Faith Njeri', phone: '0777 890 123', email: 'sales@sportsgear.co.ke', address: 'Sarit Centre, Westlands', paymentTerms: 'Net 21', status: 'Active', deliveryPerformance: 90, totalOrders: 6, totalValue: 180000 },
  ],

  requisitions: [
    { id: 'req-001', reference: 'REQ-001', requester: 'Miriam Njoroge', department: 'Academic', date: '08 Oct 2026', requiredBy: '20 Oct 2026', priority: 'High', justification: 'Term 3 textbooks for Year 6 and Form 2 classes', budgetCategory: 'Learning materials', lines: [
      { id: 'rl-001', itemCode: 'BK-Y6-MATH', description: 'Year 6 Mathematics textbook', quantity: 45, unit: 'pcs', estimatedUnitPrice: 850, total: 38250 },
      { id: 'rl-002', itemCode: 'BK-F2-ENG', description: 'Form 2 English textbook', quantity: 38, unit: 'pcs', estimatedUnitPrice: 920, total: 34960 },
    ], totalEstimate: 73210, status: 'Approved', approvedBy: 'Headteacher', approvalNote: 'Approved — budget available' },
    { id: 'req-002', reference: 'REQ-002', requester: 'John Mwenda', department: 'Science', date: '10 Oct 2026', requiredBy: '25 Oct 2026', priority: 'Normal', justification: 'Chemistry lab reagents for Term 3 practicals', budgetCategory: 'Laboratory supplies', lines: [
      { id: 'rl-003', itemCode: 'LAB-CHM-01', description: 'Hydrochloric acid 1L', quantity: 12, unit: 'bottles', estimatedUnitPrice: 450, total: 5400 },
      { id: 'rl-004', itemCode: 'LAB-CHM-02', description: 'Sodium hydroxide 500g', quantity: 8, unit: 'pcs', estimatedUnitPrice: 380, total: 3040 },
    ], totalEstimate: 8440, status: 'Submitted', approvedBy: null, approvalNote: '' },
    { id: 'req-003', reference: 'REQ-003', requester: 'Grace Wambui', department: 'Boarding', date: '11 Oct 2026', requiredBy: '18 Oct 2026', priority: 'Urgent', justification: 'Bedding supplies for new boarders — 6 students arriving', budgetCategory: 'Boarding supplies', lines: [
      { id: 'rl-005', itemCode: 'BD-SHEET', description: 'Bed sheets (single)', quantity: 12, unit: 'pcs', estimatedUnitPrice: 650, total: 7800 },
      { id: 'rl-006', itemCode: 'BD-PILLOW', description: 'Pillows', quantity: 6, unit: 'pcs', estimatedUnitPrice: 350, total: 2100 },
    ], totalEstimate: 9900, status: 'Under review', approvedBy: null, approvalNote: 'Awaiting budget confirmation' },
    { id: 'req-004', reference: 'REQ-004', requester: 'Esther Kamau', department: 'Kitchen', date: '12 Oct 2026', requiredBy: '15 Oct 2026', priority: 'Normal', justification: 'Weekly kitchen supplies — dry goods', budgetCategory: 'Kitchen supplies', lines: [
      { id: 'rl-007', itemCode: 'KT-RICE', description: 'Rice 50kg bag', quantity: 6, unit: 'bags', estimatedUnitPrice: 4200, total: 25200 },
      { id: 'rl-008', itemCode: 'KT-BEANS', description: 'Beans 50kg bag', quantity: 4, unit: 'bags', estimatedUnitPrice: 3800, total: 15200 },
    ], totalEstimate: 40400, status: 'Approved', approvedBy: 'Bursar', approvalNote: 'Approved — kitchen budget' },
    { id: 'req-005', reference: 'REQ-005', requester: 'Daniel Ochieng', department: 'ICT', date: '13 Oct 2026', requiredBy: '01 Nov 2026', priority: 'Low', justification: 'Network cables for computer lab upgrade', budgetCategory: 'ICT equipment', lines: [
      { id: 'rl-009', itemCode: 'ICT-CAT6', description: 'CAT6 cable 305m box', quantity: 3, unit: 'boxes', estimatedUnitPrice: 8500, total: 25500 },
    ], totalEstimate: 25500, status: 'Draft', approvedBy: null, approvalNote: '' },
    { id: 'req-006', reference: 'REQ-006', requester: 'Sarah Mwangi', department: 'Facilities', date: '14 Oct 2026', requiredBy: '22 Oct 2026', priority: 'High', justification: 'Cleaning materials for end-of-term deep clean', budgetCategory: 'Cleaning materials', lines: [
      { id: 'rl-010', itemCode: 'CL-DETERGENT', description: 'Detergent 5L', quantity: 20, unit: 'pcs', estimatedUnitPrice: 380, total: 7600 },
      { id: 'rl-011', itemCode: 'CL-DISINFECT', description: 'Disinfectant 5L', quantity: 15, unit: 'pcs', estimatedUnitPrice: 420, total: 6300 },
    ], totalEstimate: 13900, status: 'Rejected', approvedBy: 'Bursar', approvalNote: 'Rejected — pending stock check, sufficient inventory in store' },
  ],

  quotations: [
    { id: 'qt-001', rfqRef: 'RFQ-001', supplierId: 'sup-001', supplierName: 'Textbook Centre Ltd', poRef: 'PO-001', amount: 73210, deliveryDays: 7, status: 'Recommended', submittedDate: '09 Oct 2026', evaluationNote: 'Best price, reliable delivery, approved supplier' },
    { id: 'qt-002', rfqRef: 'RFQ-001', supplierId: 'sup-006', supplierName: 'TechHub Solutions', poRef: '', amount: 78000, deliveryDays: 14, status: 'Not recommended', submittedDate: '09 Oct 2026', evaluationNote: 'Higher price, longer delivery, pending review status' },
    { id: 'qt-003', rfqRef: 'RFQ-002', supplierId: 'sup-004', supplierName: 'CleanPro Supplies', poRef: '', amount: 13200, deliveryDays: 3, status: 'Pending', submittedDate: '14 Oct 2026', evaluationNote: '' },
    { id: 'qt-004', rfqRef: 'RFQ-002', supplierId: 'sup-002', supplierName: 'Office Point Kenya', poRef: '', amount: 14100, deliveryDays: 5, status: 'Pending', submittedDate: '14 Oct 2026', evaluationNote: '' },
  ],

  purchaseOrders: [
    { id: 'po-001', poNumber: 'PO-001', supplierId: 'sup-001', supplierName: 'Textbook Centre Ltd', requisitionRef: 'REQ-001', department: 'Academic', lines: [
      { id: 'pl-001', itemCode: 'BK-Y6-MATH', description: 'Year 6 Mathematics textbook', quantity: 45, unit: 'pcs', unitPrice: 850, total: 38250, receivedQty: 45 },
      { id: 'pl-002', itemCode: 'BK-F2-ENG', description: 'Form 2 English textbook', quantity: 38, unit: 'pcs', unitPrice: 920, total: 34960, receivedQty: 38 },
    ], total: 73210, deliveryLocation: 'Main Store', requiredDate: '20 Oct 2026', paymentTerms: 'Net 30', status: 'Received', approvedBy: 'Headteacher', createdBy: 'Procurement Officer', createdDate: '09 Oct 2026' },
    { id: 'po-002', poNumber: 'PO-002', supplierId: 'sup-005', supplierName: 'Fresh Farm Distributors', requisitionRef: 'REQ-004', department: 'Kitchen', lines: [
      { id: 'pl-003', itemCode: 'KT-RICE', description: 'Rice 50kg bag', quantity: 6, unit: 'bags', unitPrice: 4200, total: 25200, receivedQty: 6 },
      { id: 'pl-004', itemCode: 'KT-BEANS', description: 'Beans 50kg bag', quantity: 4, unit: 'bags', unitPrice: 3800, total: 15200, receivedQty: 2 },
    ], total: 40400, deliveryLocation: 'Kitchen Store', requiredDate: '15 Oct 2026', paymentTerms: 'COD', status: 'Partially received', approvedBy: 'Bursar', createdBy: 'Procurement Officer', createdDate: '13 Oct 2026' },
    { id: 'po-003', poNumber: 'PO-003', supplierId: 'sup-007', supplierName: 'SportsGear Kenya', requisitionRef: 'REQ-005', department: 'Sports', lines: [
      { id: 'pl-005', itemCode: 'SP-BALL-01', description: 'Football (size 5)', quantity: 10, unit: 'pcs', unitPrice: 1800, total: 18000, receivedQty: 0 },
      { id: 'pl-006', itemCode: 'SP-NET-01', description: 'Volleyball net', quantity: 4, unit: 'pcs', unitPrice: 2200, total: 8800, receivedQty: 0 },
    ], total: 26800, deliveryLocation: 'Main Store', requiredDate: '28 Oct 2026', paymentTerms: 'Net 21', status: 'Sent', approvedBy: 'Headteacher', createdBy: 'Procurement Officer', createdDate: '14 Oct 2026' },
    { id: 'po-004', poNumber: 'PO-004', supplierId: 'sup-003', supplierName: 'Labtech Scientific', requisitionRef: 'REQ-002', department: 'Science', lines: [
      { id: 'pl-007', itemCode: 'LAB-CHM-01', description: 'Hydrochloric acid 1L', quantity: 12, unit: 'bottles', unitPrice: 450, total: 5400, receivedQty: 0 },
      { id: 'pl-008', itemCode: 'LAB-CHM-02', description: 'Sodium hydroxide 500g', quantity: 8, unit: 'pcs', unitPrice: 380, total: 3040, receivedQty: 0 },
    ], total: 8440, deliveryLocation: 'Lab Store', requiredDate: '25 Oct 2026', paymentTerms: 'Net 45', status: 'Pending approval', approvedBy: null, createdBy: 'Procurement Officer', createdDate: '15 Oct 2026' },
  ],

  grns: [
    { id: 'grn-001', grnNumber: 'GRN-001', poId: 'po-001', poNumber: 'PO-001', supplierName: 'Textbook Centre Ltd', deliveryNote: 'DN-TC-4521', deliveryDate: '16 Oct 2026', store: 'Main Store', lines: [
      { id: 'gl-001', itemCode: 'BK-Y6-MATH', description: 'Year 6 Mathematics textbook', orderedQty: 45, deliveredQty: 45, acceptedQty: 45, rejectedQty: 0, batch: 'N/A', expiry: null },
      { id: 'gl-002', itemCode: 'BK-F2-ENG', description: 'Form 2 English textbook', orderedQty: 38, deliveredQty: 38, acceptedQty: 38, rejectedQty: 0, batch: 'N/A', expiry: null },
    ], status: 'Finalized', receivedBy: 'Storekeeper', inspectedBy: 'Miriam Njoroge', discrepancy: 'None — full delivery accepted' },
    { id: 'grn-002', grnNumber: 'GRN-002', poId: 'po-002', poNumber: 'PO-002', supplierName: 'Fresh Farm Distributors', deliveryNote: 'DN-FF-3387', deliveryDate: '15 Oct 2026', store: 'Kitchen Store', lines: [
      { id: 'gl-003', itemCode: 'KT-RICE', description: 'Rice 50kg bag', orderedQty: 6, deliveredQty: 6, acceptedQty: 6, rejectedQty: 0, batch: 'RICE-2026-10', expiry: '12 Apr 2027' },
      { id: 'gl-004', itemCode: 'KT-BEANS', description: 'Beans 50kg bag', orderedQty: 4, deliveredQty: 2, acceptedQty: 2, rejectedQty: 0, batch: 'BEANS-2026-10', expiry: '08 Jun 2027' },
    ], status: 'Finalized', receivedBy: 'Storekeeper', inspectedBy: 'Esther Kamau', discrepancy: 'Partial delivery — 2 of 4 bean bags delivered. Balance outstanding.' },
  ],

  inventory: [
    { id: 'inv-001', sku: 'BK-Y6-MATH', name: 'Year 6 Mathematics textbook', category: 'Textbooks', unit: 'pcs', store: 'Main Store', onHand: 45, reorderLevel: 20, maxLevel: 80, reorderQty: 50, unitCost: 850, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: 'sup-001' },
    { id: 'inv-002', sku: 'BK-F2-ENG', name: 'Form 2 English textbook', category: 'Textbooks', unit: 'pcs', store: 'Main Store', onHand: 38, reorderLevel: 20, maxLevel: 70, reorderQty: 50, unitCost: 920, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: 'sup-001' },
    { id: 'inv-003', sku: 'ST-A4-RM', name: 'A4 ream (80gsm)', category: 'Stationery', unit: 'reams', store: 'Main Store', onHand: 8, reorderLevel: 30, maxLevel: 100, reorderQty: 50, unitCost: 150, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: 'sup-002' },
    { id: 'inv-004', sku: 'ST-PEN-BL', name: 'Blue ballpoint pen (box of 50)', category: 'Stationery', unit: 'boxes', store: 'Main Store', onHand: 25, reorderLevel: 10, maxLevel: 40, reorderQty: 20, unitCost: 450, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: 'sup-002' },
    { id: 'inv-005', sku: 'CL-DETERGENT', name: 'Detergent 5L', category: 'Cleaning', unit: 'pcs', store: 'Main Store', onHand: 35, reorderLevel: 15, maxLevel: 60, reorderQty: 30, unitCost: 380, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: 'sup-004' },
    { id: 'inv-006', sku: 'CL-DISINFECT', name: 'Disinfectant 5L', category: 'Cleaning', unit: 'pcs', store: 'Main Store', onHand: 12, reorderLevel: 15, maxLevel: 50, reorderQty: 25, unitCost: 420, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: 'sup-004' },
    { id: 'inv-007', sku: 'KT-RICE', name: 'Rice 50kg bag', category: 'Kitchen', unit: 'bags', store: 'Kitchen Store', onHand: 6, reorderLevel: 4, maxLevel: 15, reorderQty: 8, unitCost: 4200, batchTracked: true, expiryTracked: true, status: 'Active', preferredSupplierId: 'sup-005' },
    { id: 'inv-008', sku: 'KT-BEANS', name: 'Beans 50kg bag', category: 'Kitchen', unit: 'bags', store: 'Kitchen Store', onHand: 2, reorderLevel: 4, maxLevel: 12, reorderQty: 6, unitCost: 3800, batchTracked: true, expiryTracked: true, status: 'Active', preferredSupplierId: 'sup-005' },
    { id: 'inv-009', sku: 'BD-SHEET', name: 'Bed sheets (single)', category: 'Boarding', unit: 'pcs', store: 'Boarding Store', onHand: 18, reorderLevel: 10, maxLevel: 40, reorderQty: 20, unitCost: 650, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: null },
    { id: 'inv-010', sku: 'BD-PILLOW', name: 'Pillows', category: 'Boarding', unit: 'pcs', store: 'Boarding Store', onHand: 12, reorderLevel: 8, maxLevel: 30, reorderQty: 15, unitCost: 350, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: null },
    { id: 'inv-011', sku: 'LAB-CHM-01', name: 'Hydrochloric acid 1L', category: 'Laboratory', unit: 'bottles', store: 'Lab Store', onHand: 5, reorderLevel: 10, maxLevel: 30, reorderQty: 15, unitCost: 450, batchTracked: false, expiryTracked: true, status: 'Active', preferredSupplierId: 'sup-003' },
    { id: 'inv-012', sku: 'SP-BALL-01', name: 'Football (size 5)', category: 'Sports', unit: 'pcs', store: 'Main Store', onHand: 3, reorderLevel: 5, maxLevel: 20, reorderQty: 10, unitCost: 1800, batchTracked: false, expiryTracked: false, status: 'Active', preferredSupplierId: 'sup-007' },
  ],

  movements: [
    { id: 'mv-001', itemCode: 'BK-Y6-MATH', itemName: 'Year 6 Mathematics textbook', type: 'Goods receipt', quantity: 45, unit: 'pcs', store: 'Main Store', reference: 'GRN-001', date: '16 Oct 2026', user: 'Storekeeper', reason: 'Received from PO-001', balanceAfter: 45 },
    { id: 'mv-002', itemCode: 'BK-F2-ENG', itemName: 'Form 2 English textbook', type: 'Goods receipt', quantity: 38, unit: 'pcs', store: 'Main Store', reference: 'GRN-001', date: '16 Oct 2026', user: 'Storekeeper', reason: 'Received from PO-001', balanceAfter: 38 },
    { id: 'mv-003', itemCode: 'KT-RICE', itemName: 'Rice 50kg bag', type: 'Goods receipt', quantity: 6, unit: 'bags', store: 'Kitchen Store', reference: 'GRN-002', date: '15 Oct 2026', user: 'Storekeeper', reason: 'Received from PO-002', balanceAfter: 6 },
    { id: 'mv-004', itemCode: 'KT-BEANS', itemName: 'Beans 50kg bag', type: 'Goods receipt', quantity: 2, unit: 'bags', store: 'Kitchen Store', reference: 'GRN-002', date: '15 Oct 2026', user: 'Storekeeper', reason: 'Partial delivery from PO-002', balanceAfter: 2 },
    { id: 'mv-005', itemCode: 'ST-A4-RM', itemName: 'A4 ream (80gsm)', type: 'Issue', quantity: 5, unit: 'reams', store: 'Main Store', reference: 'ISS-001', date: '14 Oct 2026', user: 'Storekeeper', reason: 'Issued to Academic department', balanceAfter: 8 },
    { id: 'mv-006', itemCode: 'CL-DETERGENT', itemName: 'Detergent 5L', type: 'Issue', quantity: 4, unit: 'pcs', store: 'Main Store', reference: 'ISS-002', date: '12 Oct 2026', user: 'Storekeeper', reason: 'Issued to Facilities', balanceAfter: 35 },
  ],

  issues: [
    { id: 'iss-001', reference: 'ISS-001', department: 'Academic', requester: 'Miriam Njoroge', itemCode: 'ST-A4-RM', itemName: 'A4 ream (80gsm)', quantity: 5, unit: 'reams', purpose: 'Exam printing Term 3', requiredDate: '14 Oct 2026', status: 'Issued', issuedQty: 5, storekeeper: 'Storekeeper', date: '14 Oct 2026' },
    { id: 'iss-002', reference: 'ISS-002', department: 'Facilities', requester: 'Sarah Mwangi', itemCode: 'CL-DETERGENT', itemName: 'Detergent 5L', quantity: 4, unit: 'pcs', purpose: 'Daily cleaning supplies', requiredDate: '12 Oct 2026', status: 'Issued', issuedQty: 4, storekeeper: 'Storekeeper', date: '12 Oct 2026' },
    { id: 'iss-003', reference: 'ISS-003', department: 'Boarding', requester: 'Grace Wambui', itemCode: 'BD-SHEET', itemName: 'Bed sheets (single)', quantity: 6, unit: 'pcs', purpose: 'New boarders arriving', requiredDate: '18 Oct 2026', status: 'Submitted', issuedQty: 0, storekeeper: '', date: '15 Oct 2026' },
    { id: 'iss-004', reference: 'ISS-004', department: 'Academic', requester: 'John Mwenda', itemCode: 'ST-PEN-BL', itemName: 'Blue ballpoint pen (box of 50)', quantity: 3, unit: 'boxes', purpose: 'Exam materials', requiredDate: '20 Oct 2026', status: 'Approved', issuedQty: 0, storekeeper: '', date: '15 Oct 2026' },
  ],

  transfers: [
    { id: 'trf-001', reference: 'TRF-001', fromStore: 'Main Store', toStore: 'Boarding Store', itemCode: 'BD-SHEET', itemName: 'Bed sheets (single)', quantity: 10, unit: 'pcs', status: 'Completed', dispatchedBy: 'Storekeeper', receivedBy: 'Grace Wambui', dispatchDate: '10 Oct 2026', receiptDate: '10 Oct 2026' },
    { id: 'trf-002', reference: 'TRF-002', fromStore: 'Main Store', toStore: 'Lab Store', itemCode: 'LAB-CHM-01', itemName: 'Hydrochloric acid 1L', quantity: 5, unit: 'bottles', status: 'In transit', dispatchedBy: 'Storekeeper', receivedBy: null, dispatchDate: '15 Oct 2026', receiptDate: null },
  ],

  stockCounts: [
    { id: 'sc-001', reference: 'SC-001', store: 'Main Store', date: '10 Oct 2026', counter: 'Storekeeper', status: 'Posted', lines: [
      { id: 'scl-001', itemCode: 'ST-A4-RM', itemName: 'A4 ream (80gsm)', expectedQty: 13, countedQty: 13, variance: 0, note: 'Match' },
      { id: 'scl-002', itemCode: 'ST-PEN-BL', itemName: 'Blue ballpoint pen (box of 50)', expectedQty: 25, countedQty: 25, variance: 0, note: 'Match' },
    ] },
    { id: 'sc-002', reference: 'SC-002', store: 'Kitchen Store', date: '15 Oct 2026', counter: 'Esther Kamau', status: 'Counted', lines: [
      { id: 'scl-003', itemCode: 'KT-RICE', itemName: 'Rice 50kg bag', expectedQty: 0, countedQty: 6, variance: 6, note: 'Stock received after count opened' },
      { id: 'scl-004', itemCode: 'KT-BEANS', itemName: 'Beans 50kg bag', expectedQty: 0, countedQty: 2, variance: 2, note: 'Partial delivery received' },
    ] },
  ],

  invoices: [
    { id: 'inv-001', invoiceNumber: 'INV-TC-2026-045', supplierId: 'sup-001', supplierName: 'Textbook Centre Ltd', poRef: 'PO-001', grnRef: 'GRN-001', amount: 73210, date: '16 Oct 2026', status: 'Matched', discrepancy: 'Three-way match confirmed' },
    { id: 'inv-002', invoiceNumber: 'INV-FF-2026-112', supplierId: 'sup-005', supplierName: 'Fresh Farm Distributors', poRef: 'PO-002', grnRef: 'GRN-002', amount: 40400, date: '15 Oct 2026', status: 'Discrepancy', discrepancy: 'Invoice total for full order but only partial delivery received (2 of 4 bean bags)' },
  ],

  notifications: [
    { id: 'pn-001', recipient: 'Procurement Officer', title: 'PO-004 awaiting approval', detail: 'Labtech Scientific order KES 8,440 requires headteacher approval', unread: true, createdDate: '15 Oct 2026' },
    { id: 'pn-002', recipient: 'Storekeeper', title: 'Low stock alert', detail: 'A4 ream below reorder level (8 of 30) — reorder suggested', unread: true, createdDate: '15 Oct 2026' },
    { id: 'pn-003', recipient: 'Bursar', title: 'Invoice discrepancy', detail: 'Fresh Farm Distributors invoice does not match partial delivery', unread: true, createdDate: '15 Oct 2026' },
    { id: 'pn-004', recipient: 'Procurement Officer', title: 'Supplier pending review', detail: 'TechHub Solutions submitted for approval — no orders yet', unread: false, createdDate: '12 Oct 2026' },
  ],

  audit: [
    { id: 'pa-001', actor: 'Procurement Officer', action: 'Created purchase order', target: 'PO-001 · Textbook Centre Ltd · KES 73,210', timestamp: '09 Oct 2026, 14:20' },
    { id: 'pa-002', actor: 'Headteacher', action: 'Approved purchase order', target: 'PO-001', timestamp: '09 Oct 2026, 16:05' },
    { id: 'pa-003', actor: 'Storekeeper', action: 'Finalized goods receipt', target: 'GRN-001 · PO-001', timestamp: '16 Oct 2026, 09:30' },
    { id: 'pa-004', actor: 'Storekeeper', action: 'Recorded stock issue', target: 'ISS-001 · A4 ream to Academic', timestamp: '14 Oct 2026, 11:15' },
    { id: 'pa-005', actor: 'Bursar', action: 'Rejected requisition', target: 'REQ-006 · Cleaning materials', timestamp: '14 Oct 2026, 15:40' },
  ],
};

let state: ProcurementDemoState = structuredClone(seed);
const listeners = new Set<() => void>();
function notify(): void { listeners.forEach((l) => l()); }

export function useProcurementDemo(): ProcurementDemoState {
  return useSyncExternalStore((l) => { listeners.add(l); return () => listeners.delete(l); }, () => state, () => state);
}

function logAudit(actor: string, action: string, target: string): void {
  state = { ...state, audit: [{ id: `pa-${Date.now()}`, actor, action, target, timestamp: '16 Oct 2026, now' }, ...state.audit] };
}

export const procurementDemo = {
  createRequisition(department: string, priority: RequisitionPriority, justification: string, budgetCategory: string, requiredBy: string, lines: { description: string; quantity: number; unit: string; estimatedUnitPrice: number }[]): { ok: boolean; error?: string } {
    if (!justification.trim()) return { ok: false, error: 'Justification is required.' };
    if (lines.length === 0) return { ok: false, error: 'At least one line item is required.' };
    const ref = `REQ-${String(state.requisitions.length + 1).padStart(3, '0')}`;
    const reqLines: RequisitionLine[] = lines.map((l, i) => ({ id: `rl-${Date.now()}-${i}`, itemCode: 'MISC', description: l.description, quantity: l.quantity, unit: l.unit, estimatedUnitPrice: l.estimatedUnitPrice, total: l.quantity * l.estimatedUnitPrice }));
    const total = reqLines.reduce((s, l) => s + l.total, 0);
    const req: Requisition = { id: `req-${Date.now()}`, reference: ref, requester: 'Procurement Officer', department, date: '16 Oct 2026', requiredBy, priority, justification, budgetCategory, lines: reqLines, totalEstimate: total, status: 'Draft', approvedBy: null, approvalNote: '' };
    state = { ...state, requisitions: [req, ...state.requisitions] };
    logAudit('Procurement Officer', 'Created requisition', `${ref} · ${department} · KES ${total.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  submitRequisition(id: string): { ok: boolean; error?: string } {
    const req = state.requisitions.find((r) => r.id === id);
    if (!req) return { ok: false, error: 'Requisition not found.' };
    if (req.status !== 'Draft') return { ok: false, error: `Requisition is ${req.status.toLowerCase()}, cannot submit.` };
    state = { ...state, requisitions: state.requisitions.map((r) => r.id === id ? { ...r, status: 'Submitted' as RequisitionStatus } : r) };
    logAudit('Procurement Officer', 'Submitted requisition', `${req.reference} · ${req.department}`);
    notify();
    return { ok: true };
  },

  approveRequisition(id: string, note: string): { ok: boolean; error?: string } {
    const req = state.requisitions.find((r) => r.id === id);
    if (!req) return { ok: false, error: 'Requisition not found.' };
    if (req.status !== 'Submitted' && req.status !== 'Under review') return { ok: false, error: `Requisition is ${req.status.toLowerCase()}, cannot approve.` };
    if (req.requester === 'Procurement Officer') return { ok: false, error: 'Self-approval is not permitted. Request must be approved by a different approver.' };
    state = { ...state, requisitions: state.requisitions.map((r) => r.id === id ? { ...r, status: 'Approved' as RequisitionStatus, approvedBy: 'Headteacher', approvalNote: note } : r) };
    logAudit('Headteacher', 'Approved requisition', `${req.reference} · KES ${req.totalEstimate.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  rejectRequisition(id: string, note: string): { ok: boolean; error?: string } {
    const req = state.requisitions.find((r) => r.id === id);
    if (!req) return { ok: false, error: 'Requisition not found.' };
    if (req.status !== 'Submitted' && req.status !== 'Under review') return { ok: false, error: `Requisition is ${req.status.toLowerCase()}, cannot reject.` };
    state = { ...state, requisitions: state.requisitions.map((r) => r.id === id ? { ...r, status: 'Rejected' as RequisitionStatus, approvedBy: 'Bursar', approvalNote: note } : r) };
    logAudit('Bursar', 'Rejected requisition', `${req.reference} · ${note}`);
    notify();
    return { ok: true };
  },

  reviewRequisition(id: string): void {
    const req = state.requisitions.find((r) => r.id === id);
    if (!req) return;
    state = { ...state, requisitions: state.requisitions.map((r) => r.id === id ? { ...r, status: 'Under review' as RequisitionStatus } : r) };
    logAudit('Procurement Officer', 'Set requisition under review', req.reference);
    notify();
  },

  createPO(requisitionId: string, supplierId: string): { ok: boolean; error?: string } {
    const req = state.requisitions.find((r) => r.id === requisitionId);
    if (!req) return { ok: false, error: 'Requisition not found.' };
    if (req.status !== 'Approved') return { ok: false, error: 'Only approved requisitions can be converted to POs.' };
    const supplier = state.suppliers.find((s) => s.id === supplierId);
    if (!supplier) return { ok: false, error: 'Supplier not found.' };
    if (supplier.status !== 'Active') return { ok: false, error: 'Supplier is not active.' };
    const poNum = `PO-${String(state.purchaseOrders.length + 1).padStart(3, '0')}`;
    const lines: PurchaseOrderLine[] = req.lines.map((l, i) => ({ id: `pl-${Date.now()}-${i}`, itemCode: l.itemCode, description: l.description, quantity: l.quantity, unit: l.unit, unitPrice: l.estimatedUnitPrice, total: l.total, receivedQty: 0 }));
    const total = lines.reduce((s, l) => s + l.total, 0);
    const po: PurchaseOrder = { id: `po-${Date.now()}`, poNumber: poNum, supplierId, supplierName: supplier.name, requisitionRef: req.reference, department: req.department, lines, total, deliveryLocation: 'Main Store', requiredDate: req.requiredBy, paymentTerms: supplier.paymentTerms, status: 'Pending approval', approvedBy: null, createdBy: 'Procurement Officer', createdDate: '16 Oct 2026' };
    state = { ...state, purchaseOrders: [po, ...state.purchaseOrders], requisitions: state.requisitions.map((r) => r.id === requisitionId ? { ...r, status: 'Converted' as RequisitionStatus } : r) };
    logAudit('Procurement Officer', 'Created purchase order', `${poNum} · ${supplier.name} · KES ${total.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  approvePO(id: string): { ok: boolean; error?: string } {
    const po = state.purchaseOrders.find((p) => p.id === id);
    if (!po) return { ok: false, error: 'Purchase order not found.' };
    if (po.status !== 'Pending approval') return { ok: false, error: `PO is ${po.status.toLowerCase()}, cannot approve.` };
    if (po.createdBy === 'Headteacher') return { ok: false, error: 'Self-approval is not permitted.' };
    state = { ...state, purchaseOrders: state.purchaseOrders.map((p) => p.id === id ? { ...p, status: 'Approved' as PurchaseOrderStatus, approvedBy: 'Headteacher' } : p) };
    logAudit('Headteacher', 'Approved purchase order', `${po.poNumber} · KES ${po.total.toLocaleString()}`);
    notify();
    return { ok: true };
  },

  sendPO(id: string): { ok: boolean; error?: string } {
    const po = state.purchaseOrders.find((p) => p.id === id);
    if (!po) return { ok: false, error: 'Purchase order not found.' };
    if (po.status !== 'Approved') return { ok: false, error: 'Only approved POs can be sent to supplier.' };
    state = { ...state, purchaseOrders: state.purchaseOrders.map((p) => p.id === id ? { ...p, status: 'Sent' as PurchaseOrderStatus } : p) };
    logAudit('Procurement Officer', 'Sent PO to supplier', `${po.poNumber} · ${po.supplierName}`);
    notify();
    return { ok: true };
  },

  cancelPO(id: string): void {
    const po = state.purchaseOrders.find((p) => p.id === id);
    if (!po) return;
    state = { ...state, purchaseOrders: state.purchaseOrders.map((p) => p.id === id ? { ...p, status: 'Cancelled' as PurchaseOrderStatus } : p) };
    logAudit('Procurement Officer', 'Cancelled purchase order', po.poNumber);
    notify();
  },

  createGRN(poId: string, deliveryNote: string, store: string, lines: { poLineId: string; deliveredQty: number; acceptedQty: number; rejectedQty: number; batch: string; expiry: string }[]): { ok: boolean; error?: string } {
    const po = state.purchaseOrders.find((p) => p.id === poId);
    if (!po) return { ok: false, error: 'Purchase order not found.' };
    if (po.status !== 'Sent' && po.status !== 'Partially received') return { ok: false, error: `PO is ${po.status.toLowerCase()}, cannot receive goods.` };
    const grnNum = `GRN-${String(state.grns.length + 1).padStart(3, '0')}`;
    const grnLines: GRNLine[] = lines.map((l, i) => {
      const poLine = po.lines.find((pl) => pl.id === l.poLineId)!;
      return { id: `gl-${Date.now()}-${i}`, itemCode: poLine.itemCode, description: poLine.description, orderedQty: poLine.quantity, deliveredQty: l.deliveredQty, acceptedQty: l.acceptedQty, rejectedQty: l.rejectedQty, batch: l.batch, expiry: l.expiry || null };
    });
    const grn: GoodsReceivedNote = { id: `grn-${Date.now()}`, grnNumber: grnNum, poId, poNumber: po.poNumber, supplierName: po.supplierName, deliveryNote, deliveryDate: '16 Oct 2026', store, lines: grnLines, status: 'Finalized', receivedBy: 'Storekeeper', inspectedBy: 'Procurement Officer', discrepancy: grnLines.some((l) => l.acceptedQty < l.orderedQty) ? 'Partial delivery' : 'None — full delivery accepted' };
    const newMovements: StockMovement[] = grnLines.filter((l) => l.acceptedQty > 0).map((l) => {
      const item = state.inventory.find((inv) => inv.sku === l.itemCode);
      const newBalance = (item?.onHand ?? 0) + l.acceptedQty;
      return { id: `mv-${Date.now()}-${l.itemCode}`, itemCode: l.itemCode, itemName: l.description, type: 'Goods receipt' as MovementType, quantity: l.acceptedQty, unit: po.lines.find((pl) => pl.id === l.poLineId)?.unit ?? 'pcs', store, reference: grnNum, date: '16 Oct 2026', user: 'Storekeeper', reason: `Received from ${po.poNumber}`, balanceAfter: newBalance };
    });
    const updatedInventory = state.inventory.map((inv) => {
      const grnLine = grnLines.find((l) => l.itemCode === inv.sku);
      if (grnLine && grnLine.acceptedQty > 0) return { ...inv, onHand: inv.onHand + grnLine.acceptedQty };
      return inv;
    });
    const updatedPOLines = po.lines.map((pl) => {
      const grnLine = grnLines.find((l) => l.poLineId === pl.id);
      if (grnLine) return { ...pl, receivedQty: pl.receivedQty + grnLine.acceptedQty };
      return pl;
    });
    const allReceived = updatedPOLines.every((pl) => pl.receivedQty >= pl.quantity);
    const anyReceived = updatedPOLines.some((pl) => pl.receivedQty > 0);
    const newPOStatus: PurchaseOrderStatus = allReceived ? 'Received' : anyReceived ? 'Partially received' : po.status;
    state = {
      ...state,
      grns: [grn, ...state.grns],
      movements: [...newMovements, ...state.movements],
      inventory: updatedInventory,
      purchaseOrders: state.purchaseOrders.map((p) => p.id === poId ? { ...p, lines: updatedPOLines, status: newPOStatus } : p),
    };
    logAudit('Storekeeper', 'Finalized goods receipt', `${grnNum} · ${po.poNumber} · ${po.supplierName}`);
    notify();
    return { ok: true };
  },

  issueStock(issueId: string): { ok: boolean; error?: string } {
    const issue = state.issues.find((i) => i.id === issueId);
    if (!issue) return { ok: false, error: 'Issue request not found.' };
    if (issue.status !== 'Approved' && issue.status !== 'Submitted') return { ok: false, error: `Issue is ${issue.status.toLowerCase()}, cannot issue.` };
    if (issue.status === 'Submitted') return { ok: false, error: 'Issue must be approved before stock can be issued.' };
    const item = state.inventory.find((inv) => inv.sku === issue.itemCode);
    if (!item) return { ok: false, error: 'Item not found in inventory.' };
    if (item.onHand < issue.quantity) return { ok: false, error: `Insufficient stock. Available: ${item.onHand} ${issue.unit}, requested: ${issue.quantity} ${issue.unit}.` };
    const newBalance = item.onHand - issue.quantity;
    const movement: StockMovement = { id: `mv-${Date.now()}`, itemCode: issue.itemCode, itemName: issue.itemName, type: 'Issue', quantity: issue.quantity, unit: issue.unit, store: item.store, reference: issue.reference, date: '16 Oct 2026', user: 'Storekeeper', reason: `Issued to ${issue.department}`, balanceAfter: newBalance };
    state = {
      ...state,
      inventory: state.inventory.map((inv) => inv.id === item.id ? { ...inv, onHand: newBalance } : inv),
      movements: [movement, ...state.movements],
      issues: state.issues.map((i) => i.id === issueId ? { ...i, status: 'Issued' as IssueStatus, issuedQty: issue.quantity, storekeeper: 'Storekeeper' } : i),
    };
    logAudit('Storekeeper', 'Issued stock', `${issue.reference} · ${issue.itemName} to ${issue.department}`);
    notify();
    return { ok: true };
  },

  approveIssue(id: string): { ok: boolean; error?: string } {
    const issue = state.issues.find((i) => i.id === id);
    if (!issue) return { ok: false, error: 'Issue request not found.' };
    if (issue.status !== 'Submitted') return { ok: false, error: `Issue is ${issue.status.toLowerCase()}, cannot approve.` };
    state = { ...state, issues: state.issues.map((i) => i.id === id ? { ...i, status: 'Approved' as IssueStatus } : i) };
    logAudit('Storekeeper', 'Approved issue request', `${issue.reference} · ${issue.department}`);
    notify();
    return { ok: true };
  },

  rejectIssue(id: string): void {
    const issue = state.issues.find((i) => i.id === id);
    if (!issue) return;
    state = { ...state, issues: state.issues.map((i) => i.id === id ? { ...i, status: 'Rejected' as IssueStatus } : i) };
    logAudit('Storekeeper', 'Rejected issue request', issue.reference);
    notify();
  },

  createIssue(department: string, requester: string, itemCode: string, quantity: number, purpose: string, requiredDate: string): { ok: boolean; error?: string } {
    const item = state.inventory.find((inv) => inv.sku === itemCode);
    if (!item) return { ok: false, error: 'Item not found in catalogue.' };
    if (quantity <= 0) return { ok: false, error: 'Quantity must be greater than zero.' };
    const ref = `ISS-${String(state.issues.length + 1).padStart(3, '0')}`;
    const issue: IssueRequest = { id: `iss-${Date.now()}`, reference: ref, department, requester, itemCode, itemName: item.name, quantity, unit: item.unit, purpose, requiredDate, status: 'Submitted', issuedQty: 0, storekeeper: '', date: '16 Oct 2026' };
    state = { ...state, issues: [issue, ...state.issues] };
    logAudit(requester, 'Created issue request', `${ref} · ${item.name} to ${department}`);
    notify();
    return { ok: true };
  },

  dispatchTransfer(id: string): { ok: boolean; error?: string } {
    const transfer = state.transfers.find((t) => t.id === id);
    if (!transfer) return { ok: false, error: 'Transfer not found.' };
    if (transfer.status !== 'Approved' && transfer.status !== 'Requested') return { ok: false, error: `Transfer is ${transfer.status.toLowerCase()}, cannot dispatch.` };
    const item = state.inventory.find((inv) => inv.sku === transfer.itemCode && inv.store === transfer.fromStore);
    if (item && item.onHand < transfer.quantity) return { ok: false, error: `Insufficient stock at source. Available: ${item.onHand}, transfer: ${transfer.quantity}.` };
    state = {
      ...state,
      transfers: state.transfers.map((t) => t.id === id ? { ...t, status: 'In transit' as TransferStatus, dispatchedBy: 'Storekeeper', dispatchDate: '16 Oct 2026' } : t),
      inventory: item ? state.inventory.map((inv) => inv.id === item.id ? { ...inv, onHand: inv.onHand - transfer.quantity } : inv) : state.inventory,
    };
    logAudit('Storekeeper', 'Dispatched transfer', `${transfer.reference} · ${transfer.fromStore} → ${transfer.toStore}`);
    notify();
    return { ok: true };
  },

  receiveTransfer(id: string): { ok: boolean; error?: string } {
    const transfer = state.transfers.find((t) => t.id === id);
    if (!transfer) return { ok: false, error: 'Transfer not found.' };
    if (transfer.status !== 'In transit') return { ok: false, error: `Transfer is ${transfer.status.toLowerCase()}, cannot receive.` };
    const destItem = state.inventory.find((inv) => inv.sku === transfer.itemCode && inv.store === transfer.toStore);
    let updatedInventory;
    if (destItem) {
      updatedInventory = state.inventory.map((inv) => inv.id === destItem.id ? { ...inv, onHand: inv.onHand + transfer.quantity } : inv);
    } else {
      const sourceItem = state.inventory.find((inv) => inv.sku === transfer.itemCode);
      const newItem: InventoryItem = { id: `inv-${Date.now()}`, sku: transfer.itemCode, name: transfer.itemName, category: sourceItem?.category ?? 'Stationery', unit: transfer.unit, store: transfer.toStore, onHand: transfer.quantity, reorderLevel: sourceItem?.reorderLevel ?? 5, maxLevel: sourceItem?.maxLevel ?? 20, reorderQty: sourceItem?.reorderQty ?? 10, unitCost: sourceItem?.unitCost ?? 0, batchTracked: sourceItem?.batchTracked ?? false, expiryTracked: sourceItem?.expiryTracked ?? false, status: 'Active', preferredSupplierId: sourceItem?.preferredSupplierId ?? null };
      updatedInventory = [...state.inventory, newItem];
    }
    const movement: StockMovement = { id: `mv-${Date.now()}`, itemCode: transfer.itemCode, itemName: transfer.itemName, type: 'Transfer in', quantity: transfer.quantity, unit: transfer.unit, store: transfer.toStore, reference: transfer.reference, date: '16 Oct 2026', user: 'Storekeeper', reason: `Received from ${transfer.fromStore}`, balanceAfter: (destItem?.onHand ?? 0) + transfer.quantity };
    state = { ...state, transfers: state.transfers.map((t) => t.id === id ? { ...t, status: 'Completed' as TransferStatus, receivedBy: 'Storekeeper', receiptDate: '16 Oct 2026' } : t), inventory: updatedInventory, movements: [movement, ...state.movements] };
    logAudit('Storekeeper', 'Received transfer', `${transfer.reference} · at ${transfer.toStore}`);
    notify();
    return { ok: true };
  },

  approveStockCount(id: string): { ok: boolean; error?: string } {
    const count = state.stockCounts.find((c) => c.id === id);
    if (!count) return { ok: false, error: 'Stock count not found.' };
    if (count.status !== 'Counted' && count.status !== 'Recount') return { ok: false, error: `Count is ${count.status.toLowerCase()}, cannot approve.` };
    const adjustments: StockMovement[] = [];
    const updatedInventory = state.inventory.map((inv) => {
      const line = count.lines.find((l) => l.itemCode === inv.sku && inv.store === count.store);
      if (line && line.variance !== 0) {
        const newBalance = inv.onHand + line.variance;
        adjustments.push({ id: `mv-${Date.now()}-${inv.sku}`, itemCode: inv.sku, itemName: inv.name, type: 'Adjustment', quantity: line.variance, unit: inv.unit, store: count.store, reference: count.reference, date: '16 Oct 2026', user: 'Storekeeper', reason: `Stock count adjustment: ${line.note}`, balanceAfter: newBalance });
        return { ...inv, onHand: newBalance };
      }
      return inv;
    });
    state = { ...state, stockCounts: state.stockCounts.map((c) => c.id === id ? { ...c, status: 'Posted' as StockCountStatus } : c), inventory: updatedInventory, movements: [...adjustments, ...state.movements] };
    logAudit('Storekeeper', 'Posted stock count', `${count.reference} · ${count.store} · ${adjustments.length} adjustments`);
    notify();
    return { ok: true };
  },

  addSupplier(name: string, category: string, contact: string, phone: string, email: string, paymentTerms: string): { ok: boolean; error?: string } {
    if (!name.trim()) return { ok: false, error: 'Supplier name is required.' };
    const existing = state.suppliers.find((s) => s.name.toLowerCase() === name.trim().toLowerCase());
    if (existing) return { ok: false, error: `Supplier "${name.trim()}" already exists. Possible duplicate flagged.` };
    const code = `SUP-${String(state.suppliers.length + 1).padStart(3, '0')}`;
    const supplier: Supplier = { id: `sup-${Date.now()}`, code, name: name.trim(), category, contact, phone, email, address: '', paymentTerms, status: 'Pending review', deliveryPerformance: 0, totalOrders: 0, totalValue: 0 };
    state = { ...state, suppliers: [supplier, ...state.suppliers] };
    logAudit('Procurement Officer', 'Registered supplier', `${code} · ${name.trim()}`);
    notify();
    return { ok: true };
  },

  approveSupplier(id: string): { ok: boolean; error?: string } {
    const supplier = state.suppliers.find((s) => s.id === id);
    if (!supplier) return { ok: false, error: 'Supplier not found.' };
    if (supplier.status !== 'Pending review') return { ok: false, error: 'Supplier is not pending review.' };
    state = { ...state, suppliers: state.suppliers.map((s) => s.id === id ? { ...s, status: 'Active' as SupplierStatus } : s) };
    logAudit('Headteacher', 'Approved supplier', `${supplier.code} · ${supplier.name}`);
    notify();
    return { ok: true };
  },

  matchInvoice(id: string): { ok: boolean; error?: string } {
    const invoice = state.invoices.find((i) => i.id === id);
    if (!invoice) return { ok: false, error: 'Invoice not found.' };
    if (invoice.status !== 'Discrepancy' && invoice.status !== 'Pending') return { ok: false, error: `Invoice is ${invoice.status.toLowerCase()}, cannot match.` };
    state = { ...state, invoices: state.invoices.map((i) => i.id === id ? { ...i, status: 'Matched' as InvoiceStatus, discrepancy: 'Manually matched by bursar' } : i) };
    logAudit('Bursar', 'Matched supplier invoice', `${invoice.invoiceNumber} · ${invoice.supplierName}`);
    notify();
    return { ok: true };
  },

  markNotificationRead(id: string): void {
    state = { ...state, notifications: state.notifications.map((n) => n.id === id ? { ...n, unread: false } : n) };
    notify();
  },

  reset(): void { state = structuredClone(seed); notify(); },
};

export const PROCUREMENT_POLICIES = {
  APPROVAL_THRESHOLD: 50000,
  SELF_APPROVAL_PREVENTED: true,
  LOW_STOCK_ALERT: true,
  THREE_WAY_MATCHING: true,
  PREVENT_NEGATIVE_STOCK: true,
};
