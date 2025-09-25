import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Students',
        href: '/students',
    },
    {
        title: 'Create',
        href: '/students/create',
    },
];

export default function Create() {
    const { data, setData, post, errors } = useForm<{
        name: string;
        email: string;
        image: File | null;
        files: File[];
    }>({
        name: '',
        email: '',
        image: null,
        files: [],
    });

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        post('/students', { forceFormData: true });
    }

    function handleRemoveFile(index: number) {
        setData('files', data.files.filter((_, i) => i !== index));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Student" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1 className="text-2xl font-semibold">Create Student</h1>
                <div className="rounded-xl border border-sidebar-border/70 p-4 dark:border-sidebar-border">
                    <form onSubmit={handleSubmit}>
                        {/* Name */}
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

                        {/* Email */}
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

                        {/* Image */}
                        <div className="mb-4">
                            <label htmlFor="image" className="mb-2 block">Image</label>
                            <input
                                id="image"
                                type="file"
                                onChange={(e) => setData('image', e.target.files ? e.target.files[0] : null)}
                                className="w-full rounded-md border-sidebar-border/70 bg-transparent dark:border-sidebar-border"
                            />
                            {errors.image && <div className="text-red-500">{errors.image}</div>}
                        </div>

                        {/* Files */}
                        <div className="mb-4">
                            <label htmlFor="files" className="mb-2 block">Files</label>
                            <input
                                id="files"
                                type="file"
                                multiple
                                onChange={(e) => {
                                    const newFiles = Array.from(e.target.files || []);
                                    setData('files', [...data.files, ...newFiles]);
                                }}
                                className="w-full rounded-md border-sidebar-border/70 bg-transparent dark:border-sidebar-border"
                            />
                            {errors.files && <div className="text-red-500">{errors.files}</div>}

                            {data.files.length > 0 && (
                                <div className="mt-4">
                                    <p className="font-semibold">Selected files:</p>
                                    <ul className="list-disc pl-5">
                                        {data.files.map((file, index) => (
                                            <li key={index} className="flex items-center gap-2">
                                                <span>{file.name}</span>
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

                        {/* Submit */}
                        <button type="submit" className="btn btn-primary">
                            Create
                        </button>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
