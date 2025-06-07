interface AudioPlayer {
  audioVolume: number;
  songDuration: number;
  song: string;
  details: Details;
}

interface Details {
  author: string;
  year: number;
}

const audioPlayer: AudioPlayer = {
  audioVolume: 90,
  songDuration: 36,
  song: "Mess",
  details: {
    author: "Ed Sheeran",
    year: 2015,
  },
};

// Destructuring the audioPlayer object
const { song, songDuration, details } = audioPlayer;
const { author, year } = details;

//console.log('Author: ', author); // Output: Ed Sheeran
//console.log('Song: ',song); // Output: Mess
//console.log('Song Duration: ',songDuration); // Output: 36

// Destructuring the Personajes array
const [, , Trunks = "Not Fount"] = ["Vegeta", "Piccolo", "Trunks"];
//console.log('Personaje 3: ', Trunks); // Output: Trunks

export {};
