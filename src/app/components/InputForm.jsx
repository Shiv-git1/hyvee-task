"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import UserInfoCard from "./UserInfoCard";
import Loader from "./Loader";

const InputForm = () => {
  const [name, setName] = useState("shiv");
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const regex = /[0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\\-=/|]/;

  async function handleApiCalls(e) {
    if (e) e.preventDefault();

    if (regex.test(name)) {
      alert("Please enter a valid name!");
    } else {
      try {
        setIsLoading(true);
        setError(null);

        // Promise.allSettled
        const requests = [
          axios.get(`https://api.agify.io?name=${name}`),
          axios.get(`https://api.genderize.io?name=${name}`),
          axios.get(`https://api.nationalize.io?name=${name}`),
        ];

        // Use Promise.allSettled to handle all promises
        const results = await Promise.allSettled(requests);

        const resolvedResponses = results
          // .filter((result) => result.status === "fulfilled")
          .map((result) => result.value?.data);

        setResponses(resolvedResponses);
      } catch (error) {
        console.error("Error making API requests:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  }

  useEffect((e) => {
    handleApiCalls(e);
  }, []);

  console.log(responses);
  console.log(name);

  return (
    <form className="mt-10" onSubmit={handleApiCalls}>
      <div className="w-full flex justify-center align-middle gap-10 mt-10">
        <input
          name="name"
          type="text"
          id="name"
          value={name || ""}
          onChange={(e) => setName(e.target.value)}
          required
          className="bg-[#18191E] border border-[#33353F]
            placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-6/12 p-2.5"
          placeholder="Type your name..."
        />

        <button
          className="rounded-md px-2 bg-green-500 w-150"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? <Loader /> : "Predict"}
        </button>
      </div>
      {error && <div style={{ color: "red" }}>{error}</div>}

      <div className="flex justify-center">{isLoading && <Loader />}</div>

      <UserInfoCard
        name={name || "Shiv"}
        age={responses[0]?.age || "Some error occured"}
        gender={responses[1]?.gender || "Some error occured"}
        country={
          responses[2]?.country.length > 0
            ? responses[2]?.country
            : "Nothing found!"
        }
        isLoading={isLoading}
        error={error}
      />
    </form>
  );
};

export default InputForm;
