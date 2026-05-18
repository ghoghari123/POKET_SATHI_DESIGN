import { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/features/SearchBar';
import { FilterDropdown } from '../components/features/FilterDropdown';
import { Pagination } from '../components/features/Pagination';
import { Table } from '../components/ui/Table';
import { usePagination } from '../hooks/usePagination';
import { mockOrders } from '../data/mockData';
import type { Order } from '../types';
import { formatDate, formatCurrency } from '../utils/helpers';
import { Eye, FileText, Download } from 'lucide-react';

const statusOptions = [
  { value: 'pending', label: 'Pending' },
  { value: 'processing', label: 'Processing' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
  { value: 'refunded', label: 'Refunded' },
];

const serviceOptions = [
  { value: 'Premium Plan', label: 'Premium Plan' },
  { value: 'Basic Plan', label: 'Basic Plan' },
  { value: 'Enterprise', label: 'Enterprise' },
];

export function Orders() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [serviceFilter, setServiceFilter] = useState('');

  const filteredOrders = useMemo(() => {
    return mockOrders.filter((order) => {
      const matchesSearch =
        search === '' ||
        order.orderId.toLowerCase().includes(search.toLowerCase()) ||
        order.customerName.toLowerCase().includes(search.toLowerCase()) ||
        order.customerEmail.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === '' || order.status === statusFilter;
      const matchesService = serviceFilter === '' || order.serviceType === serviceFilter;
      return matchesSearch && matchesStatus && matchesService;
    });
  }, [search, statusFilter, serviceFilter]);

  const {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedItems,
    setPage,
    setPageSize,
  } = usePagination<Order>({ items: filteredOrders, pageSize: 10 });

  const columns = [
    {
      key: 'orderId',
      label: 'Order ID',
      render: (order: typeof mockOrders[0]) => (
        <span className="font-medium text-slate-900 dark:text-slate-100">
          {order.orderId}
        </span>
      ),
    },
    {
      key: 'customer',
      label: 'Customer',
      render: (order: typeof mockOrders[0]) => (
        <div>
          <p className="font-medium text-slate-900 dark:text-slate-100">{order.customerName}</p>
          <p className="text-sm text-slate-500 dark:text-slate-400">{order.customerEmail}</p>
        </div>
      ),
    },
    {
      key: 'serviceType',
      label: 'Service',
      render: (order: typeof mockOrders[0]) => (
        <span className="text-slate-600 dark:text-slate-300">{order.serviceType}</span>
      ),
    },
    {
      key: 'amount',
      label: 'Amount',
      render: (order: typeof mockOrders[0]) => (
        <span className="font-medium text-slate-900 dark:text-slate-100">
          {formatCurrency(order.amount)}
        </span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (order: typeof mockOrders[0]) => {
        const variant = {
          pending: 'warning',
          processing: 'info',
          completed: 'success',
          cancelled: 'error',
          refunded: 'primary',
        }[order.status] as 'warning' | 'info' | 'success' | 'error' | 'primary';
        return <Badge variant={variant}>{order.status}</Badge>;
      },
    },
    {
      key: 'createdAt',
      label: 'Date',
      render: (order: typeof mockOrders[0]) => (
        <span className="text-slate-600 dark:text-slate-400">{formatDate(order.createdAt)}</span>
      ),
    },
    {
      key: 'actions',
      label: 'Actions',
      render: () => (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="sm" className="p-1.5">
            <Eye className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1.5">
            <FileText className="w-4 h-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center gap-4 justify-between">
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search orders..."
            className="sm:w-80"
          />
          <FilterDropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Status"
          />
          <FilterDropdown
            options={serviceOptions}
            value={serviceFilter}
            onChange={setServiceFilter}
            placeholder="All Services"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Download className="w-4 h-4" />}>
            Export
          </Button>
        </div>
      </div>

      <Card padding="none">
        <Table<Order>
          columns={columns}
          data={paginatedItems}
          keyExtractor={(order) => order.id}
          emptyMessage="No orders found"
        />
        {totalItems > pageSize && (
          <div className="px-6 pb-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              pageSize={pageSize}
              totalItems={totalItems}
              onPageChange={setPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </Card>
    </div>
  );
}