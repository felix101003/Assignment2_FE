import React, { useCallback, useEffect, useState } from 'react';
import { bookingApi } from '../../api/bookingApi';
import { customerApi } from '../../api/customerApi';
import { BOOKING_STATUSES } from '../../config/apiConfig';
import CustomAlert from '../../reusable/CustomAlert';
import CustomBadge from '../../reusable/CustomBadge';
import CustomButton from '../../reusable/CustomButton';
import CustomDropdown from '../../reusable/CustomDropdown';
import CustomInput from '../../reusable/CustomInput';
import CustomModal from '../../reusable/CustomModal';
import CustomPagination from '../../reusable/CustomPagination';
import CustomSearchField from '../../reusable/CustomSearchField';
import CustomSpinner from '../../reusable/CustomSpinner';
import CustomTable from '../../reusable/CustomTable';

// TODO(real-topic): this whole page is the template's example CRUD screen —
// once the real topic is known, copy this structure (search/filter bar,
// paginated table, create/edit modal, delete-confirm modal) but swap the
// columns, form fields, and bookingApi calls for the real entity. The
// customer-picker dropdown pattern here is also worth keeping if the real
// entity references another one the same way Booking references Customer.
const PAGE_SIZE = 10;

// TODO(real-topic): the create/edit form's field set + defaults.
const EMPTY_FORM = { customerId: '', serviceName: '', scheduledAt: '', notes: '', status: 'PENDING' };

// TODO(real-topic): drop this if the real entity has no status-like field.
const statusOptions = [
    { label: 'All statuses', value: '' },
    ...BOOKING_STATUSES.map((status) => ({ label: status, value: status })),
];

// TODO(real-topic): badge color per status value — drop with statusOptions above.
const statusVariant = {
    PENDING: 'warning',
    CONFIRMED: 'info',
    COMPLETED: 'success',
    CANCELLED: 'danger',
};

// <input type="datetime-local"> <-> Instant (ISO 8601) conversions.
const toDatetimeLocal = (iso) => (iso ? iso.slice(0, 16) : '');
const toIsoInstant = (localValue) => (localValue ? new Date(localValue).toISOString() : null);

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    // TODO(real-topic): one piece of state per filter the search bar exposes.
    const [serviceName, setServiceName] = useState('');
    const [status, setStatus] = useState('');
    const [customerId, setCustomerId] = useState('');

    const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | null
    const [form, setForm] = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    // Customers for the picker dropdown — fetched once, not paginated with the table.
    useEffect(() => {
        customerApi.search({}, 0, 200, 'lastName,asc')
            .then((result) => setCustomers(result.content))
            .catch((error) => setAlert({ variant: 'error', message: error.message }));
    }, []);

    const loadBookings = useCallback(async (targetPage) => {
        setLoading(true);
        try {
            // TODO(real-topic): filters object + sort field must match the real
            // controller's @RequestParam names (see bookingApi.js/apiConfig.js).
            const result = await bookingApi.search({ customerId, serviceName, status }, targetPage, PAGE_SIZE, 'scheduledAt,asc');
            setBookings(result.content);
            setTotalPages(result.totalPages || 1);
            setPage(result.number || 0);
        } catch (error) {
            setAlert({ variant: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    }, [customerId, serviceName, status]);

    useEffect(() => {
        loadBookings(0);
    }, [loadBookings]);

    // TODO(real-topic): only needed if the real entity references another one
    // the way Booking references Customer — drop this + the `customers` state/
    // effect above if it doesn't.
    const customerOptions = customers.map((c) => ({
        label: `${c.firstName} ${c.lastName} (${c.email})`,
        value: c.id,
    }));

    const openCreateModal = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setModalMode('create');
    };

    const openEditModal = (booking) => {
        // TODO(real-topic): map the real response DTO's fields into `form`.
        setForm({
            customerId: booking.customerId,
            serviceName: booking.serviceName,
            scheduledAt: toDatetimeLocal(booking.scheduledAt),
            notes: booking.notes || '',
            status: booking.status,
        });
        setEditingId(booking.id);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingId(null);
    };

    const handleSubmit = async () => {
        try {
            if (modalMode === 'create') {
                // TODO(real-topic): payload must match the real CreateXRequestDTO fields.
                await bookingApi.create({
                    customerId: form.customerId,
                    serviceName: form.serviceName,
                    scheduledAt: toIsoInstant(form.scheduledAt),
                    notes: form.notes,
                });
                setAlert({ variant: 'success', message: `Booking "${form.serviceName}" created.` });
            } else {
                // TODO(real-topic): payload must match the real UpdateXRequestDTO fields
                // — customerId/serviceName are locked server-side here (see
                // UpdateBookingRequestDTO), the real entity's locked/editable split may differ.
                await bookingApi.update(editingId, {
                    scheduledAt: toIsoInstant(form.scheduledAt),
                    notes: form.notes,
                    status: form.status,
                });
                setAlert({ variant: 'success', message: `Booking "${form.serviceName}" updated.` });
            }
            closeModal();
            loadBookings(page);
        } catch (error) {
            setAlert({ variant: 'error', message: error.message });
        }
    };

    const handleDelete = async () => {
        try {
            await bookingApi.remove(deleteTarget.id);
            setAlert({ variant: 'success', message: `Booking "${deleteTarget.serviceName}" deleted.` });
            setDeleteTarget(null);
            loadBookings(0);
        } catch (error) {
            setAlert({ variant: 'error', message: error.message });
            setDeleteTarget(null);
        }
    };

    // TODO(real-topic): one column per field worth showing in the table.
    const columns = [
        {
            header: 'Customer',
            key: 'customer',
            render: (row) => row.customer ? `${row.customer.fullName} (${row.customer.email})` : row.customerId,
        },
        { header: 'Service', key: 'serviceName' },
        {
            header: 'Scheduled',
            key: 'scheduledAt',
            render: (row) => new Date(row.scheduledAt).toLocaleString(),
        },
        {
            header: 'Status',
            key: 'status',
            render: (row) => <CustomBadge variant={statusVariant[row.status] || 'neutral'}>{row.status}</CustomBadge>,
        },
        {
            header: 'Actions',
            key: 'actions',
            render: (row) => (
                <div className="flex gap-2">
                    <CustomButton variant="outline" size="sm" onClick={() => openEditModal(row)}>
                        Edit
                    </CustomButton>
                    <CustomButton variant="danger" size="sm" onClick={() => setDeleteTarget(row)}>
                        Delete
                    </CustomButton>
                </div>
            ),
        },
    ];

    return (
        <div className="space-y-6">
            {alert && (
                <CustomAlert
                    toast
                    autoDismiss
                    variant={alert.variant}
                    message={alert.message}
                    onClose={() => setAlert(null)}
                />
            )}

            <div className="flex justify-between items-center bg-white p-8 rounded-xl border border-gray-150 shadow-sm">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Bookings</h1>
                    <p className="text-gray-500 mt-1">Backed by GET/POST/PUT/DELETE /api/bookings on template-backend.</p>
                </div>
                <CustomButton variant="primary" onClick={openCreateModal} disabled={customers.length === 0}>
                    + New Booking
                </CustomButton>
            </div>

            {/* TODO(real-topic): one filter control per searchable/filterable field. */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <CustomSearchField
                        label="Search by service name"
                        value={serviceName}
                        onChange={setServiceName}
                        onSearch={() => loadBookings(0)}
                        placeholder="e.g. Haircut"
                    />
                </div>
                <CustomDropdown
                    label="Customer"
                    options={[{ label: 'All customers', value: '' }, ...customerOptions]}
                    value={customerId}
                    onChange={setCustomerId}
                />
                <CustomDropdown
                    label="Status"
                    options={statusOptions}
                    value={status}
                    onChange={setStatus}
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <CustomSpinner label="Loading bookings..." />
                </div>
            ) : (
                <>
                    <CustomTable columns={columns} data={bookings} emptyMessage="No bookings found." />
                    <CustomPagination
                        currentPage={page + 1}
                        totalPages={totalPages}
                        onPageChange={(nextPage) => loadBookings(nextPage - 1)}
                    />
                </>
            )}

            <CustomModal
                isOpen={modalMode !== null}
                onClose={closeModal}
                title={modalMode === 'create' ? 'New Booking' : 'Edit Booking'}
                confirmLabel={modalMode === 'create' ? 'Create' : 'Save'}
                onConfirm={handleSubmit}
            >
                {/* TODO(real-topic): one input per field, same set as EMPTY_FORM above. */}
                <div className="space-y-4">
                    <CustomDropdown
                        label="Customer"
                        options={customerOptions}
                        value={form.customerId}
                        onChange={(value) => setForm({ ...form, customerId: value })}
                        placeholder="Select a customer..."
                        className={modalMode === 'edit' ? 'pointer-events-none opacity-60' : ''}
                    />
                    <CustomInput
                        label="Service Name"
                        required
                        disabled={modalMode === 'edit'}
                        value={form.serviceName}
                        onChange={(event) => setForm({ ...form, serviceName: event.target.value })}
                        placeholder="e.g. Haircut"
                    />
                    <CustomInput
                        label="Scheduled At"
                        type="datetime-local"
                        required
                        value={form.scheduledAt}
                        onChange={(event) => setForm({ ...form, scheduledAt: event.target.value })}
                        helperText="Must be a future date/time."
                    />
                    <CustomInput
                        label="Notes"
                        value={form.notes}
                        onChange={(event) => setForm({ ...form, notes: event.target.value })}
                    />
                    {modalMode === 'edit' && (
                        <CustomDropdown
                            label="Status"
                            options={BOOKING_STATUSES.map((s) => ({ label: s, value: s }))}
                            value={form.status}
                            onChange={(value) => setForm({ ...form, status: value })}
                        />
                    )}
                </div>
            </CustomModal>

            <CustomModal
                isOpen={deleteTarget !== null}
                onClose={() => setDeleteTarget(null)}
                title="Delete Booking"
                confirmLabel="Delete"
                onConfirm={handleDelete}
            >
                {/* TODO(real-topic): pick whatever field best identifies the real entity in this sentence. */}
                <p>
                    Are you sure you want to delete <strong>{deleteTarget && deleteTarget.serviceName}</strong>? This cannot be undone.
                </p>
            </CustomModal>
        </div>
    );
};

export default BookingPage;
