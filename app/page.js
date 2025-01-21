"use client";
import Image from "next/image";
import { Nunito } from "@next/font/google";
import { useState } from "react";

const nunito = Nunito({
  subsets: ["latin"], // Define the character subsets you need
  weight: ["400", "700"], // Specify the weights you want to include
});

export default function Home() {
  const [selectedMood, setSelectedMood] = useState(""); // State to track the selected mood
  const [showMoodHistory, setShowMoodHistory] = useState(true);
  const [moodHistory, setMoodHistory] = useState([]);
  // Function to handle the image click and set the selected mood
  const handleMoodSelect = (mood) => {
    setSelectedMood(mood);
  };
  const handleSaveMood = () => {
    if (selectedMood) {
      // Move the matching mood to the top of the mood history
      const moodImages = {
        sad: "/Angry.png",
        sober: "/Indifferent.png",
        happy: "/Excited.png",
      };

      const updatedMoodHistory = [
        { mood: selectedMood, image: moodImages[selectedMood] },
        ...moodHistory.filter((item) => item.mood !== selectedMood),
      ];
      setMoodHistory(updatedMoodHistory);

      // Reset to initial state
      setSelectedMood("");
    }
  };
  return (
    <div
      className={`bg-white text-black flex justify-around items-center m-auto h-screen  ${nunito.className}`}
    >
      <div className="flex w-[464px] h-[577px] text-center flex-col border text-[#898583] rounded-lg items-center justify-center gap-4">
        <Image src="/cat.svg" width={94} height={79} />
        <h2 className="text-3xl font-bold max-w-[284px]">
          What is your cat&apos;s current mood?
        </h2>
        <div className="flex gap-2 px-4 py-2">
          <div
            className="rounded-full w-[55px] h-[55px] bg-[#EFEEEE] flex items-center justify-center"
            onClick={() => handleMoodSelect("sad")}
          >
            <Image src="/sad.png" width={30} height={30} />
          </div>
          <div
            className="rounded-full w-[55px] h-[55px] bg-[#EFEEEE] flex items-center justify-center"
            onClick={() => handleMoodSelect("sober")}
          >
            <Image src="/sober.png" width={30} height={30} />
          </div>
          <div
            className="rounded-full w-[55px] h-[55px] bg-[#EFEEEE] flex items-center justify-center"
            onClick={() => handleMoodSelect("happy")}
          >
            <Image src="/happy.png" width={30} height={30} />
          </div>
        </div>
        {selectedMood && (
          <p className="text-[#898583] mt-2">
            {selectedMood === "sad" && "Cat wasn't having it!"}
            {selectedMood === "sober" && "Cat was indifferent!"}
            {selectedMood === "happy" && "Cat was super exited!"}
          </p>
        )}
        <button
          className={`flex items-center justify-center text-white w-[136px] h-[41px] mt-8 ${
            selectedMood ? "bg-black" : "bg-[#EFEEEE]"
          }`}
          onClick={handleSaveMood}
        >
          Save mood
        </button>
      </div>

      <div className="flex flex-col justify-start items-center w-[345px] h-[393px] gap-2 text-center">
        <div className="flex gap-2">
          <Image src="/smallCat.svg" width={49} height={41} />
          <h2 className="font-bold text-2xl">Cat mood tracker™</h2>
        </div>
        <h2 className="font-extralight text-[#35100C80]">MOOD HISTORY</h2>
        {moodHistory.length === 0 ? (
          <div className="mt-10 border-0.5 flex flex-col items-center justify-center w-[345px] h-[264px] gap-2">
            <Image src="/catLight.svg" width={72} height={61} />
            <p className="text-[#35100C80] max-w-[120px]">
              No mood history to show yet
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {moodHistory.map((item, index) => (
              <Image
                key={index}
                src={item.image}
                width={479}
                height={87}
                alt={`${item.mood} mood`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
