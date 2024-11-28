// Desestructuración de objetos
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
  songDuration: 336,
  song: "Que mi Fe no Falle",
  details: {
    author: "Evan Craft",
    year: 2020,
  },
};

const song = "New Song";

const { song: anotherSong, songDuration, details } = audioPlayer;
const { author } = details;

// console.log({ song });
// console.log({ songDuration });
// console.log({ author });

// Desestructuración de Arreglos

const [p1, p2, trunks]: string[] = ["Goku", "Vegeta", "Trunk"];

export {};
