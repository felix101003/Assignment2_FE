// ============================================
// HOME PAGE - COMPONENT PLAYGROUND & CHEATSHEET
// ============================================
import React, { useState } from 'react';
import CustomAlert from '../../reusable/CustomAlert';
import CustomBadge from '../../reusable/CustomBadge';
import CustomButton from '../../reusable/CustomButton';
import CustomCard from '../../reusable/CustomCard';
import CustomCheckbox from '../../reusable/CustomCheckbox';
import CustomDropdown from '../../reusable/CustomDropdown';
import CustomInput from '../../reusable/CustomInput';
import CustomModal from '../../reusable/CustomModal';
import CustomPagination from '../../reusable/CustomPagination';
import CustomRadio from '../../reusable/CustomRadio';
import CustomSearchField from '../../reusable/CustomSearchField';
import CustomSpinner from '../../reusable/CustomSpinner';
import CustomTable from '../../reusable/CustomTable';

const PAGE_SIZE = 4;

const HomePage = () => {
    const [selectedValue, setSelectedValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [showFullScreenSpinner, setShowFullScreenSpinner] = useState(false);
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [ticketType, setTicketType] = useState('single');
    const [currentPage, setCurrentPage] = useState(1);

    const dropdownOptions = [
        { label: 'Option 1: Standard Ticket', value: 'std-tkt' },
        { label: 'Option 2: VIP Pass', value: 'vip-pass' },
        { label: 'Option 3: Group Promo', value: 'group-promo' },
    ];

    const radioOptions = [
        { label: 'Single Ride', value: 'single' },
        { label: 'Day Pass', value: 'day' },
        { label: 'Monthly Pass', value: 'monthly' },
    ];

    const tableData = [
        { id: 1, name: 'CustomButton', desc: 'Actions, forms, and CTAs with multiple variants', status: 'Ready' },
        { id: 2, name: 'CustomDropdown', desc: 'Custom select with outside-click close behavior', status: 'Ready' },
        { id: 3, name: 'CustomSearchField', desc: 'Search input with icon and clear button', status: 'Ready' },
        { id: 4, name: 'CustomTable', desc: 'Data table with custom column renderers', status: 'Ready' },
        { id: 5, name: 'CustomInput', desc: 'Text, email, password fields with validation support', status: 'Ready' },
        { id: 6, name: 'CustomModal', desc: 'Dialog overlay with confirm and cancel actions', status: 'Ready' },
        { id: 7, name: 'CustomAlert', desc: 'Inline alerts and toast notifications', status: 'Ready' },
        { id: 8, name: 'CustomCheckbox', desc: 'Checkbox input with label support', status: 'Ready' },
        { id: 9, name: 'CustomRadio', desc: 'Radio group for single-choice selections', status: 'Ready' },
        { id: 10, name: 'CustomPagination', desc: 'Page navigation for lists and tables', status: 'Ready' },
        { id: 11, name: 'CustomSpinner', desc: 'Loading indicator with optional full-screen mode', status: 'Ready' },
        { id: 12, name: 'CustomCard', desc: 'Content card with title, body, and footer', status: 'Ready' },
        { id: 13, name: 'CustomBadge', desc: 'Status tags for labels and table states', status: 'Ready' },
        { id: 14, name: 'Redux Cart Integration', desc: 'Global cart drawer with add/remove/increment', status: 'Ready' },
    ];

    const totalPages = Math.ceil(tableData.length / PAGE_SIZE);
    const paginatedData = tableData.slice(
        (currentPage - 1) * PAGE_SIZE,
        currentPage * PAGE_SIZE
    );

    const columns = [
        { header: 'Component Name', key: 'name' },
        { header: 'Use Case / Description', key: 'desc' },
        {
            header: 'Status',
            key: 'status',
            render: (row) => (
                <CustomBadge variant={row.status === 'Ready' ? 'success' : 'warning'}>
                    {row.status}
                </CustomBadge>
            ),
        },
        {
            header: 'Demo Action',
            key: 'action',
            render: (row) => (
                <CustomButton
                    variant="outline"
                    size="sm"
                    onClick={() => alert(`Clicked action for ${row.name}`)}
                >
                    Test
                </CustomButton>
            ),
        },
    ];

    const handleFullScreenSpinner = () => {
        setShowFullScreenSpinner(true);
        setTimeout(() => setShowFullScreenSpinner(false), 2000);
    };

    return (
        <div className="space-y-8 animate-fade-in">
            {showToast && (
                <CustomAlert
                    toast
                    autoDismiss
                    variant="success"
                    title="Toast Notification"
                    message="This alert auto-dismisses after 4 seconds."
                    onClose={() => setShowToast(false)}
                />
            )}

            {showFullScreenSpinner && (
                <CustomSpinner fullScreen label="Loading full-screen spinner demo..." />
            )}

            <CustomModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Confirm Action"
                confirmLabel="Save Changes"
                onConfirm={() => {
                    setIsModalOpen(false);
                    setShowToast(true);
                }}
            >
                <p>This modal supports ESC to close, overlay click, and confirm/cancel actions.</p>
            </CustomModal>

            <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-2xl p-8 shadow-lg">
                <h1 className="text-3xl font-extrabold tracking-tight">Assessment Template Sandbox</h1>
                <p className="text-blue-105 mt-2 max-w-2xl">
                    A reference playground configured with Tailwind CSS v4, React Router, Redux Toolkit, backend HTTP helpers, and pre-built components.
                </p>
                <div className="flex gap-4 mt-6">
                    <a
                        href="/products"
                        className="bg-white text-blue-700 font-semibold px-5 py-2.5 rounded-lg shadow hover:bg-blue-50 no-underline transition-all cursor-pointer"
                    >
                        Go to Product Shop
                    </a>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomButton</h3>
                    <div className="flex flex-wrap gap-3">
                        <CustomButton variant="primary">Primary</CustomButton>
                        <CustomButton variant="secondary">Secondary</CustomButton>
                        <CustomButton variant="danger">Danger</CustomButton>
                        <CustomButton variant="outline">Outline</CustomButton>
                        <CustomButton variant="ghost">Ghost</CustomButton>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomBadge</h3>
                    <div className="flex flex-wrap gap-3">
                        <CustomBadge variant="success">Success</CustomBadge>
                        <CustomBadge variant="warning">Warning</CustomBadge>
                        <CustomBadge variant="danger">Danger</CustomBadge>
                        <CustomBadge variant="info">Info</CustomBadge>
                        <CustomBadge variant="neutral">Neutral</CustomBadge>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomInput</h3>
                    <CustomInput
                        label="Email Address"
                        type="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        placeholder="you@example.com"
                        helperText="Used for account notifications"
                    />
                    <CustomInput
                        label="Password"
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        placeholder="Enter password"
                        error={password && password.length < 6 ? 'Password must be at least 6 characters' : ''}
                        required
                    />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomDropdown</h3>
                    <CustomDropdown
                        label="Select Ticket Category"
                        options={dropdownOptions}
                        value={selectedValue}
                        onChange={setSelectedValue}
                        placeholder="Choose a ticket type..."
                    />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4 md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomSearchField</h3>
                    <CustomSearchField
                        label="Search Components"
                        value={searchQuery}
                        onChange={setSearchQuery}
                        placeholder="Search tickets..."
                    />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomCheckbox & CustomRadio</h3>
                    <CustomCheckbox
                        label="I accept the terms and conditions"
                        checked={acceptTerms}
                        onChange={(event) => setAcceptTerms(event.target.checked)}
                    />
                    <CustomRadio
                        label="Preferred Ticket Type"
                        name="ticketType"
                        options={radioOptions}
                        value={ticketType}
                        onChange={setTicketType}
                    />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomAlert</h3>
                    <CustomAlert variant="info" title="Info Alert" message="Inline alert for form hints and status messages." />
                    <CustomAlert variant="warning" message="Warning alert without a title." />
                    <CustomButton variant="primary" size="sm" onClick={() => setShowToast(true)}>
                        Show Toast
                    </CustomButton>
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomModal & CustomSpinner</h3>
                    <div className="flex flex-wrap gap-3">
                        <CustomButton variant="primary" size="sm" onClick={() => setIsModalOpen(true)}>
                            Open Modal
                        </CustomButton>
                        <CustomButton variant="outline" size="sm" onClick={handleFullScreenSpinner}>
                            Show Full-Screen Spinner
                        </CustomButton>
                    </div>
                    <CustomSpinner size="md" label="Inline spinner example" />
                </div>

                <div className="bg-white p-6 rounded-xl border border-gray-150 shadow-sm space-y-4 md:col-span-2">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-100 pb-2">CustomCard</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <CustomCard
                            title="Single Ride Ticket"
                            subtitle="Standard metro fare"
                            footer={<CustomBadge variant="info">15.000 đ</CustomBadge>}
                        >
                            <p className="text-gray-600">One-way travel across a single metro zone.</p>
                        </CustomCard>
                        <CustomCard
                            title="Day Pass"
                            subtitle="Unlimited 24-hour travel"
                            footer={<CustomBadge variant="success">40.000 đ</CustomBadge>}
                        >
                            <p className="text-gray-600">Best for tourists and day trips.</p>
                        </CustomCard>
                        <CustomCard
                            title="Monthly Commuter"
                            subtitle="For regular travelers"
                            footer={<CustomBadge variant="warning">200.000 đ</CustomBadge>}
                        >
                            <p className="text-gray-600">Unlimited trips for 30 days.</p>
                        </CustomCard>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-900">CustomTable + CustomPagination</h3>
                <CustomTable columns={columns} data={paginatedData} />
                <CustomPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default HomePage;
