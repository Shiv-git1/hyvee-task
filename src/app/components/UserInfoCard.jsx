import Image from "next/image";
import React from "react";
import Loader from "./Loader";

const UserInfoCard = ({ name, age, gender, country, isLoading }) => {
  return (
    <div className="flex justify-center">
      <div className="flex justify-around align-middle shadow-lg p-5 w-7/12 bg-[#18191E] rounded-md  mt-10">
        <div>
          {isLoading ? (
            <Loader />
          ) : (
            <Image
              src={
                gender === "male"
                  ? "/images/male-sign.jpg"
                  : gender === "female"
                  ? "/images/female-sign.jpg"
                  : "/images/question-mark.jpg"
              }
              height={120}
              width={200}
              alt="logo"
              className="rounded-md"
            />
          )}
        </div>

        <div className="text-white ml-2 font-bold">
          <h1>{name}</h1>
          {isLoading ? (
            <Loader />
          ) : (
            <h1 className="text-gray-400">{age ? age : 22}</h1>
          )}
          {isLoading ? (
            <Loader />
          ) : (
            <h1 className="text-gray-400">{gender ? gender : "female"}</h1>
          )}

          {Array.isArray(country) ? (
            <>
              <h1>Nationality: {country[0]?.country_id}</h1>

              <div className="mt-5 w-full">
                <div>
                  <p
                    style={{ width: "80%" }}
                    data-value={country[0]?.probability}
                  >
                    {country[0]?.country_id}:
                  </p>
                  <progress
                    max="1"
                    value={country[0]?.probability}
                    class="html5"
                  >
                    <div class="progress-bar">
                      <span style={{ width: "80%" }}>
                        {country[0]?.probability}
                      </span>
                    </div>
                  </progress>
                </div>
              </div>
            </>
          ) : (
            country
          )}
        </div>

        {isLoading ? (
          <Loader />
        ) : (
          <div className="text-white ml-5">
            <h1 className="font-bold">Other possibilities:</h1>
            <div className="w-full mt-2">
              {Array.isArray(country)
                ? country.slice(1).map((item, index) => (
                    <div>
                      <p
                        style={{ width: "80%" }}
                        data-value={item?.probability}
                      >
                        {item?.country_id}
                      </p>
                      <progress max="1" value={item?.probability} class="html5">
                        <div class="progress-bar">
                          <span style={{ width: "80%" }}>
                            {item?.probability}
                          </span>
                        </div>
                      </progress>
                    </div>
                  ))
                : "Nothing to show!"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserInfoCard;
