<?php

declare(strict_types=1);

namespace App\Enums;

enum LabType: string
{
    case Chemistry = 'chemistry';
    case Biology = 'biology';
    case Physics = 'physics';
    case GeneralScience = 'general_science';
    case Computer = 'computer';
}

enum LabRoomStatus: string
{
    case Active = 'active';
    case Unavailable = 'unavailable';
    case Maintenance = 'maintenance';
    case Closed = 'closed';
}

enum PracticalStatus: string
{
    case Draft = 'draft';
    case Submitted = 'submitted';
    case Reviewed = 'reviewed';
    case Approved = 'approved';
    case Scheduled = 'scheduled';
    case Prepared = 'prepared';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Assessed = 'assessed';
    case Cancelled = 'cancelled';
}

enum LabBookingStatus: string
{
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case Cancelled = 'cancelled';
    case Completed = 'completed';
}

enum EquipmentCondition: string
{
    case Good = 'good';
    case Fair = 'fair';
    case Damaged = 'damaged';
    case UnderRepair = 'under_repair';
    case Disposed = 'disposed';
}

enum StockMovementCategory: string
{
    case Receipt = 'receipt';
    case Issue = 'issue';
    case Return = 'return';
    case Consumption = 'consumption';
    case Damage = 'damage';
    case Disposal = 'disposal';
    case Adjustment = 'adjustment';
    case Reservation = 'reservation';
}

enum ChemicalHazardLevel: string
{
    case Low = 'low';
    case Medium = 'medium';
    case High = 'high';
    case Corrosive = 'corrosive';
    case Flammable = 'flammable';
    case Toxic = 'toxic';
    case Restricted = 'restricted';
}

enum ChemicalDisposalStatus: string
{
    case NotRequired = 'not_required';
    case Pending = 'pending';
    case Disposed = 'disposed';
}

enum SafetyInspectionStatus: string
{
    case Scheduled = 'scheduled';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Overdue = 'overdue';
}

enum SafetyFindingStatus: string
{
    case Open = 'open';
    case CorrectiveActionAssigned = 'corrective_action_assigned';
    case Resolved = 'resolved';
    case Closed = 'closed';
}

enum LabIncidentSeverity: string
{
    case Minor = 'minor';
    case Moderate = 'moderate';
    case Serious = 'serious';
    case Critical = 'critical';
}

enum LabIncidentStatus: string
{
    case Open = 'open';
    case UnderReview = 'under_review';
    case ActionAssigned = 'action_assigned';
    case Resolved = 'resolved';
    case Closed = 'closed';
}

enum LabMaintenanceStatus: string
{
    case Reported = 'reported';
    case Reviewed = 'reviewed';
    case Approved = 'approved';
    case Assigned = 'assigned';
    case InProgress = 'in_progress';
    case AwaitingParts = 'awaiting_parts';
    case ExternalService = 'external_service';
    case Resolved = 'resolved';
    case Verified = 'verified';
    case Closed = 'closed';
}

enum IctDeviceType: string
{
    case Desktop = 'desktop';
    case Laptop = 'laptop';
    case Projector = 'projector';
    case Printer = 'printer';
    case Router = 'router';
    case Switch = 'switch';
    case Other = 'other';
}

enum IctDeviceStatus: string
{
    case Operational = 'operational';
    case Faulty = 'faulty';
    case UnderRepair = 'under_repair';
    case Decommissioned = 'decommissioned';
    case Missing = 'missing';
}

enum WorkstationStatus: string
{
    case Available = 'available';
    case Assigned = 'assigned';
    case Unavailable = 'unavailable';
}

enum SoftwareCategory: string
{
    case OperatingSystem = 'operating_system';
    case Productivity = 'productivity';
    case Development = 'development';
    case Educational = 'educational';
    case Security = 'security';
    case Utility = 'utility';
    case Other = 'other';
}

enum LicenceType: string
{
    case Perpetual = 'perpetual';
    case Subscription = 'subscription';
    case OpenSource = 'open_source';
    case Volume = 'volume';
    case Oem = 'oem';
}

enum SoftwareInstallationStatus: string
{
    case Approved = 'approved';
    case Installed = 'installed';
    case PendingRemoval = 'pending_removal';
    case Removed = 'removed';
}

enum TechnicalTicketPriority: string
{
    case Low = 'low';
    case Medium = 'medium';
    case High = 'high';
    case Critical = 'critical';
}

enum TechnicalTicketStatus: string
{
    case Open = 'open';
    case Triaged = 'triaged';
    case Assigned = 'assigned';
    case InProgress = 'in_progress';
    case WaitingForInfo = 'waiting_for_info';
    case WaitingForParts = 'waiting_for_parts';
    case Resolved = 'resolved';
    case Verified = 'verified';
    case Closed = 'closed';
}

enum AssetAuditStatus: string
{
    case Scheduled = 'scheduled';
    case InProgress = 'in_progress';
    case Completed = 'completed';
    case Discrepancy = 'discrepancy';
    case Reconciled = 'reconciled';
}
