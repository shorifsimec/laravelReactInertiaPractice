import AppLayout from '@/layouts/app-layout';
import { type Student, type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';

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
    const { data, setData, errors } = useForm({
        name: student.name,
        email: student.email,
        image: null as File | null,
        files: (student.files || []) as (File | string)[],
    });

    const handleRemoveFile = (indexToRemove: number) => {
        setData('files', data.files.filter((_, index) => index !== indexToRemove));
    };

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        router.post(`/students/${student.id}`, {
            _method: 'put',
            forceFormData: true,
            ...data,
        });
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
                        <div className="mb-4">
                            <label htmlFor="image" className="mb-2 block">Image</label>
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="w-full rounded-md border-sidebar-border/70 bg-transparent dark:border-sidebar-border"
                            />
                            {errors.image && <div className="text-red-500">{errors.image}</div>}
                            <img src={`/storage/${student.image}`} alt={student.name} className="mt-4 w-32 h-32 object-cover rounded-full" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="files" className="mb-2 block">Files</label>
                            <input
                                id="files"
                                type="file"
                                multiple
                                onChange={(e) => setData('files', [...data.files, ...Array.from(e.target.files || [])])}
                                className="w-full rounded-md border-sidebar-border/70 bg-transparent dark:border-sidebar-border"
                            />
                            {errors.files && <div className="text-red-500">{errors.files}</div>}
                            {data.files.length > 0 && (
                                <div className="mt-4">
                                    <p className="font-semibold">Current files:</p>
                                    <ul className="list-disc pl-5">
                                        {data.files.map((file, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                {typeof file === 'string' ? (
                                                    <a href={`/storage/${file}`} target="_blank" rel="noopener noreferrer">
                                                        {file.split('/').pop()}
                                                    </a>
                                                ) : (
                                                    <span>{file.name}</span>
                                                )}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveFile(index)}
                                                    className="text-red-500 hover:text-red-700 ml-2"
                                                >
                                                    Remove
                                                </button>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
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
