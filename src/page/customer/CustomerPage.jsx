import React, { useCallback, useEffect, useState } from 'react';
import { customerApi } from '../../api/customerApi';
import { CUSTOMER_ROLES } from '../../config/apiConfig';
// import { initialsAvatar } from '../../utils/avatar'; // offline-safe alternative to the pravatar.cc call below
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
// columns, form fields, and customerApi calls for the real entity.
const PAGE_SIZE = 10;

// TODO(real-topic): the create/edit form's field set + defaults.
const EMPTY_FORM = { firstName: '', lastName: '', email: '', phone: '', role: 'CUSTOMER' };

// TODO(real-topic): drop this if the real entity has no role/category-like field.
const roleOptions = [
    { label: 'All roles', value: '' },
    ...CUSTOMER_ROLES.map((role) => ({ label: role, value: role })),
];

const CustomerPage = () => {
    const [customers, setCustomers] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [alert, setAlert] = useState(null);

    // TODO(real-topic): one piece of state per filter the search bar exposes.
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');

    const [modalMode, setModalMode] = useState(null); // 'create' | 'edit' | null
    const [form, setForm] = useState(EMPTY_FORM);
    const [editingId, setEditingId] = useState(null);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const loadCustomers = useCallback(async (targetPage) => {
        setLoading(true);
        try {
            // TODO(real-topic): filters object + sort field must match the real
            // controller's @RequestParam names (see customerApi.js/apiConfig.js).
            const result = await customerApi.search({ lastName, role }, targetPage, PAGE_SIZE, 'lastName,asc');
            setCustomers(result.content);
            setTotalPages(result.totalPages || 1);
            setPage(result.number || 0);
        } catch (error) {
            setAlert({ variant: 'error', message: error.message });
        } finally {
            setLoading(false);
        }
    }, [lastName, role]);

    useEffect(() => {
        loadCustomers(0);
    }, [loadCustomers]);

    const openCreateModal = () => {
        setForm(EMPTY_FORM);
        setEditingId(null);
        setModalMode('create');
    };

    const openEditModal = (customer) => {
        // TODO(real-topic): map the real response DTO's fields into `form`.
        setForm({
            firstName: customer.firstName,
            lastName: customer.lastName,
            email: customer.email,
            phone: customer.phone || '',
            role: customer.role,
        });
        setEditingId(customer.id);
        setModalMode('edit');
    };

    const closeModal = () => {
        setModalMode(null);
        setEditingId(null);
    };

    const handleSubmit = async () => {
        // Backend's @Pattern on phone only exempts null, not "" — send null when blank.
        const phone = form.phone.trim() || null;

        try {
            if (modalMode === 'create') {
                // TODO(real-topic): payload must match the real CreateXRequestDTO fields.
                await customerApi.create({ ...form, phone });
                setAlert({ variant: 'success', message: `Customer "${form.firstName} ${form.lastName}" created.` });
            } else {
                // TODO(real-topic): payload must match the real UpdateXRequestDTO fields
                // — email/role are locked server-side here (see UpdateCustomerRequestDTO),
                // the real entity's locked/editable split may differ.
                await customerApi.update(editingId, { firstName: form.firstName, lastName: form.lastName, phone });
                setAlert({ variant: 'success', message: `Customer "${form.firstName} ${form.lastName}" updated.` });
            }
            closeModal();
            loadCustomers(page);
        } catch (error) {
            setAlert({ variant: 'error', message: error.message });
        }
    };

    const handleDelete = async () => {
        try {
            await customerApi.remove(deleteTarget.id);
            setAlert({ variant: 'success', message: `Customer "${deleteTarget.firstName} ${deleteTarget.lastName}" deleted.` });
            setDeleteTarget(null);
            loadCustomers(0);
        } catch (error) {
            setAlert({ variant: 'error', message: error.message });
            setDeleteTarget(null);
        }
    };

    // TODO(real-topic): one column per field worth showing in the table.
    const columns = [
        {
            // TODO(real-topic): no image field exists on the backend yet — this is a
            // deterministic placeholder (same id -> same picture) standing in for one.
            // Swap `src` for the real field (e.g. row.avatarUrl/row.photoUrl) once it exists.
            header: '',
            key: 'avatar',
            width: '80px',
            render: (row) => (
                // Hits pravatar.cc over the network — breaks (broken-image icon) with no
                // internet. Offline-safe alternative already written in src/utils/avatar.js:
                // src={initialsAvatar(`${row.firstName} ${row.lastName}`, row.id)}
                <img
                    src={`https://i.pravatar.cc/64?u=${row.id}`}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover bg-gray-100"
                    loading="lazy"
                />
            ),
        },
        { header: 'Name', key: 'name', render: (row) => `${row.firstName} ${row.lastName}` },
        { header: 'Email', key: 'email' },
        { header: 'Phone', key: 'phone', render: (row) => row.phone || '—' },
        {
            header: 'Role',
            key: 'role',
            render: (row) => (
                <CustomBadge variant={row.role === 'ADMIN' ? 'info' : 'neutral'}>{row.role}</CustomBadge>
            ),
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
                    <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
                    <p className="text-gray-500 mt-1">Backed by GET/POST/PUT/DELETE /api/customers on template-backend.</p>
                </div>
                <CustomButton variant="primary" onClick={openCreateModal}>+ New Customer</CustomButton>
            </div>

            {/* TODO(real-topic): one filter control per searchable/filterable field. */}
            <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1 w-full">
                    <CustomSearchField
                        label="Search by last name"
                        value={lastName}
                        onChange={setLastName}
                        onSearch={() => loadCustomers(0)}
                        placeholder="e.g. Nguyen"
                    />
                </div>
                <CustomDropdown
                    label="Role"
                    options={roleOptions}
                    value={role}
                    onChange={(value) => { setRole(value); }}
                />
            </div>

            {loading ? (
                <div className="flex justify-center py-16">
                    <CustomSpinner label="Loading customers..." />
                </div>
            ) : (
                <>
                    <CustomTable columns={columns} data={customers} emptyMessage="No customers found." />
                    <CustomPagination
                        currentPage={page + 1}
                        totalPages={totalPages}
                        onPageChange={(nextPage) => loadCustomers(nextPage - 1)}
                    />
                </>
            )}

            <CustomModal
                isOpen={modalMode !== null}
                onClose={closeModal}
                title={modalMode === 'create' ? 'New Customer' : 'Edit Customer'}
                confirmLabel={modalMode === 'create' ? 'Create' : 'Save'}
                onConfirm={handleSubmit}
            >
                {/* TODO(real-topic): one input per field, same set as EMPTY_FORM above. */}
                <div className="space-y-4">
                    <CustomInput
                        label="First Name"
                        required
                        value={form.firstName}
                        onChange={(event) => setForm({ ...form, firstName: event.target.value })}
                    />
                    <CustomInput
                        label="Last Name"
                        required
                        value={form.lastName}
                        onChange={(event) => setForm({ ...form, lastName: event.target.value })}
                    />
                    <CustomInput
                        label="Email"
                        type="email"
                        required
                        disabled={modalMode === 'edit'}
                        value={form.email}
                        onChange={(event) => setForm({ ...form, email: event.target.value })}
                        helperText={modalMode === 'edit' ? 'Email is locked after creation.' : ''}
                    />
                    <CustomInput
                        label="Phone"
                        value={form.phone}
                        onChange={(event) => setForm({ ...form, phone: event.target.value })}
                        placeholder="0912345678"
                    />
                    {modalMode === 'create' && (
                        <CustomDropdown
                            label="Role"
                            options={CUSTOMER_ROLES.map((r) => ({ label: r, value: r }))}
                            value={form.role}
                            onChange={(value) => setForm({ ...form, role: value })}
                        />
                    )}
                </div>
            </CustomModal>

            <CustomModal
                isOpen={deleteTarget !== null}
                onClose={() => setDeleteTarget(null)}
                title="Delete Customer"
                confirmLabel="Delete"
                onConfirm={handleDelete}
            >
                {/* TODO(real-topic): pick whatever field best identifies the real entity in this sentence. */}
                <p>
                    Are you sure you want to delete{' '}
                    <strong>{deleteTarget && `${deleteTarget.firstName} ${deleteTarget.lastName}`}</strong>? This cannot be undone.
                </p>
            </CustomModal>
        </div>
    );
};

export default CustomerPage;
