import AppLayout from '@/layouts/app-layout';
import { type Student, type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
];

export default function Index({ students }: { students: Student[] }) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Students" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-semibold">Students</h1>
                    <Link href='/students/create' className="btn btn-primary">
                        Create Student
                    </Link>
                </div>
                <div className="rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                <th className="p-4 text-left">Image</th>
                                <th className="p-4 text-left">Name</th>
                                <th className="p-4 text-left">Email</th>
                                <th className="p-4 text-left"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {students.map((student) => (
                                <tr key={student.id} className="border-b border-sidebar-border/70 dark:border-sidebar-border">
                                    <td className="p-4">
                                        <img src={`/storage/${student.image}`} alt={student.name} className="w-16 h-16 object-cover rounded-full" />
                                    </td>
                                    <td className="p-4">{student.name}</td>
                                    <td className="p-4">{student.email}</td>
                                    <td className="p-4 text-right">
                                        <Link href={`/students/${student.id}/edit`} className="btn btn-secondary mr-2">
                                            Edit
                                        </Link>
                                        <Link href={`/students/${student.id}`} method="delete" as="button" className="btn btn-danger">
                                            Delete
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AppLayout>
    );
}
