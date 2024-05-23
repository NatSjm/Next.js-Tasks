import {NextPage} from "next";
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <main
            className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <h1 className="text-5xl font-bold mb-12 text-white animate-pulse">
                Welcome
            </h1>
            <div className="flex flex-col space-y-6">
                <Link
                    href="/todo"
                    className="px-8 py-4 bg-white text-blue-600 rounded-full shadow-lg hover:bg-blue-100 transition-colors duration-300 font-semibold text-lg text-center"
                >
                    Your tasks
                </Link>
            </div>
        </main>
    );
};

export default Home;