import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import AboutUs from "./components/AboutUs";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Items from "./components/Items";
import Categories from "./components/Categories";
import ShowFullItem from "./components/ShowFullItem";
import Contacts from "./components/Contacts";
import OurLocation from "./components/OurLocation";

function App() {
  const [orders, setOrders] = useState([]);
  const [currentItems, setCurrentItems] = useState([]);
  const [showFullItem, setShowFullItem] = useState(false);
  const [fullItem, setFullItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const [items] = useState([
    {
      id: 1,
      title: 'Volleyball beach ball',
      img: process.env.PUBLIC_URL + '/voleyball.jpg',
      desc: 'Beach volleyball. The ball is designed for beach volleyball.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Volleyballs</p>
      <p>Certificate: Approved by FIVB</p>
      <p>Technologies: Wear resistance, Durability, Waterproof</p>
      <p>Size: №5</p>
      <p>Number of panels: 10 panels</p>
      <p>Pressure: 0.29-0.32 BAR</p>
      <p>Type of panel connection: Machine stitching</p>
      <p>Purpose: For beach / Beach volleyball</p>
      <p>Material: Soft synthetic leather</p>
      <p>Country of origin: Thailand</p>`,
      category: 'balls',
      price: '5915',
    },
    {
      id: 2,
      title: 'Goalkeeper gloves',
      img: process.env.PUBLIC_URL + '/goalkeeper_gloves.jpg',
      desc: 'High-quality goalkeeping gloves with optimal performance',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Goalkeeping gloves</p>
      <p>Inserts: Breathable fabric between the fingers</p>
      <p>Technologies: Shock absorption, Wear resistance, Maximum grip on the ball</p>
      <p>Fixation on the wrist: Velcro cuff 360° fastener</p>
      <p>Age group: Adult</p>
      <p>Purpose: Football goalkeeper equipment</p>
      <p>Material: Latex / Polyester</p>
      <p>Country of origin: Pakistan</p>`,
      category: 'gloves',
      price: '1170',
    },
    {
      id: 3,
      title: 'Boxing gloves',
      img: process.env.PUBLIC_URL + '/boxing_gloves.jpg',
      desc: 'This is a high-quality model for athletes of all levels, boys and girls, and even children. Gloves are with an Ukrainian flag',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Boxing gloves</p>
      <p>Thermoregulation: Ventilation due to mesh fabric on the palm</p>
      <p>TWrist fixation: Wide cuff stabilizes the wrist and reduces risk of injury</p>
      <p>Gender: Female, Male</p>
      <p>Age group: For children</p>
      <p>Fastening method: Velcro</p>
      <p>Filler material: Polyurethane (PU)</p>
      <p>Material: Formed foam filler dampens impacts</p>
      <p>Country of origin: Pakistan</p>`,
      category: 'gloves',
      price: '1692',
    },
    {
      id: 4,
      title: 'Towel for the beach',
      img: process.env.PUBLIC_URL + '/towel_beach.jpg',
      desc: 'It dries quickly, does not accumulate moisture and does not retain bad odors.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Towels sports</p>
      <p>Includes: Towel: 1pc, Cover: 1pc</p>
      <p>Dimensions: 140x70cm</p>
      <p>Dimensions assembled: 28x21cm</p>
      <p>Material: Polyester / Nylon</p>
      <p>Fabric composition: Polyester 89%, Nylon 11%</p>
      <p>Country of origin: China</p>`,
      category: 'towels',
      price: '1055',
    },
    {
      id: 5,
      title: 'Kettlebell competition',
      img: process.env.PUBLIC_URL + '/kettlebell.jpg',
      desc: 'Professional kettlebell from the LiveUp brand is made of steel',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Kettlebells</p>
      <p>Handle diameter: 33mm</p>
      <p>Kettlebell body diameter: 212 mm</p>
      <p>Weight error: 2%</p>
      <p>Height: 283 cm</p>
      <p>Weight: 8 kg</p>
      <p>Coating: Electrostatic powder coating</p>
      <p>Purpose: For crossfit training and fitness</p>
      <p>Material: Cast iron</p>`,
      category: 'kettlebells',
      price: '1412',
    },
    {
      id: 6,
      title: 'Belt for powerlifting',
      img: process.env.PUBLIC_URL + '/belt1.jpg',
      desc: 'The belt is made of high-quality leather, which makes it flexible',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Athletic Belts</p>
      <p>Sports: Powerlifting</p>
      <p>Seams: Reinforced seams</p>
      <p>Fastener: Buckle Carabiner</p>
      <p>Width: 10 cm</p>
      <p>Gender: Female, Male</p>
      <p>Purpose: Reducing the load on the spine</p>
      <p>Purpose: Leather</p>
      <p>Material:</p>
      <p>Country of origin: Pakistan</p>`,
      category: 'belts',
      price: '1457',
    },
    {
      id: 7,
      title: 'Cleats for athletics',
      img: process.env.PUBLIC_URL + '/cleats1.jpg',
      desc: 'The soft upper material makes these spikes as comfortable as possible for long runs.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Athletic spikes</p>
      <p>Inserts: Mesh fabric inserts</p>
      <p>Technologies: Adaptability, Durability, Freedom of movement</p>
      <p>Gender: Female, Male</p>
      <p>Age group: For adults, For children</p>
      <p>Purpose: For training and competition</p>
      <p>Number of spikes: 7 spikes</p>
      <p>Material: Thermopolyurethane (TPU) / Breathable mesh</p>
      <p>Species: For medium and long distances</p>`,
      category: 'sneakers',
      price: '1732',
    },
    {
      id: 8,
      title: 'Handball ball',
      img: process.env.PUBLIC_URL + '/handball1.jpg',
      desc: 'The ball consists of 32 panels. The tire is made of polyurethane.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Handballs</p>
      <p>Technologies: Wear resistance, Durability, Strength</p>
      <p>Size: №3</p>
      <p>Number of panels: 32 panels</p>
      <p>Rubber: chamber</p>
      <p>Circumference: 50-52 cm</p>
      <p>Type of panel connection: Manual seam</p>
      <p>Purpose: For matches and training</p>
      <p>Material: Polyurethane (PU)</p>
      <p>Country of origin: Pakistan</p>`,
      category: 'balls',
      price: '537',
    },
    {
      id: 9,
      title: 'Goalkeeper gloves',
      img: process.env.PUBLIC_URL + '/goalkeeper_gloves2.jpg',
      desc: 'Gloves are made of high-strength and wear-resistant materials',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Goalkeeping gloves</p>
      <p>Inserts: Breathable fabric between the fingers</p>
      <p>Technologies: Shock absorption, Wear resistance, Maximum grip on the ball</p>
      <p>Fixation on the wrist: Velcro cuff 360° fastener</p>
      <p>Age group: For adults, For children</p>
      <p>Purpose: Football goalkeeper equipment</p>
      <p>Material: Polyvinyl chloride (PVC) / Latex</p>
      <p>Country of origin: Pakistan</p>`,
      category: 'gloves',
      price: '632',
    },
    {
      id: 10,
      title: 'Roller sneakers',
      img: process.env.PUBLIC_URL + '/sneakers1.jpg',
      desc: 'The front wheel can be removed with the supplied wrench.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Roller Sneakers</p>
      <p>Wheels Material: Polyurethane (PU), Bearing: ABEC 7</p>
      <p>User weight: 80 kg</p>
      <p>Gender:  Female, Male</p>
      <p>Age group: For children</p>
      <p>Season: Spring, Autumn, Summer</p>
      <p>Number of wheels: 2 pcs</p>
      <p>Materials Upper sneaker: Polyester (PL)</p>
      <p>Wheel Mounts: Plastic</p>
      <p>Country of origin: China</p>`,
      category: 'sneakers',
      price: '1352',
    },
    {
      id: 11,
      title: 'Soft kettlebell',
      img: process.env.PUBLIC_URL + '/kettlebell2.jpg',
      desc: ' The kettlebell is filled with sand, which contributes to an even distribution of weight',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Kettlebells</p>
      <p>Collection: Fitness Spring</p>
      <p>Weight: 2 kg</p>
      <p>Purpose: For fitness and strength training</p>
      <p>Material: Polyvinyl chloride (PVC)</p>
      <p>Materials Kettlebell base: Soft Polyvinyl chloride (PVC)</p>
      <p>Kettlebell handle: Hard Polyvinyl chloride (PVC)</p>
      <p>Filler: Sand</p>
      <p>Country of origin: China</p>`,
      category: 'kettlebells',
      price: '675',
    },
    {
      id: 12,
      title: 'Sport towel',
      img: process.env.PUBLIC_URL + '/sport_towel.jpg',
      desc: 'The fabric absorbs moisture well and it is very soft.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Towels sports</p>
      <p>Includes: Towel: 1pc, Cover: 1pc</p>
      <p>Dimensions: 80x40cm</p>
      <p>Material: Microfiber</p>
      <p>Fabric composition: Polyester 85%, Nylon 15%</p>
      <p>Country of origin: China</p>`,
      category: 'towels',
      price: '142',
    },
    {
      id: 13,
      title: 'Belt for weight loss',
      img: process.env.PUBLIC_URL + '/slimming_belt.jpg',
      desc: 'This slimming belt is made of high quality neoprene.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Slimming belts</p>
      <p>Size: Adjustable</p>
      <p>Dimensions: 95cmx20cmx3mm</p>
      <p>Gender: Female, Male</p>
      <p>Purpose: For slimming, With sauna effect, Tightening and supporting effect</p>
      <p>Material: Neoprene</p>
      <p>Country of origin: China</p>`,
      category: 'belts',
      price: '415',
    },
    {
      id: 14,
      title: 'Soccer ball',
      img: process.env.PUBLIC_URL + '/football1.jpg',
      desc: 'The ball has a perfect spherical shape and excellent playing characteristics.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Soccer balls</p>
      <p>Size: №5</p>
      <p>Number of panels: 32 panels</p>
      <p>Pressure: 0.7-0.9 BAR</p>
      <p>Circumference: 68.5-69.5 cm</p>
      <p>Weight: 410-450 g</p>
      <p>Type of panel connection: Machine stitching / Heat gluing</p>
      <p>Material: Polyurethane (PU)</p>
      <p>Country of origin: China</p>`,
      category: 'balls',
      price: '4489',
    },
    {
      id: 15,
      title: 'Sneakers high',
      img: process.env.PUBLIC_URL + '/sneakers2.jpg',
      desc: 'High-quality upper materials provide the sneakers with durability and resistance to wear.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Sneakers</p>
      <p>Intensity of use: Daily use</p>
      <p>Technologies: Durability, Wear resistance, Durability</p>
      <p>Gender: Female, Male</p>
      <p>Age group: For adults, For children</p>
      <p>Sneaker type: High top sneakers</p>
      <p>Purpose: For everyday wear, walking and outdoor activities</p>
      <p>Material: Polyurethane/Polyester</p>
      <p>Country of origin: China</p>`,
      category: 'sneakers',
      price: '702',
    },
    {
      id: 16,
      title: 'Belt for kimono',
      img: process.env.PUBLIC_URL + '/kimono_belt1.jpg',
      desc: 'The kimono belt is made of cotton and has several rows of longitudinal seams.',
      full_desc: `
      <h3>Features</h3>
      <p>Type: Kimono belts</p>
      <p>Sport: Jiu-Jitsu, Judo, Karate, Sambo, Taekwondo</p>
      <p>Length: 260 cm, 280 cm, 300 cm, 240 cm, 230 cm, 250 cm, 270 cm, 290 cm</p>
      <p>Gender: Female, Male</p>
      <p>Age group: For adults, For children</p>
      <p>Purpose: For training and competitions</p>
      <p>Material: Cotton / Polyester</p>
      <p>Country of origin: Pakistan</p>`,
      category: 'belts',
      price: '120',
    },
  ]);

  const onShowItem = (item) => {
  if (fullItem && fullItem.id === item.id) {
    setShowFullItem(false);
    setFullItem(null);
  } else {
    setFullItem(item);
    setShowFullItem(true);
  }
};

  const chooseCategory = (category) => {
    setCurrentPage(1);
    if (category === 'all') {
      setCurrentItems(items);
      return;
    }
    setCurrentItems(items.filter(el => el.category === category));
  };

  const deleteOrder = (id) => {
    setOrders(prevOrders => prevOrders.filter(item => item.id !== id));
  };

  const addToOrder = (item) => {
    setOrders(prevOrders => {
      const existingItemIndex = prevOrders.findIndex(el => el.id === item.id);
      if (existingItemIndex >= 0) {
        const updatedOrders = [...prevOrders];
        updatedOrders[existingItemIndex] = {
          ...updatedOrders[existingItemIndex],
          quantity: (updatedOrders[existingItemIndex].quantity || 1) + 1
        };
        return updatedOrders;
      }
      return [...prevOrders, { ...item, quantity: 1 }];
    });
  };

  useEffect(() => {
    setCurrentItems(items);
  }, [items]);

  const totalPages = Math.ceil(currentItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleItems = currentItems.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (pageNum) => {
    if (pageNum >= 1 && pageNum <= totalPages) setCurrentPage(pageNum);
  };

  return (
  <Router>
    <div className="wrapper">
      <Header orders={orders} onDelete={deleteOrder} />
      
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Categories chooseCategory={chooseCategory} />
              <Items onShowItem={onShowItem} items={visibleItems} onAdd={addToOrder} />
              <div className="pagination">
                <button className="pagination_button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
                  ← Prev
                </button>
                <span className="pagination_page_of">
                  Page {currentPage} of {totalPages}
                </span>
                <button className="pagination_button" onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
                  Next →
                </button>
              </div>
              {showFullItem && fullItem && (
                <ShowFullItem 
                  item={fullItem} 
                  onAdd={addToOrder} 
                  onShowItem={onShowItem} 
                />
              )}
            </>
          }
        />
        
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/our_location" element={<OurLocation />} />
      </Routes>

      <Footer />
    </div>
  </Router>
);
}

export default App;