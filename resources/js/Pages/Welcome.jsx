import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link, Head } from '@inertiajs/react';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <Head title="Welcome" />
            <div className="flex flex-col w-full min-h-screen justify-center items-center">
                <div>
                    <Link href="/">
                        <ApplicationLogo size={'lg'} />
                    </Link>
                </div>
                <h2 className="text-5xl text-pink-700 font-bold">
                    RESTO V1 SYSTEM
                </h2>
                <hr className="my-4" />
                {auth.user ? (
                    <Link
                        href={route('dashboard')}
                        className="bg-orange-600 px-8 py-2 rounded-md font-semibold text-orange-200 hover:bg-red-800 "
                    >
                        Dashboard
                    </Link>
                ) : (
                    <Link
                        href={route('login')}
                        className="bg-orange-600 px-8 py-2 rounded-md font-semibold text-orange-200 hover:bg-red-800 "
                    >
                        Log in
                    </Link>
                )}
            </div>

        </>
    );
}
