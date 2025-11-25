import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function ContactUs() {



    return (
        <AppLayout>

            <Head title="Contact Us" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <h1>welcome contact</h1>
            </div>
        </AppLayout>
    );
}
