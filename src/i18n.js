// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      home: 'Home',
      about: 'About us',
      contacts: 'Contacts',
      location: 'Our Location',
      cart_empty: 'Cart is empty',
      total: 'Total',
      buy: 'Buy',
      prev: '← Prev',
      next: 'Next →',
      page: 'Page',
      of: 'of',
      all: 'All',
      balls: 'Balls',
      gloves: 'Gloves',
      towels: 'Towels',
      kettlebells: 'Kettlebells',
      belts: 'Belts',
      sneakers: 'Sneakers',
      presentation_title: 'The best sports goods',
      presentation_desc: 'At fair prices',
      footer: 'All rights reserved',
      aboutUsTitle: 'About Us',
      aboutUsDesc: 'We do not only sell sporting goods, but also repair chainsaws and chainsaws, wristwatches, sharpen knives and chains, and make duplicate keys.',
      viber: 'Our Viber',
      contactsTitle: 'Contact Information',
      contactsDesc: 'Write to us to find out more',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phoneNumber: 'Phone Number',
      message: 'Message',
      sendMessage: 'Send Message',
      writeMessage: 'Write your message..',
      ourLocationTitle: 'Our Location',
      ourLocationDesc: 'Our store is located in the city of Zhashkiv opposite the Zhashkiv Lyceum No. 1. A large golden key serves as a landmark.',
      ourLocationButton: 'See on the map',
      products: {
        1: {
          title: 'Volleyball beach ball',
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
          <p>Country of origin: Thailand</p>`
        },
        2: {
          title: 'Goalkeeper gloves',
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
          <p>Country of origin: Pakistan</p>`
        },
        3: {
          title: 'Boxing gloves',
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
          <p>Country of origin: Pakistan</p>`
        },
        4: {
          title: 'Towel for the beach',
          desc: 'It dries quickly, does not accumulate moisture and does not retain bad odors.',
          full_desc: `
          <h3>Features</h3>
          <p>Type: Towels sports</p>
          <p>Includes: Towel: 1pc, Cover: 1pc</p>
          <p>Dimensions: 140x70cm</p>
          <p>Dimensions assembled: 28x21cm</p>
          <p>Material: Polyester / Nylon</p>
          <p>Fabric composition: Polyester 89%, Nylon 11%</p>
          <p>Country of origin: China</p>`
        },
        5: {
          title: 'Kettlebell competition',
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
          <p>Material: Cast iron</p>`
        },
        6: {
          title: 'Belt for powerlifting',
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
          <p>Country of origin: Pakistan</p>`
        },
        7: {
          title: 'Cleats for athletics',
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
          <p>Species: For medium and long distances</p>`
        },
        8: {
          title: 'Handball ball',
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
          <p>Country of origin: Pakistan</p>`
        },
        9: {
          title: 'Goalkeeper gloves',
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
          <p>Country of origin: Pakistan</p>`
        },
        10: {
          title: 'Roller sneakers',
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
          <p>Country of origin: China</p>`
        },
        11: {
          title: 'Soft kettlebell',
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
          <p>Country of origin: China</p>`
        },
        12: {
          title: 'Sport towel',
          desc: 'The fabric absorbs moisture well and it is very soft.',
          full_desc: `
          <h3>Features</h3>
          <p>Type: Towels sports</p>
          <p>Includes: Towel: 1pc, Cover: 1pc</p>
          <p>Dimensions: 80x40cm</p>
          <p>Material: Microfiber</p>
          <p>Fabric composition: Polyester 85%, Nylon 15%</p>
          <p>Country of origin: China</p>`
        },
        13: {
          title: 'Belt for weight loss',
          desc: 'This slimming belt is made of high quality neoprene.',
          full_desc: `
          <h3>Features</h3>
          <p>Type: Slimming belts</p>
          <p>Size: Adjustable</p>
          <p>Dimensions: 95cmx20cmx3mm</p>
          <p>Gender: Female, Male</p>
          <p>Purpose: For slimming, With sauna effect, Tightening and supporting effect</p>
          <p>Material: Neoprene</p>
          <p>Country of origin: China</p>`
        },
        14: {
          title: 'Soccer ball',
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
          <p>Country of origin: China</p>`
        },
        15: {
          title: 'Sneakers high',
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
          <p>Country of origin: China</p>`
        },
        16: {
          title: 'Belt for kimono',
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
          <p>Country of origin: Pakistan</p>`
        }
      }
    }
  },
  ua: {
    translation: {
      home: 'Головна',
      about: 'Про нас',
      contacts: 'Контакти',
      location: 'Наша локація',
      cart_empty: 'Кошик порожній',
      total: 'Разом',
      buy: 'Купити',
      prev: '← Назад',
      next: 'Вперед →',
      page: 'Сторінка',
      of: 'з',
      all: 'Все',
      balls: "М'ячі",
      gloves: 'Рукавиці',
      towels: 'Рушники',
      kettlebells: 'Гирі',
      belts: 'Пояси',
      sneakers: 'Кросівки',
      presentation_title: 'Найкращі спортивні товари',
      presentation_desc: 'За справедливими цінами',
      footer: 'Всі права захищені',
      aboutUsTitle: 'Про нас',
      aboutUsDesc: 'Ми не тільки продаємо спортивні товари, але й ремонтуємо бензопили та ланцюги, наручні годинники, точимо ножі та ланцюги, а також виготовляємо дублікати ключів.',
      viber: 'Наш Viber',
      firstName: 'Імʼя',
      lastName: 'Прізвище',
      contactsTitle: 'Контактна інформація',
      contactsDesc: 'Напишіть нам, щоб дізнатися більше',
      email: 'Електронна пошта',
      phoneNumber: 'Номер телефону',
      message: 'Повідомлення',
      sendMessage: 'Надіслати повідомлення',
      writeMessage: 'Напишіть ваше повідомлення..',
      ourLocationTitle: 'Наша локація',
      ourLocationDesc: 'Наш магазин знаходиться в місті Жашків навпроти Жашківського ліцею №1. Великий золотий ключ слугує орієнтиром.',
      ourLocationButton: 'Переглянути на карті',
      products: {
        1: {
          title: "Волейбольний пляжний м'яч",
          desc: "Пляжний волейбол. М'яч призначений для пляжного волейболу.",
          full_desc: `
          <h3>Особливості</h3>
          <p>Тип: Волейбольні м'ячі</p>
          <p>Сертифікат: Затверджено FIVB</p>
          <p>Технології: Зносостійкість, Довговічність, Водонепроникність</p>
          <p>Розмір: №5</p>
          <p>Кількість панелей: 10 панелей</p>
          <p>Тиск: 0,29-0,32 BAR</p>
          <p>Тип з'єднання панелей: Машинна зшивання</p>
          <p>Призначення: Для пляжу / пляжного волейболу</p>
          <p>Матеріал: М'яка штучна шкіра</p>
          <p>Країна походження: Таїланд</p>`
        },
        2: {
          title: 'Воротарські рукавиці',
          desc: 'Високоякісні воротарські рукавиці з оптимальними характеристиками',
          full_desc: `
          <h3>Характеристика</h3>
          <p>Тип: Воротарські рукавиці</p>
          <p>Вставки: Дихаюча тканина між пальцями</p>
          <p>Технології: Поглинання ударів, Зносостійкість, Максимальне зчеплення з м'ячем</p>
          <p>Фіксація на зап'ясті: Манжета на липучці на 360°</p>
          <p>Вікова група: Дорослий</p>
          <p>Призначення: Екіпірування футбольного воротаря</p>
          <p>Матеріал: Латекс / Поліестер</p>
          <p>Країна-виробник: Пакистан</p>`
        },
        3: {
          title: 'Боксерські рукавички',
          desc: 'Це якісна модель для спортсменів будь-якого рівня, хлопців та дівчат, і навіть дітей. Рукавички з українським прапором',
          full_desc: `
          <h3>Особливості</h3>
          <p>Тип: Боксерські рукавички</p>
          <p>Терморегуляція: Вентиляція за рахунок сітчастої тканини на долоні</p>
          <p>Фіксація зап'ястя: Широка манжета стабілізує зап'ястя і знижує ризик травмування</p>
          <p>Стан: Жіночі, Чоловічі</p>
          <p>Вікова група: Для дітей</p>
          <p>Спосіб кріплення: Липучка</p>
          <p>Матеріал наповнювача: Поліуретан (PU)</p>
          <p>Матеріал: Формований пінопластовий наповнювач гасить удари</p>
          <p>Країна-виробник: Пакистан</p>`
        },
        4: {
          title: 'Рушник для пляжу',
          desc: 'Швидко сохне, не накопичує вологу і не утримує неприємні запахи.',
          full_desc: `
          <h3>Особливості</h3>
          <p>Тип: Рушники спортивні</p>
          <p>Комплектація: Рушник: 1шт, Чохол: 1шт</p>
          <p>Розміри: 140х70см</p>
          <p>Розміри в зібраному вигляді: 28х21см</p>
          <p>Матеріал: Поліестер / Нейлон</p>
          <p>Склад тканини: Поліестер 89%, Нейлон 11%</p>
          <p>Країна-виробник: Китай</p>`
        },
        5: {
          title: 'Змагання з гирьового спорту',
          desc: 'Професійна гиря від бренду LiveUp виготовлена зі сталі',
          full_desc: `
          <h3>Характеристика</h3>
          <p>Тип: Гирі</p>
          <p>Діаметр ручки: 33 мм</p>
          <p>Діаметр корпусу гирі: 212 мм</p>
          <p>Похибка ваги: 2%</p>
          <p>Висота: 283 см</p>
          <p>Вага: 8 кг</p>
          <p>Покриття: Електростатичне порошкове покриття</p>
          <p>Призначення: Для тренувань з кросфіту та фітнесу</p>
          <p>Матеріал: Чавун</p>`
          },
          6: {
          title: 'Пояс для силових видів спорту',
          desc: 'Пояс виготовлений з високоякісної шкіри, що робить його еластичним',
          full_desc: `
          <h3>Характеристика</h3>
          <p>Тип: Атлетичні пояси</p>
          <p>Спорт: Пауерліфтинг</p>
          <p>Шви: Посилені шви</p>
          <p>Застібка: Пряжка-карабін</p>
          <p>Ширина: 10 см</p>
          <p>Стать: Жіноча, Чоловіча</p>
          <p>Призначення: Зниження навантаження на хребет</p>
          <p>Матеріал: Шкіряний</p>
          <p>Матеріал:</p>
          <p>Країна походження: Пакистан</p>`
        },
        7: {
          title: 'Шиповки для легкої атлетики',
          desc: "М'який матеріал верху робить ці шиповки максимально комфортними для тривалих забігів.",
          full_desc: `
           <h3>Особливості</h3>
          <p>Тип: Легкоатлетичні шиповки</p>
          <p>Вставки: Вставки з сітчастої тканини</p>
          <p>Технології: Адаптивність, Довговічність, Свобода рухів</p>
          <p>Стать: Жіноча, Чоловіча</p>
          <p>Вікова група: Для дорослих, Для дітей</p>
          <p>Призначення: Для тренувань і змагань</p>
          <p>Кількість шипів: 7 шипів</p>
          <p>Матеріал: Термополіуретан (TPU) / Дихаюча сітка</p>
          <p>Вид: Для середніх та довгих дистанцій</p>`
        },
        8: {
          title: "М'яч гандбольний",
          desc: "М'яч складається з 32 панелей. Шина виготовлена з поліуретану.",
          full_desc: `
          <h3>Особливості</h3>
          <p>Тип: М'ячі гандбольні</p>
          <p>Технології: Зносостійкість, Довговічність, Міцність</p>
          <p>Розмір: №3</p>
          <p>Кількість панелей: 32 панелі</p>
          <p>Гума: камерна</p>
          <p>Окружність: 50-52 см</p>
          <p>Тип з'єднання панелей: Ручний шов</p>
          <p>Призначення: Для матчів і тренувань</p>
          <p>Матеріал: Поліуретан (PU)</p>
          <p>Країна походження: Пакистан</p>`
        },
        9: {
          title: 'Воротарські рукавиці',
          desc: 'Рукавиці виготовлені з високоміцних і зносостійких матеріалів',
          full_desc: `
          <h3>Характеристики</h3>
          <p>Тип: Воротарські рукавиці</p>
          <p>Вставки: Дихаюча тканина між пальцями</p>
          <p>Технології: Поглинання ударів, Зносостійкість, Максимальне зчеплення з м'ячем</p>
          <p>Фіксація на зап'ясті: Манжета на липучці на 360°</p>
          <p>Вікова група: Для дорослих, Для дітей</p>
          <p>Призначення: Екіпірування футбольного воротаря</p>
          <p>Матеріал: Полівінілхлорид (ПВХ) / Латекс</p>
          <p>Країна походження: Пакистан</p>`
        },
        10: {
          title: 'Роликові кросівки',
           desc: 'Переднє колесо можна зняти за допомогою ключа з комплекту',
           full_desc: `
          <h3>Характеристика</h3>
          <p>Тип: Роликові кросівки</p>
          <p>Матеріал коліс: Поліуретан (PU), Підшипник: ABEC 7</p>
          <p>Вага користувача: 80 кг</p>
          <p>Стать:  Жіноча, Чоловіча</p>
          <p>Вікова група: Для дітей</p>
          <p>Сезон: Весна, осінь, літо</p>
          <p>Кількість коліс: 2 шт</p>
          <p>Матеріали Верх кросівка: Поліестер (PL)</p>
          <p>Кріплення для коліс: Пластикові</p>
          <p>Країна походження: Китай</p>`
        },
        11: {
          title: "Гиря м'яка",
          desc: 'Гиря наповнена піском, що сприяє рівномірному розподілу ваги',
          full_desc: `
          <h3>Характеристики</h3>
          <p>Тип: Гирі</p>
          <p>Колекція: Fitness Spring</p>
          <p>Вага: 2 кг</p>
          <p>Призначення: Для фітнесу та силових тренувань</p>
          <p>Матеріал: Полівінілхлорид (ПВХ)</p>
          <p>Матеріали Основа гирі: М'який полівінілхлорид (ПВХ)</p>
          <p>Ручка гирі: Твердий полівінілхлорид (ПВХ)</p>
          <p>Наповнювач: Пісок</p>
          <p>Країна походження: Китай</p>`
        },
        12: {
          title: 'Рушник спортивний',
          desc: "Тканина добре вбирає вологу і дуже м'яка.",
          full_desc: `
          <h3>Характеристика</h3>
          <p>Тип: Рушники спортивні</p>
          <p>Комплектація: Рушник: 1шт, Чохол: 1шт</p>
          <p>Розміри: 80х40см</p>
          <p>Матеріал: Мікрофібра</p>
          <p>Склад тканини: Поліестер 85%, Нейлон 15%</p>
          <p>Країна походження: Китай</p>`
        },
        13: {
          title: 'Пояс для схуднення',
          desc: 'Цей пояс для схуднення виготовлений з високоякісного неопрену.',
          full_desc: `
          <h3>Характеристики</h3>
          <p>Тип: Пояси для схуднення</p>
          <p>Розмір: Регульований</p>
          <p>Розміри: 95смх20смх3мм</p>
          <p>Стать: Жіночий, Чоловічий</p>
          <p>Призначення: Для схуднення, З ефектом сауни, Підтягуючий та підтримуючий ефект</p>
          <p>Матеріал: Неопрен</p>
          <p>Країна походження: Китай</p>`
        },
        14: {
          title: "Футбольний м'яч",
           desc: "М'яч має ідеальну сферичну форму та відмінні ігрові характеристики.",
           full_desc: `
          <h3>Характеристика</h3>
          <p>Тип: М'ячі футбольні</p>
          <p>Розмір: №5</p>
          <p>Кількість панелей: 32 панелі</p>
          <p>Тиск: 0,7-0,9 BAR</p>
          <p>Окружність: 68,5-69,5 см</p>
          <p>Вага: 410-450 г</p>
          <p>Тип з'єднання панелей: Машинна зшивання / Термосклейка</p>
          <p>Матеріал: Поліуретан (PU)</p>
          <p>Країна походження: Китай</p>`
        },
        15: {
          title: 'Кросівки високі',
          desc: 'Високоякісні матеріали верху забезпечують кросівкам міцність і зносостійкість.',
          full_desc: `
          <h3>Характеристика</h3>
          <p>Тип: Кросівки</p>
          <p>Інтенсивність використання: Щоденне використання</p>
          <p>Технології: Міцність, Зносостійкість, Довговічність</p>
          <p>Стать: Жіноча, Чоловіча</p>
          <p>Вікова група: Для дорослих, Для дітей</p>
          <p>Тип кросівок: Високі кросівки</p>
          <p>Призначення: Для повсякденного носіння, прогулянок та активного відпочинку</p>
          <p>Матеріал: Поліуретан / Поліестер</p>
          <p>Країна походження: Китай</p>`
        },
        16: {
          title: 'Пояс для кімоно',
          desc: 'Пояс для кімоно виготовлений з бавовни і має кілька рядів поздовжніх швів.',
          full_desc: `
          <h3>Особливості</h3>
          <p>Тип: Пояси для кімоно</p>
          <p>Спорт: Джиу-джитсу, дзюдо, карате, самбо, тхеквондо</p>
          <p>Довжина: 260 см, 280 см, 300 см, 240 см, 230 см, 250 см, 270 см, 290 см</p>
          <p>Стать: Жіноча, Чоловіча</p>
          <p>Вікова група: Для дорослих, Для дітей</p>
          <p>Призначення: Для тренувань і змагань</p>
          <p>Матеріал: Бавовна / Поліестер</p>
          <p>Країна походження: Пакистан</p>`
        }
      }
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'ua',
  fallbackLng: 'ua',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
