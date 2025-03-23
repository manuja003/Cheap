import safari from '../images/wild006.jpg';
import wild02 from '../images/wild00.jpg';
import wild03 from '../images/wild03.jpg';
import wild04 from '../images/wild01.jpg';
import wild05 from '../images/yala.jpg';
import wild06 from '../images/wild004.jpg';
import wild07 from '../images/wild.jpg';

import beach from '../images/form.jpg';
import beach01 from '../images/beach01.jpg';
import beach02 from '../images/beach02.jpg';
import beach03 from '../images/beach003.jpg';
import beach04 from '../images/beach04.webp';
import beach05 from '../images/beach05.jpg';
import beach06 from '../images/beach06.jpg'

import temp from '../images/tem00.jpg';
import temp01 from '../images/tem01.jpg';
import temp02 from '../images/tem02.jpg';
import temp03 from '../images/tem03.jpg';
import temp04 from '../images/tem04.jpg';
import temp05 from '../images/tem05.jpg';
import temp06 from '../images/tem06.jpg';

import hike from '../images/hike.jpg';
import hike01 from '../images/hike01.jpg';
import hike02 from '../images/hike02.webp';
import hike03 from '../images/hike03.jpg';
import hike04 from '../images/hike04.jpg';
import hike05 from '../images/hike05.jpg';
import hike06 from '../images/hike06.jpg';

import dive from '../images/div.jpg';
import dive01 from '../images/div01.webp';
import dive02 from '../images/div02.jpg';
import dive03 from '../images/div03.jpg';
import dive04 from '../images/div04.jpg';
import dive05 from '../images/div05.jpg';
import dive06 from '../images/div06.jpg';

import cook from '../images/cook.jpeg';
import cook01 from '../images/cook01.jpg';
import cook02 from '../images/cook02.jpg';
import cook03 from '../images/cook03.jpg';
import cook04 from '../images/cook04.jpg';
import cook05 from '../images/cook05.jpg';
import cook06 from '../images/cook06.jpg';

import train from '../images/train.jpg';
import train01 from '../images/train01.jpg';
import train02 from '../images/train02.webp';
import train03 from '../images/train03.jpg';
import train04 from '../images/train04.jpg';
import train05 from '../images/train05.jpg';
import train06 from '../images/train06.jpg';

import Ayrweda from '../images/ayu.webp';
import Ayrweda01 from '../images/ayu01.webp';
import Ayrweda02 from '../images/ayu02.jpg';
import Ayrweda03 from '../images/ayu03.webp';
import Ayrweda04 from '../images/ayu04.avif';
import Ayrweda05 from '../images/ayu05.png';
import Ayrweda06 from '../images/ayu06.jpg';

//import wild06 from '../images/wild006.jpg';

export interface ActivityProps {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  location: string;
}

export interface ActivityDetailsProps extends ActivityProps {
  longDescription: string;
  locations: {
    name: string;
    description: string;
  }[];
  gallery: {
    url: string;
    alt: string;
  }[];
  companies: {
    name: string;
    description: string;
    website?: string;
  }[];
}

export const activitiesData: ActivityDetailsProps[] = [
  {
    id: 'safari',
    title: 'Wildlife Safaris',
    description: 'Experience thrilling wildlife encounters at Yala National Park, home to the highest leopard density in the world, alongside elephants, bears, and exotic birds.',
    image: safari,
    category: 'Adventure',
    location: 'Yala National Park',
    longDescription: "Sri Lanka offers some of the most thrilling wildlife safari experiences in Asia. The island's diverse landscapes support a remarkable variety of wildlife, making it a premier destination for nature enthusiasts. From dense forests to vast plains, visitors can witness magnificent creatures in their natural habitat, including the elusive Sri Lankan leopard, majestic elephants, and hundreds of bird species. National parks are well-maintained with professional guides who ensure safe and educational experiences, making wildlife safaris one of the most sought-after activities in Sri Lanka.",
    locations: [
      {
        name: 'Yala National Park',
        description: 'Home to the highest leopard density in the world, Yala offers the best chance to spot these elusive big cats, along with elephants, sloth bears, and crocodiles.'
      },
      {
        name: 'Udawalawe National Park',
        description: 'Known for its large elephant herds, Udawalawe provides almost guaranteed elephant sightings in their natural habitat.'
      },
      {
        name: 'Wilpattu National Park',
        description: 'Sri Lanka\'s largest national park features unique "willus" (natural lakes) and is known for leopards, sloth bears, and diverse birdlife.'
      },
      {
        name: 'Minneriya National Park',
        description: 'Famous for "The Gathering," where hundreds of elephants congregate around the reservoir during the dry season (June to September).'
      }
    ],
    gallery: [
      {
        url: wild02,
        alt: 'Leopard resting on a tree branch in Yala National Park'
      },
      {
        url: wild03,
        alt: 'Elephant herd crossing grasslands at sunset'
      },
      {
        url: wild04,
        alt: 'Colorful birds in Sri Lankan national park'
      },
      {
        url: wild06,
        alt: 'Safari jeep approaching wildlife in natural habitat'
      },
      {
        url: wild05,
        alt: 'Crocodile sunbathing near water in Yala National Park'
      },
      {
        url: wild07,
        alt: 'Crocodile sunbathing near water in Yala National Park'
      }
    ],
    companies: [
      {
        name: 'Ceylon Wild Tours',
        description: 'Specialized in customized wildlife safari experiences with expert naturalist guides and comfortable safari vehicles.',
        website: 'https://www.ceylonwildtours.com'
      },
      {
        name: 'Leopard Trails',
        description: 'Luxury tented safari camps providing guided game drives and walking safaris with an emphasis on conservation.',
        website: 'https://www.leopardtrails.com'
      },
      {
        name: 'Eco Team Sri Lanka',
        description: 'Eco-friendly wildlife safaris focused on sustainable tourism practices and community engagement.',
        website: 'https://www.ecoteamsrilanka.com'
      }
    ]
  },
  {
    id: 'beaches',
    title: 'Beach Exploration',
    description: 'Relax on pristine golden beaches along the southern and eastern coasts, with opportunities for surfing, snorkeling and whale watching.',
    image: beach,
    category: 'Relaxation',
    location: 'Mirissa & Unawatuna',
    longDescription: "Sri Lanka is blessed with over 1,600 kilometers of palm-fringed coastline, offering some of the most picturesque beaches in the world. From secluded bays to vibrant beach towns, the island's beaches cater to every type of traveler. The clear blue waters provide perfect conditions for swimming, while more adventurous visitors can enjoy world-class surfing, snorkeling, and diving. Many beaches also offer opportunities for whale and dolphin watching, making beach exploration in Sri Lanka a multi-faceted experience that combines relaxation with adventure.",
    locations: [
      {
        name: 'Mirissa',
        description: 'A crescent-shaped beach known for whale watching, surfing, and a laid-back atmosphere with beachfront restaurants and bars.'
      },
      {
        name: 'Unawatuna',
        description: 'A picturesque bay with calm waters ideal for swimming and snorkeling, lined with restaurants and boutique hotels.'
      },
      {
        name: 'Arugam Bay',
        description: 'Sri Lanka\'s surfing capital on the east coast, featuring world-class breaks and a bohemian vibe.'
      },
      {
        name: 'Bentota',
        description: 'A long stretch of golden sand perfect for water sports and luxury beach resorts with river and sea access.'
      }
    ],
    gallery: [
      {
        url: beach01,
        alt: 'Golden sunset over Mirissa Beach with palm trees silhouettes'
      },
      {
        url: beach02,
        alt: 'Surfer riding waves at Arugam Bay'
      },
      {
        url: beach03,
        alt: 'Aerial view of pristine beaches in southern Sri Lanka'
      },
      {
        url: beach04,
        alt: 'Beach chairs and umbrellas on Unawatuna Beach'
      },
      {
        url: beach05,
        alt: 'Whale tail off the coast of Mirissa during whale watching tour'
      },
      {
        url: beach06,
        alt: 'Whale tail off the coast of Mirissa during whale watching tour'
      }
    ],
    companies: [
      {
        name: 'Sail Lanka Charter',
        description: 'Luxury catamaran tours for whale watching, sunset cruises, and island hopping along the south coast.',
        website: 'https://www.sail-lanka-charter.com'
      },
      {
        name: 'Poseidon Diving Station',
        description: 'PADI-certified diving center offering snorkeling, diving courses, and marine excursions in Unawatuna.',
        website: 'https://www.divingsrilanka.com'
      },
      {
        name: 'Weligama Bay Surf',
        description: 'Surfing lessons and board rentals for beginners and advanced surfers with local instructors.',
        website: 'https://www.weligamabaysurf.com'
      }
    ]
  },
  {
    id: 'temples',
    title: 'Ancient Temples',
    description: 'Discover Sri Lanka\'s rich cultural heritage by visiting ancient Buddhist temples and sacred sites that date back thousands of years.',
    image: temp01,
    category: 'Cultural',
    location: 'Anuradhapura & Polonnaruwa',
    longDescription: "Sri Lanka's ancient temples represent over 2,000 years of Buddhist heritage and architectural innovation. These sacred sites are not only places of worship but also masterpieces of ancient engineering and artistry. From massive stupas to intricately carved stone sculptures, these temples embody the island's spiritual devotion and cultural sophistication. Many temples continue to be active places of worship, allowing visitors to witness traditional ceremonies and gain insights into the living Buddhist traditions that form an integral part of Sri Lankan identity.",
    locations: [
      {
        name: 'Anuradhapura',
        description: 'The ancient capital featuring the sacred Sri Maha Bodhi tree (over 2,200 years old) and massive dagobas (stupas) like Ruwanwelisaya.'
      },
      {
        name: 'Polonnaruwa',
        description: 'Medieval capital with well-preserved ruins including the magnificent Gal Vihara Buddha statues carved from solid granite.'
      },
      {
        name: 'Dambulla Cave Temple',
        description: 'A UNESCO World Heritage site with five caves housing 153 Buddha statues and stunning ceiling paintings dating back to the 1st century BCE.'
      },
      {
        name: 'Temple of the Sacred Tooth Relic (Kandy)',
        description: 'The most venerated Buddhist temple in Sri Lanka, housing a tooth relic of Buddha within a golden casket.'
      }
    ],
    gallery: [
      {
        url: temp,
        alt: 'Golden Buddha statues in Dambulla Cave Temple'
      },
      {
        url: temp02,
        alt: 'Ancient stupa in Anuradhapura sacred city'
      },
      {
        url: temp03,
        alt: 'Reclining Buddha statue at Gal Vihara, Polonnaruwa'
      },
      {
        url: temp04,
        alt: 'Temple of the Sacred Tooth Relic in Kandy'
      },
      {
        url: temp05,
        alt: 'Intricate wall paintings in ancient Buddhist temple'
      },
      {
        url: temp06,
        alt: 'Intricate wall paintings in ancient Buddhist temple'
      }
    ],
    companies: [
      {
        name: 'Cultural Triangle Tours',
        description: 'Specialized guided tours of ancient cities with knowledgeable archaeologists and cultural experts.',
        website: 'https://www.culturaltriangletours.lk'
      },
      {
        name: 'Lakpura Cultural Tours',
        description: 'In-depth cultural experiences including temple ceremonies, meditation sessions, and historical insights.',
        website: 'https://www.lakpura.com/cultural-tours'
      },
      {
        name: 'Ceylon Heritage Travels',
        description: 'Customized pilgrimages and cultural tours focusing on Buddhist heritage sites with local guides.',
        website: 'https://www.ceylonheritage.com'
      }
    ]
  },
  {
    id: 'hiking',
    title: 'Scenic Hiking',
    description: 'Trek through lush mountains, tea plantations, and breathtaking landscapes, including the iconic climb to Adam\'s Peak or exploring Horton Plains.',
    image: hike,
    category: 'Adventure',
    location: 'Ella & Nuwara Eliya',
    longDescription: "Sri Lanka's diverse terrain offers exceptional hiking opportunities, from gentle walks through tea plantations to challenging mountain ascents. The central highlands, with their misty mountains and cool climate, provide some of the most scenic trails in Asia. Hikers can discover hidden waterfalls, encounter rare wildlife, and enjoy spectacular panoramic views. Many trails also pass through traditional villages, offering glimpses into rural Sri Lankan life. With varying difficulty levels, the island's hiking routes cater to everyone from casual walkers to serious trekkers.",
    locations: [
      {
        name: 'Ella Rock',
        description: 'A moderately challenging hike offering breathtaking views of Ella Gap, tea plantations, and surrounding mountains.'
      },
      {
        name: 'Horton Plains & World\'s End',
        description: 'A high-altitude plateau featuring a circular hiking trail to the dramatic World\'s End cliff with an 880-meter drop.'
      },
      {
        name: 'Adam\'s Peak (Sri Pada)',
        description: 'A sacred mountain pilgrimage with 5,500 steps, typically climbed at night to witness the magical sunrise and triangular shadow.'
      },
      {
        name: 'Knuckles Mountain Range',
        description: 'A biodiversity hotspot with diverse ecosystems, offering multi-day treks through cloud forests, grasslands, and traditional villages.'
      }
    ],
    gallery: [
      {
        url: hike01,
        alt: 'Sunrise view from Ella Rock overlooking mountains and valleys'
      },
      {
        url: hike02,
        alt: 'Hiking trail through tea plantations in Nuwara Eliya'
      },
      {
        url: hike03,
        alt: 'Dramatic view of World\'s End cliff in Horton Plains'
      },
      {
        url: hike04,
        alt: 'Pilgrims climbing steps to Adam\'s Peak before sunrise'
      },
      {
        url: hike05,
        alt: 'Lush green trails in Knuckles Mountain Range'
      },
      {
        url: hike06,
        alt: 'Lush green trails in Knuckles Mountain Range'
      }
    ],
    companies: [
      {
        name: 'Eco Team Expeditions',
        description: 'Guided hiking expeditions with eco-friendly practices and expert naturalists focusing on wildlife and ecology.',
        website: 'https://www.ecoteamexpeditions.com'
      },
      {
        name: 'Walk With Chamara',
        description: 'Personalized hiking experiences with local guides offering cultural insights and hidden trail knowledge.',
        website: 'https://www.walkwithchamara.com'
      },
      {
        name: 'Kithu Expeditions',
        description: 'Specialized trekking company for challenging routes and multi-day hikes with camping equipment provided.',
        website: 'https://www.kithuexpeditions.com'
      }
    ]
  },
  {
    id: 'diving',
    title: 'Diving & Snorkeling',
    description: 'Explore vibrant coral reefs, shipwrecks, and underwater caves along Sri Lanka\'s coast, offering world-class diving experiences.',
    image:dive,
    category: 'Water Sports',
    location: 'Trincomalee & Batticaloa',
    longDescription: "Sri Lanka's surrounding waters are a paradise for underwater adventurers, with diverse marine ecosystems and excellent visibility throughout much of the year. From vibrant coral gardens teeming with colorful fish to fascinating shipwrecks preserving centuries of maritime history, the diving and snorkeling experiences are world-class. The island's eastern and southern coasts offer particularly rich underwater environments, with opportunities to encounter majestic sea turtles, reef sharks, and even whale sharks in certain seasons. For beginners, many PADI-certified diving centers provide introductory courses in calm, shallow waters.",
    locations: [
      {
        name: 'Trincomalee',
        description: 'East coast diving haven with pristine Pigeon Island featuring shallow coral gardens ideal for snorkelers and deeper sites for experienced divers.'
      },
      {
        name: 'Batticaloa',
        description: 'Uncrowded dive sites with healthy coral systems and abundant marine life including reef sharks and eagle rays.'
      },
      {
        name: 'Hikkaduwa',
        description: 'Popular west coast diving spot with easy access to coral sanctuaries, shipwrecks, and seasonal turtle nesting sites.'
      },
      {
        name: 'Great Basses Reef',
        description: 'Advanced diving location in the deep south with historic shipwrecks including the 17th-century Great Basses wreck with silver coins.'
      }
    ],
    gallery: [
      {
        url: dive01,
        alt: 'Diver exploring colorful coral reef in Pigeon Island'
      },
      {
        url: dive02,
        alt: 'School of tropical fish swimming near coral formations'
      },
      {
        url: dive03,
        alt: 'Snorkeler swimming with sea turtle in shallow waters'
      },
      {
        url: dive04,
        alt: 'Diver exploring historic shipwreck with coral growth'
      },
      {
        url: dive05,
        alt: 'Underwater view of colorful tropical fish at Hikkaduwa coral sanctuary'
      },
      {
        url: dive06,
        alt: 'Underwater view of colorful tropical fish at Hikkaduwa coral sanctuary'
      }
    ],
    companies: [
      {
        name: 'Poseidon Diving Station',
        description: 'PADI 5-Star dive center offering courses from beginner to instructor level and daily diving trips to top sites.',
        website: 'https://www.poseidondivingsrilanka.com'
      },
      {
        name: 'Sail Lanka Divers',
        description: 'Combines diving experiences with sailing adventures, specializing in remote and pristine dive locations.',
        website: 'https://www.sairlankadiving.com'
      },
      {
        name: 'Blue Deep Diving',
        description: 'Boutique diving operation with small groups, experienced guides, and focus on marine conservation awareness.',
        website: 'https://www.bluedeepdiving.com'
      }
    ]
  },
  {
    id: 'cooking',
    title: 'Cooking Classes',
    description: 'Learn to prepare authentic Sri Lankan cuisine, known for its complex flavors, spices, and unique cooking techniques from local experts.',
    image: cook,
    category: 'Culinary',
    location: 'Galle & Colombo',
    longDescription: "Sri Lankan cooking classes offer an immersive cultural experience that engages all the senses. Participants learn to blend the complex spices that form the foundation of Sri Lankan cuisine, master traditional cooking techniques, and understand the cultural significance of different dishes. Classes typically begin with visits to local markets where instructors explain indigenous ingredients, followed by hands-on preparation and, of course, enjoying the delicious results. These experiences provide not only culinary skills but also insights into Sri Lankan family life and cultural traditions centered around food.",
    locations: [
      {
        name: 'Galle',
        description: 'Historic fort city where cooking classes often incorporate Dutch Burgher influences alongside traditional Sri Lankan cuisine.'
      },
      {
        name: 'Colombo',
        description: 'Capital city offering diverse cooking experiences from street food workshops to high-end culinary academies.'
      },
      {
        name: 'Kandy',
        description: 'Classes focusing on traditional up-country cooking methods and special ceremonial dishes from the ancient kingdom.'
      },
      {
        name: 'Negombo',
        description: 'Coastal town specializing in seafood preparation techniques and fusion Sinhalese-Portuguese dishes.'
      }
    ],
    gallery: [
      {
        url: cook01,
        alt: 'Colorful Sri Lankan spices in traditional clay pots'
      },
      {
        url: cook02,
        alt: 'Chef teaching students how to make hoppers (rice flour pancakes)'
      },
      {
        url: cook03,
        alt: 'Hands grinding spices on traditional stone grinder'
      },
      {
        url: cook04,
        alt: 'Traditional Sri Lankan clay pot cooking demonstration'
      },
      {
        url: cook05,
        alt: 'Colorful spread of completed Sri Lankan curry dishes'
      },
      {
        url: cook06,
        alt: 'Colorful spread of completed Sri Lankan curry dishes'
      }
    ],
    companies: [
      {
        name: 'Spice Chili Cooking Class',
        description: 'Family-run cooking school in Galle offering market visits and preparation of traditional southern Sri Lankan dishes.',
        website: 'https://www.spicechilicooking.com'
      },
      {
        name: 'Colombo Cooking Class',
        description: 'Urban cooking experience teaching contemporary Sri Lankan fusion alongside classic recipes in the capital city.',
        website: 'https://www.colombocookingclass.com'
      },
      {
        name: 'Ella Spice Garden',
        description: 'Organic garden-to-table cooking experiences focusing on vegetarian Sri Lankan cuisine using freshly harvested ingredients.',
        website: 'https://www.ellaspicegarden.com'
      }
    ]
  },
  {
    id: 'trains',
    title: 'Scenic Train Journeys',
    description: 'Take one of the world\'s most beautiful train rides through misty mountains, tea plantations and tunnels carved through rocky hillsides.',
    image: train,
    category: 'Transportation',
    location: 'Kandy to Ella',
    longDescription: "Sri Lanka's railway journeys are often ranked among the most scenic in the world, particularly the routes that wind through the central highlands. As the trains move at a leisurely pace through misty mountains, lush tea plantations, and quaint villages, passengers are treated to ever-changing panoramas of exceptional beauty. These journeys provide not just transportation but a memorable experience, with opportunities to interact with locals and witness daily life unfolding along the tracks. The colonial-era railway infrastructure, including impressive viaducts and tunnels, adds historical interest to the visual splendor.",
    locations: [
      {
        name: 'Kandy to Ella',
        description: 'The most famous route passing through Nuwara Eliya with breathtaking views of tea plantations, waterfalls, and the Nine Arch Bridge.'
      },
      {
        name: 'Colombo to Kandy',
        description: 'Journey from coastal plains to central highlands, passing through lush rice paddies and into the misty mountains.'
      },
      {
        name: 'Colombo to Galle',
        description: 'Coastal route with stunning ocean views, passing through fishing villages and palm-fringed beaches.'
      },
      {
        name: 'Ella to Badulla',
        description: 'The final stretch of the highland railway featuring the spectacular Demodara Nine Arch Bridge and loop.'
      }
    ],
    gallery: [
      {
        url: train01,
        alt: 'Train crossing the famous Nine Arch Bridge in Ella'
      },
      {
        url: train02,
        alt: 'Blue train winding through lush green tea plantations'
      },
      {
        url: train03,
        alt: 'Passengers enjoying views from open train doorway in hill country'
      },
      {
        url: train04,
        alt: 'Misty mountain views from train window at sunrise'
      },
      {
        url: train05,
        alt: 'Colonial-era train station in Nuwara Eliya with flowers and architecture'
      },
      {
        url: train06,
        alt: 'Colonial-era train station in Nuwara Eliya with flowers and architecture'
      }
    ],
    companies: [
      {
        name: 'Sri Lanka Railways',
        description: 'Government railway service operating all train routes with first, second, and third-class options.',
        website: 'https://www.railway.gov.lk'
      },
      {
        name: 'Expo Rail',
        description: 'Premium private carriage attached to regular trains, offering enhanced comfort, meals, and viewing areas.',
        website: 'https://www.exporail.lk'
      },
      {
        name: 'Train Travel Sri Lanka',
        description: 'Specialized agency for booking train tickets in advance, including reserved seats and private tour packages.',
        website: 'https://www.traintravelsrilanka.com'
      }
    ]
  },
  {
    id: 'ayurveda',
    title: 'Ayurvedic Retreats',
    description: 'Indulge in traditional Ayurvedic treatments, massages, and wellness therapies at specialized retreats across the island.',
    image: Ayrweda,
    category: 'Wellness',
    location: 'South Coast',
    longDescription: "Sri Lanka is a global center for authentic Ayurvedic healing, with a tradition stretching back over 3,000 years. This ancient holistic healing system focuses on achieving balance between mind, body, and spirit through personalized treatments, herbal remedies, dietary adjustments, and wellness practices. The island's Ayurvedic retreats range from luxury wellness resorts to traditional centers where treatments are administered by practitioners from families with generations of expertise. Many retreats are set in serene natural environments, enhancing the healing process with the therapeutic benefits of Sri Lanka's natural beauty.",
    locations: [
      {
        name: 'South Coast',
        description: 'Concentration of Ayurvedic resorts and retreats around Bentota, Beruwala, and Hikkaduwa offering beachside wellness experiences.'
      },
      {
        name: 'Hill Country',
        description: 'Mountain retreats around Kandy and Nuwara Eliya focusing on forest herbs and cool climate treatments for rejuvenation.'
      },
      {
        name: 'North Central Province',
        description: 'Traditional Ayurvedic centers near ancient cities where historic healing practices are preserved in their authentic form.'
      },
      {
        name: 'East Coast',
        description: 'Emerging wellness destinations around Trincomalee and Passikudah combining Ayurveda with pristine beach environments.'
      }
    ],
    gallery: [
      {
        url: Ayrweda01,
        alt: 'Ayurvedic oil treatment being applied in traditional wooden therapy room'
      },
      {
        url: Ayrweda02,
        alt: 'Herbal preparations and indigenous medicinal plants used in treatments'
      },
      {
        url: Ayrweda03,
        alt: 'Serene yoga pavilion in tropical garden at Ayurvedic retreat'
      },
      {
        url: Ayrweda04,
        alt: 'Traditional steam treatment using local herbs and aromatic plants'
      },
      {
        url: Ayrweda05,
        alt: 'Meditation session at beachfront Ayurvedic wellness center'
      },
      {
        url: Ayrweda06,
        alt: 'Meditation session at beachfront Ayurvedic wellness center'
      }
    ],
    companies: [
      {
        name: 'Barberyn Ayurveda Resorts',
        description: 'Pioneer in authentic Ayurvedic resort experiences with on-site physicians and personalized treatment plans.',
        website: 'https://www.barberynresorts.com'
      },
      {
        name: 'Santani Wellness',
        description: 'Luxury minimalist retreat blending Ayurveda with modern wellness practices in a sustainable mountain setting.',
        website: 'https://www.santani.lk'
      },
      {
        name: 'Siddhalepa Ayurveda Resort',
        description: 'Traditional Ayurvedic center operated by one of Sri Lanka\'s oldest herbal medicine manufacturers.',
        website: 'https://www.siddhaleparesort.com'
      }
    ]
  }
];
