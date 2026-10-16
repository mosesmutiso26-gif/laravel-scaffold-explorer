# Security notes

The ERP demo is intentionally synthetic and does not perform external side effects. The role switcher is a visual demo control, not an authorization boundary. Before production use, Laravel must enforce authentication, permissions, guardian/student relationships, staff scope, financial visibility, CMS publishing rights, safe exports, upload validation and audit logging independently of the frontend.

The payment flow must use server-side decimal arithmetic, idempotency keys, transaction boundaries and generic authorization errors. Demo records must never be submitted to production endpoints.
