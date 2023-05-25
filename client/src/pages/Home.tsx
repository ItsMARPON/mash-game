import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_GAME_RESULT } from "../utils/mutations";
import Auth from "../utils/auth";


import house from "../assets/images/mashHouse.png";
import { getUserToken } from "../utils/localStorage";
export interface HomeProps {
  handleSubmit: (e: React.FormEvent<EventTarget>) => void;
};

const Home = (props: HomeProps) => {
  const [partnerOption, setPartnerOption] = useState("");
  const [partnerOption2, setPartnerOption2] = useState("");
  const [partnerOption3, setPartnerOption3] = useState("");
  // Kids useState
  const [kidsOption, setKidsOption] = useState("");
  const [kidsOption2, setKidsOption2] = useState("");
  const [kidsOption3, setKidsOption3] = useState("");
  // Career useState
  const [careerOption, setCareerOption] = useState("");
  const [careerOption2, setCareerOption2] = useState("");
  const [careerOption3, setCareerOption3] = useState("");
  // Transportation useState
  const [carOption, setCarOption] = useState("");
  const [carOption2, setCarOption2] = useState("");
  const [carOption3, setCarOption3] = useState("");
  // Salary useState
  const [salaryOption, setSalaryOption] = useState("");
  const [salaryOption2, setSalaryOption2] = useState("");
  const [salaryOption3, setSalaryOption3] = useState("");
  // Death Age useState
  const [deathAgeOption, setDeathAgeOption] = useState("");
  const [deathAgeOption2, setDeathAgeOption2] = useState("");
  const [deathAgeOption3, setDeathAgeOption3] = useState("");
  // Death useState
  const [deathOption, setDeathOption] = useState("");
  const [deathOption2, setDeathOption2] = useState("");
  const [deathOption3, setDeathOption3] = useState("");
  // Result useState
  const [result, setResult] = useState("");


  const mash = ["mansion", "apartment", "shack", "house"];
  const partners = ["John", "Lisa", "Michael", "Sarah", "Brooke", "Jess"];
  const kids = ["0", "1", "2", "3", "5", "10"];
  const careers = [
    "Engineer",
    "Teacher",
    "Doctor",
    "Artist",
    "Developer",
    "Lawyer",
  ];
  const cars = ["Sedan", "SUV", "Sports Car", "Truck", "Bike", "Lambo"];
  const salaries = [
    "50,000",
    "80,000",
    "100,000",
    "150,000",
    "0",
    "1,000,000",
  ];
  const deathAges = ["70", "80", "90", "100", "25", "40", "50"];
  const deaths = [
    "Old Age",
    "Accident",
    "Disease",
    "Natural Causes",
    "Skydiving",
    "Hotdog",
  ];

  const [addGameResult, { error }] = useMutation(ADD_GAME_RESULT);

  const handleSubmit = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();

    let selectedMash;
    selectedMash =
        mash[Math.floor(Math.random() * mash.length)];

    let selectedPartner;
    if (partnerOption && partnerOption2 && partnerOption3) {
      // Randomly pick one of the three assigned values
      const randomIndex = Math.floor(Math.random() * 3);
      selectedPartner = [partnerOption, partnerOption2, partnerOption3][
        randomIndex
      ];
    } else {
      // If any of the fields is empty, select the non-empty value or choose a random value
      selectedPartner =
        partnerOption ||
        partnerOption2 ||
        partnerOption3 ||
        partners[Math.floor(Math.random() * partners.length)];
    }

    let selectedKids;
    if (kidsOption && kidsOption2 && kidsOption3) {
      const randomIndex = Math.floor(Math.random() * 3);
      selectedKids = [kidsOption, kidsOption2, kidsOption3][randomIndex];
    } else {
      selectedKids =
        kidsOption ||
        kidsOption2 ||
        kidsOption3 ||
        kids[Math.floor(Math.random() * kids.length)];
    }

    let selectedCareer;
    if (careerOption && careerOption2 && careerOption3) {
      const randomIndex = Math.floor(Math.random() * 3);
      selectedCareer = [careerOption, careerOption2, careerOption3][
        randomIndex
      ];
    } else {
      selectedCareer =
        careerOption ||
        careerOption2 ||
        careerOption3 ||
        careers[Math.floor(Math.random() * careers.length)];
    }

    let selectedCar;
    if (carOption && carOption2 && carOption3) {
      const randomIndex = Math.floor(Math.random() * 3);
      selectedCar = [carOption, carOption2, carOption3][randomIndex];
    } else {
      selectedCar =
        carOption ||
        carOption2 ||
        carOption3 ||
        cars[Math.floor(Math.random() * cars.length)];
    }

    let selectedSalary;
    if (salaryOption && salaryOption2 && salaryOption3) {
      const randomIndex = Math.floor(Math.random() * 3);
      selectedSalary = [salaryOption, salaryOption2, salaryOption3][
        randomIndex
      ];
    } else {
      selectedSalary =
        salaryOption ||
        salaryOption2 ||
        salaryOption3 ||
        salaries[Math.floor(Math.random() * salaries.length)];
    }

    let selectedDeathAge;
    if (deathAgeOption && deathAgeOption2 && deathAgeOption3) {
      const randomIndex = Math.floor(Math.random() * 3);
      selectedDeathAge = [deathAgeOption, deathAgeOption2, deathAgeOption3][
        randomIndex
      ];
    } else {
      selectedDeathAge =
        deathAgeOption ||
        deathAgeOption2 ||
        deathAgeOption3 ||
        deathAges[Math.floor(Math.random() * deathAges.length)];
    }

    let selectedDeath;
    if (deathOption && deathOption2 && deathOption3) {
      const randomIndex = Math.floor(Math.random() * 3);
      selectedDeath = [deathOption, deathOption2, deathOption3][randomIndex];
    } else {
      selectedDeath =
        deathOption ||
        deathOption2 ||
        deathOption3 ||
        deaths[Math.floor(Math.random() * deaths.length)];


    }

    const resultData = {
      "mash": `${selectedMash}`,
      "partner": `${selectedPartner}`,
      "kids": `${selectedKids}`,
      "career": `${selectedCareer}`,
      "salary": `${selectedSalary}`,
      "transportation": `${selectedCar}`,
      "death": `${selectedDeath}`,
      "deathAge": `${selectedDeathAge}`
    }

    const resultText = `You will marry ${selectedPartner} and have ${selectedKids} kids together. You will live in a ${selectedMash}. You will work as a ${selectedCareer} for a living, make $${selectedSalary} a year, and drive a ${selectedCar}. You will die at the age of ${selectedDeathAge} by ${selectedDeath}.`;
    setResult(resultText);
    
    // const token = Auth.loggedIn() ? Auth.getToken() : null;
    const token = getUserToken();
  
    if (!token) {
      console.log(resultData);
      return false;
    }

    try {
      const { data } = await addGameResult({
        variables: { ...resultData },
      });
    } catch (err) {
      console.error(err);
    }


    console.log(resultData);
  };

  
  return (
    <div>
      <div
        className="flex justify-center items-center h-screen w-screen"
        style={{
          backgroundImage: `url(${house})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-center">MASH Game</h1>
          <p className="text-center text-xl text-red-500">
            Click Submit for a random result or input your own answers
          </p>
          <form onSubmit={handleSubmit} className="grid grid-cols-3 gap-4">
            {/* Left Column */}
            <div className="text-center">
              <div className="mb-4">
                <label
                  htmlFor="partner"
                  className="block mb-2 font-bold text-2xl text-black bg-opacity-50 rounded-full"
                >
                  Love interest:
                </label>
                <input
                  type="text"
                  id="partner"
                  value={partnerOption}
                  onChange={(e) => setPartnerOption(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="partner2"
                  value={partnerOption2}
                  onChange={(e) => setPartnerOption2(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="partner3"
                  value={partnerOption3}
                  onChange={(e) => setPartnerOption3(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="kids"
                  className="block mb-2 font-bold text-2xl text-black bg-opacity-50 rounded-full"
                >
                  Amount of kids:
                </label>
                <input
                  type="text"
                  id="kids"
                  value={kidsOption}
                  onChange={(e) => setKidsOption(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="kids2"
                  value={kidsOption2}
                  onChange={(e) => setKidsOption2(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="kids3"
                  value={kidsOption3}
                  onChange={(e) => setKidsOption3(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="career"
                  className="block mb-2 font-bold text-2xl text-black bg-opacity-50 rounded-full"
                >
                  Career choice:
                </label>
                <input
                  type="text"
                  id="career"
                  value={careerOption}
                  onChange={(e) => setCareerOption(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="career2"
                  value={careerOption2}
                  onChange={(e) => setCareerOption2(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="career3"
                  value={careerOption3}
                  onChange={(e) => setCareerOption3(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
              </div>
            </div>

            {/* Middle Column */}
            <div className="text-center">
              <div className="mb-4">
                <label
                  htmlFor="deathAge"
                  className="block mb-2 font-bold text-2xl text-black bg-opacity-50 rounded-full"
                >
                  Death age:
                </label>
                <input
                  type="text"
                  id="deathAge"
                  value={deathAgeOption}
                  onChange={(e) => setDeathAgeOption(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="deathAge2"
                  value={deathAgeOption2}
                  onChange={(e) => setDeathAgeOption2(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="deathAge3"
                  value={deathAgeOption3}
                  onChange={(e) => setDeathAgeOption3(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
              </div>
              {/* ... */}
            </div>

            {/* Right Column */}
            <div className="text-center">
              <div className="mb-4">
                <label
                  htmlFor="transportation"
                  className="block mb-2 font-bold text-2xl text-black bg-opacity-50 rounded-full"
                >
                  Transportation:
                </label>
                <input
                  type="text"
                  id="transportation"
                  value={carOption}
                  onChange={(e) => setCarOption(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="transportation2"
                  value={carOption2}
                  onChange={(e) => setCarOption2(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="transportation3"
                  value={carOption3}
                  onChange={(e) => setCarOption3(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="house"
                  className="block mb-2 font-bold text-2xl text-black bg-opacity-50 rounded-full"
                >
                  Salary:
                </label>
                <input
                  type="text"
                  id="salary"
                  value={salaryOption}
                  onChange={(e) => setSalaryOption(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="salary2"
                  value={salaryOption2}
                  onChange={(e) => setSalaryOption2(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="salary3"
                  value={salaryOption3}
                  onChange={(e) => setSalaryOption3(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
              </div>
              <div>
                <label
                  htmlFor="death"
                  className="block mb-2 font-bold text-2xl text-black bg-opacity-50 rounded-full"
                >
                  Cause of death:
                </label>
                <input
                  type="text"
                  id="death"
                  value={deathOption}
                  onChange={(e) => setDeathOption(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="death2"
                  value={deathOption2}
                  onChange={(e) => setDeathOption2(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
                <br />
                <input
                  type="text"
                  id="death3"
                  value={deathOption3}
                  onChange={(e) => setDeathOption3(e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                />
              </div>
            </div>
            <div className="col-span-3 flex justify-center">
              <button
                type="submit"
                className="bg-[#F70753] text-white px-8 py-2 rounded-md"
              >
                Submit
              </button>
            </div>
          </form>

          {result && (
            <div className="mt-4 p-3 rounded-md bg-white">
              <h2 className="text-lg font-bold mb-2">Result:</h2>
              <p>{result}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
