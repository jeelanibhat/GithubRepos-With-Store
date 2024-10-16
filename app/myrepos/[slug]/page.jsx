
"use client"

import { useEffect, useState } from "react";

const DetailsPage = ({ params: { slug } }) => {

    const [gitUser, setGitUser] = useState([])
    const fetchUser = async () => {
        const user = await fetch(`https://api.github.com/users/${slug}`, {
            next: {
                revalidate: 60
            }
        });
        const gitUser = await user.json();
        console.log("user:", gitUser)
        setGitUser(gitUser)
    }

    useEffect(() => {
        fetchUser()
    }, [slug])

    return (

        <div className="max-w-sm mx-auto bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 ease-in-out">
    <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
            <img src={gitUser.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full shadow-md border-2 border-indigo-500" />
            <div>
                <h3 className="text-2xl font-bold text-gray-800">{gitUser.name}</h3>
                <p className="text-sm text-gray-500">@{gitUser.login}</p>
            </div>
        </div>
        <div className="text-gray-700 text-base mb-6">
            {gitUser.bio ? gitUser.bio : "This user has no bio."}
        </div>

        <div className="flex flex-col space-y-2 mb-4">
            {gitUser.twitter_username && (
                <p className="text-blue-500">
                    <i className="fab fa-twitter mr-2"></i>@{gitUser.twitter_username}
                </p>
            )}
            {gitUser.location && (
                <p className="text-gray-500">
                    <i className="fas fa-map-marker-alt mr-2"></i>{gitUser.location}
                </p>
            )}
            {gitUser.company && (
                <p className="text-gray-500">
                    <i className="fas fa-briefcase mr-2"></i>{gitUser.company}
                </p>
            )}
        </div>

        <div className="border-t pt-4">
            <div className="flex justify-between items-center">
                <p className="text-gray-500 text-sm">Followers: <span className="font-semibold text-gray-800">{gitUser.followers}</span></p>
                <a
                    href={`https://github.com/${gitUser.login}`}
                    className="text-white bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    View Profile
                </a>
            </div>
        </div>
    </div>
</div>

    )
}

export default DetailsPage