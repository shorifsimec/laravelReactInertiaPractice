import AppLayout from '@/layouts/app-layout';
import { type Student, type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Show',
        href: '#',
    },
];

export default function Show({ student }: { student: Student }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={student.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-semibold">{student.name}</h1>
                <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <div className="mb-4">
                        <p className="text-sm text-gray-500">Name</p>
                        <p>{student.name}</p>
                    </div>
                    <div className="mb-4">
                        <p className="text-sm text-gray-500">Email</p>
                        <p>{student.email}</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
