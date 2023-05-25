import React from 'react';
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { REMOVE_GAME_RESULT } from "../utils/mutations";
import { getUserToken } from '../utils/localStorage';

type User = {
    me: {
      email: string;
      savedResults: SavedResult[];
      username: string;
    }
}

type SavedResult = {
  _id: string
  mash: string;
  partner: string;
  kids: number;
  career: string;
  salary: number;
  transportation: string;
  death: string;
  deathAge: number;
}

const Profile:  React.FC = () => {
  const { loading, data, refetch } = useQuery<User>(GET_ME);
  const [removeGameResult] = useMutation(
    REMOVE_GAME_RESULT
  );

  const userData = data?.me;
//removing game result
  const handleDeleteGameResult = async (id: string) => {
    const token = getUserToken()

    if (!token) {
      return false;
    }

    const idData = {
      _id: id,
    }

    console.log(idData)
    try {
      await removeGameResult({
        variables: { removeGameResults: {idData}},
      });
      refetch();
    } catch (err) {
      console.error(err);
    
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (!userData) {
    return <h2>No User Data</h2>
  }
  


    return (
      <>
      <div className="text-light bg-dark p-5">
        <div className="container mx-auto">
          <h1>View your Profile!</h1>
        </div>
      </div>
      <div className="container mx-auto">
        <h2 className="pt-5">
          {userData.savedResults&& userData.savedResults.length
            ? `Viewing ${userData.savedResults.length} saved`
            : "You have no saved results!"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {userData.savedResults?.map((result, index) => (
            <div key={index}>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{result.mash}</h3>
                  <p className="text-sm text-gray-600">User: {userData.username}</p>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 mt-4 rounded"
                    onClick={() => handleDeleteGameResult(result._id)}
                  >
                    Delete this Story!
                  </button>
                </div>
              </div>
          ))}
        </div>
      </div>
    </>
    )
};

export default Profile;