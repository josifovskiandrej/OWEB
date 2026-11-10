const dest = [{
        id: "paris",
        name: "Paris",
        country: "France",
        category: "City",
        flight: 180,
        perDay: 110,
        description: "The city of light, the Eiffel Tower and endless cafés.",
        images: ["../assets/img/dest/paris.webp"],
        likes: 0,
        dislikes: 0,
        comments: [],
        posts: []
    },
    {
        id: "rome",
        name: "Rome",
        country: "Italy",
        category: "Culture",
        flight: 150,
        perDay: 100,
        description: "Ancient ruins, the Colosseum and great food.",
        images: ["../assets/img/dest/rome.webp"],
        likes: 0,
        dislikes: 0,
        comments: [],
        posts: []
    },
    {
        id: "barcelona",
        name: "Barcelona",
        country: "Spain",
        category: "Beach",
        flight: 170,
        perDay: 95,
        description: "Gaudí, beaches and tapas on the Mediterranean.",
        images: ["../assets/img/dest/barcelona.webp"],
        likes: 0,
        dislikes: 0,
        comments: [],
        posts: []
    },
    {
        id: "dubai",
        name: "Dubai",
        country: "UAE",
        category: "City",
        flight: 400,
        perDay: 130,
        description: "Record-breaking skyscrapers and desert adventures.",
        images: ["../assets/img/dest/dubai.webp"],
        likes: 0,
        dislikes: 0,
        comments: [],
        posts: []
    },
    {
        id: "tokyo",
        name: "Tokyo",
        country: "Japan",
        category: "Culture",
        flight: 900,
        perDay: 120,
        description: "Neon streets, ancient temples and amazing food.",
        images: ["../assets/img/dest/tokyo.webp"],
        likes: 0,
        dislikes: 0,
        comments: [],
        posts: []
    }
];

const sights = {
    paris: ["Eiffel Tower", "Louvre", "Notre-Dame", "Arc de Triomphe", "Montmartre", "Versailles", "Musée d'Orsay", "Seine cruise", "Latin Quarter", "Champs-Élysées"],
    rome: ["Colosseum", "Roman Forum", "Pantheon", "Trevi Fountain", "Spanish Steps", "Vatican Museums", "Sistine Chapel", "Piazza Navona", "Trastevere", "Baths of Caracalla"],
    barcelona: ["Sagrada Família", "Park Güell", "Casa Batlló", "La Rambla", "Gothic Quarter", "Barceloneta Beach", "Montjuïc", "Camp Nou", "La Boqueria", "Casa Milà"],
    dubai: ["Burj Khalifa", "Dubai Mall", "Palm Jumeirah", "Dubai Fountain", "Desert safari", "Old Dubai souks", "Dubai Marina", "Museum of the Future", "Jumeirah Beach", "Dubai Frame"],
    tokyo: ["Senso-ji", "Shibuya Crossing", "Meiji Shrine", "Tokyo Skytree", "Akihabara", "Shinjuku", "Tsukiji Outer Market", "Imperial Palace", "Ueno Park", "teamLab Planets"]
};

const popularDestinations = [{
        name: "Paris",
        country: "France",
        img: "assets/img/dest/paris.webp"
    },
    {
        name: "Rome",
        country: "Italy",
        img: "assets/img/dest/rome.webp"
    },
    {
        name: "Barcelona",
        country: "Spain",
        img: "assets/img/dest/barcelona.webp"
    },
    {
        name: "Dubai",
        country: "UAE",
        img: "assets/img/dest/dubai.webp"
    },
    {
        name: "Tokyo",
        country: "Japan",
        img: "assets/img/dest/tokyo.webp"
    }
];

let destinations = JSON.parse(localStorage.getItem("aeroDestinations"));
if (destinations == null) {
    destinations = dest;
}

function saveDestinations() {
    localStorage.setItem("aeroDestinations", JSON.stringify(destinations));
}

function findDestination(id) {
    for (let i = 0; i < destinations.length; i++) {
        if (destinations[i].id == id) {
            return destinations[i];
        }
    }
    return null;
}