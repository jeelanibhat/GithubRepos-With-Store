import Link from "next/link";
const fetchGitUsers = async () => {
    const users = await fetch('https://api.github.com/users', {
        next: {
            revalidate: 60
        }
    });
    const userData = await users.json()
    console.log("response:", userData)
    return userData
}
const GithubUsers = async () => {
    const repos = await fetchGitUsers();
    return (
        <div className="bg-white rounded-xl shadow-md p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {repos.map((data) => {
        return (
            <div key={data.id} className="bg-gray-100 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300 ease-in-out">
                <div className="flex flex-col items-center">
                    <img src={data.avatar_url} alt="Avatar" className="w-20 h-20 rounded-full shadow-md border-2 border-indigo-500 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{data.login}</h3>
                    <Link
                        href={`/myrepos/${data.login}`}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium mt-4"
                    >
                        View Profile
                    </Link>
                </div>
            </div>
        );
    })}
</div>

    )
}

export default GithubUsers