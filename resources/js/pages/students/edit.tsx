import AppLayout from '@/layouts/app-layout';
import { type Student, type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Edit',
        href: '#',
    },
];

export default function Edit({ student }: { student: Student }) {
    const { data, setData, put, errors } = useForm({
        name: student.name,
        email: student.email,
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        put(`/students/${student.id}`);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${student.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Edit {student.name}</h1>
                <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="name" className="mb-2 block">Name</label>
                            <input
                                id="name"
                                type="text"
                                value={data.name}
                                onChange={(e) => setData('name', e.target.value)}
                                className="w-full rounded-md border-sidebar-border/70 bg-transparent dark:border-sidebar-border"
                            />
                            {errors.name && <div className="text-red-500">{errors.name}</div>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="email" className="mb-2 block">Email</label>
                            <input
                                id="email"
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                className="w-full rounded-md border-sidebar-border/70 bg-transparent dark:border-sidebar-border"
                            />
                            {errors.email && <div className="text-red-500">{errors.email}</div>}
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
