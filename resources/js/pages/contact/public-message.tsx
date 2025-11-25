import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function PublicMessage() {
    return (
        <AppLayout>
            <Head title="Public Message" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>welcome public</h1>
            </div>
        </AppLayout>
    );
}
