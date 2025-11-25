import PublicLayout from '@/layouts/public-layout';

export default function AboutUs() {
    return (
        <PublicLayout title="About Us">
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <h2 className="text-2xl font-semibold mb-4">About Us</h2>
                            <p>This is the About Us page.</p>
                        </div>
                    </div>
                </div>
            </div>
        </PublicLayout>
    );
}
