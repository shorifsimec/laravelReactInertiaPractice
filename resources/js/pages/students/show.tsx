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
                    {student.image && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Image</p>
                            <img src={`/storage/${student.image}`} alt={student.name} className="mt-2 w-32 h-32 object-cover rounded-full" />
                        </div>
                    )}
                    {student.files && student.files.length > 0 && (
                        <div className="mb-4">
                            <p className="text-sm text-gray-500">Files</p>
                            <ul className="list-disc pl-5">
                                {student.files.map((file, index) => (
                                    <li key={index} className="flex items-center gap-2">
                                        <a href={`/storage/${file.path}`} target="_blank" rel="noopener noreferrer">
                                            {file.original_name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
