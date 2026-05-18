import { useState, useMemo } from 'react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Avatar } from '../components/ui/Avatar';
import { Button } from '../components/ui/Button';
import { SearchBar } from '../components/features/SearchBar';
import { FilterDropdown } from '../components/features/FilterDropdown';
import { Pagination } from '../components/features/Pagination';
import { Table } from '../components/ui/Table';
import { usePagination } from '../hooks/usePagination';
import { mockUsers } from '../data/mockData';
import type { User } from '../types';
import { formatDate } from '../utils/helpers';
import { Edit2, Trash2, Eye, MoreHorizontal } from 'lucide-react';

const statusOptions = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
  { value: 'pending', label: 'Pending' },
  { value: 'suspended', label: 'Suspended' },
];

const roleOptions = [
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'user', label: 'User' },
  { value: 'viewer', label: 'Viewer' },
];

export function Users() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  const filteredUsers = useMemo(() => {
    return mockUsers.filter((user) => {
      const matchesSearch =
        search === '' ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === '' || user.status === statusFilter;
      const matchesRole = roleFilter === '' || user.role === roleFilter;
      return matchesSearch && matchesStatus && matchesRole;
    });
  }, [search, statusFilter, roleFilter]);

  const {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    paginatedItems,
    setPage,
    setPageSize,
  } = usePagination<User>({ items: filteredUsers, pageSize: 10 });

  const columns = [
    {
      key: 'user',
      label: 'User',
      render: (user: typeof mockUsers[0]) => (
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} name={user.name} size="sm" />
          <div>
            <p className="font-medium text-slate-900 dark:text-slate-100">{user.name}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      label: 'Role',
      render: (user: typeof mockUsers[0]) => (
        <span className="capitalize text-slate-600 dark:text-slate-300">{user.role}</span>
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (user: typeof mockUsers[0]) => {
        const variant = {
          active: 'success',
          inactive: 'default',
          pending: 'warning',
          suspended: 'error',
        }[user.status] as 'success' | 'default' | 'warning' | 'error';
        return <Badge variant={variant}>{user.status}</Badge>;
      },
    },
    {
      key: 'createdAt',
      label: 'Joined',
      render: (user: typeof mockUsers[0]) => (
        <span className="text-slate-600 dark:text-slate-400">{formatDate(user.createdAt)}</span>
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
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" className="p-1.5 text-red-500 hover:text-red-600">
            <Trash2 className="w-4 h-4" />
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
            placeholder="Search users..."
            className="sm:w-80"
          />
          <FilterDropdown
            options={statusOptions}
            value={statusFilter}
            onChange={setStatusFilter}
            placeholder="All Status"
          />
          <FilterDropdown
            options={roleOptions}
            value={roleFilter}
            onChange={setRoleFilter}
            placeholder="All Roles"
          />
        </div>
        <Button>Add User</Button>
      </div>

      <Card padding="none">
        <Table<User>
          columns={columns}
          data={paginatedItems}
          keyExtractor={(user) => user.id}
          emptyMessage="No users found"
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