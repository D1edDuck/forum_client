export interface Info {
  title: string;
  img: string;
  description: string[];
}

export interface ServiceI {
  name: string;
  info: Info[];
}

export const services: ServiceI[] = [
  {
    name: "repair",
    info: [
      {
        title: "Ремонт ПК",
        description: [
          "Полная диагностика и аварийное восстановление.",
          "Замена и проверка блока питания, материнской платы, процессора, видеокарты, ОЗУ.",
          "Восстановление и клонирование HDD/SSD, установка и настройка ОС.",
          "Апгрейд под игры и работу (сборка/оптимизация).",
          "Профилактическая чистка от пыли и замена термопасты.",
          "Сетевая настройка и защита данных.",
        ],
        img: "../src/assets/img/repair-1.png",
      },
      {
        title: "Ремонт Ноутбуков",
        description: [
          "Диагностика матплаты, пайка микросхем, ремонт цепей питания.",
          "Замена экранов, шлейфов, клавиатур, аккумуляторов и шарниров.",
          "Замена экранов, шлейфов, клавиатур, аккумуляторов и шарниров.",
          "Чистка системы охлаждения, замена термопасты, борьба с перегревом",
          "Восстановление данных и установка программного обеспечения.",
        ],
        img: "../src/assets/img/repair-2.png",
      },
      {
        title: "Ремонт принтеров",
        description: [
          "Диагностика механики, роликов, приводов и датчиков",
          "Заправка и восстановление картриджей, замена фотобарабанов и роликов.",
          "Ремонт фьюзера, термоблока, узлов подачи бумаги",
          "Настройка сетевой печати, прошивка, устранение ошибок и полос.",
          "Калибровка цвета и тестовая печать.",
        ],
        img: "../src/assets/img/repair-3.png",
      },
    ],
  },
  {
    name: "cleaning",
    info: [
      {
        title: "Чистка техники",
        description: [
          "Полная диагностика и аварийное восстановление.",
          "Замена и проверка блока питания, материнской платы, процессора, видеокарты, ОЗУ.",
          "Восстановление и клонирование HDD/SSD, установка и настройка ОС.",
          "Апгрейд под игры и работу (сборка/оптимизация).",
          "Профилактическая чистка от пыли и замена термопасты.",
          "Сетевая настройка и защита данных.",
        ],
        img: "../src/assets/img/repair-1.png",
      },
    ],
  },
  {
    name: "refilling",
    info: [
      {
        title: "Заправка картриджей",
        description: [
          "Полная диагностика и аварийное восстановление.",
          "Замена и проверка блока питания, материнской платы, процессора, видеокарты, ОЗУ.",
          "Восстановление и клонирование HDD/SSD, установка и настройка ОС.",
          "Апгрейд под игры и работу (сборка/оптимизация).",
          "Профилактическая чистка от пыли и замена термопасты.",
          "Сетевая настройка и защита данных.",
        ],
        img: "../src/assets/img/repair-1.png",
      },
    ],
  },
  {
    name: "consultation",
    info: [
      {
        title: "Консультация",
        description: [
          "Полная диагностика и аварийное восстановление.",
          "Замена и проверка блока питания, материнской платы, процессора, видеокарты, ОЗУ.",
          "Восстановление и клонирование HDD/SSD, установка и настройка ОС.",
          "Апгрейд под игры и работу (сборка/оптимизация).",
          "Профилактическая чистка от пыли и замена термопасты.",
          "Сетевая настройка и защита данных.",
        ],
        img: "../src/assets/img/repair-1.png",
      },
    ],
  },
  {
    name: "modernization",
    info: [
      {
        title: "Модернизация",
        description: [
          "Полная диагностика и аварийное восстановление.",
          "Замена и проверка блока питания, материнской платы, процессора, видеокарты, ОЗУ.",
          "Восстановление и клонирование HDD/SSD, установка и настройка ОС.",
          "Апгрейд под игры и работу (сборка/оптимизация).",
          "Профилактическая чистка от пыли и замена термопасты.",
          "Сетевая настройка и защита данных.",
        ],
        img: "../src/assets/img/repair-1.png",
      },
    ],
  },
];

export const catalog = [
  {
    id: 1,
    name: "Компьютеры",
    slug: "computers",
    products: [
      {
        id: 1001,
        sku: "COMP-001",
        name: "Настольный ПК Orion X5",
        description:
          "Мощный офисный компьютер для работы с графикой и многозадачности.",
        price: 89999,
        currency: "RUB",
        stock: 12,
        brand: "Orion",
        specs: {
          cpu: "Intel Core i7-13700",
          ram: "32GB DDR4",
          storage: "1TB NVMe SSD",
          gpu: "NVIDIA GeForce RTX 4060",
          os: "Windows 11 Pro",
        },
        images: [
          "/images/products/comp_orion_x5_1.jpg",
          "/images/products/comp_orion_x5_2.jpg",
        ],
        tags: ["desktop", "gaming-ready", "office"],
      },
      {
        id: 1002,
        sku: "COMP-002",
        name: "Ноутбук Vega Slim 14",
        description:
          'Ультрабук 14" — лёгкий и автономный, для командировок и учёбы.',
        price: 59990,
        currency: "RUB",
        stock: 25,
        brand: "Vega",
        specs: {
          cpu: "AMD Ryzen 5 7530U",
          ram: "16GB LPDDR5",
          storage: "512GB SSD",
          screen: '14" FHD',
          battery: "до 12 часов",
        },
        images: ["/images/products/vega_slim14.jpg"],
        tags: ["laptop", "ultrabook", "portable"],
      },
      {
        id: 1003,
        sku: "COMP-003",
        name: "Сборка Workstation Pro",
        description: "Рабочая станция для CAD/CAM и тяжёлых вычислений.",
        price: 199900,
        currency: "RUB",
        stock: 4,
        brand: "Custom",
        specs: {
          cpu: "Intel Xeon W-2295",
          ram: "64GB ECC",
          storage: "2TB NVMe + 4TB HDD",
          gpu: "NVIDIA RTX A4000",
        },
        images: ["/images/products/ws_pro.jpg"],
        tags: ["workstation", "enterprise"],
      },
    ],
  },
  {
    id: 2,
    name: "Принтеры",
    slug: "printers",
    products: [
      {
        id: 2001,
        sku: "PRN-INK-01",
        name: "Струйный принтер ColorPrint 360",
        description: "Цветной струйный принтер для дома и малого офиса.",
        price: 7990,
        currency: "RUB",
        stock: 30,
        brand: "ColorPrint",
        specs: {
          type: "Струйный",
          print_speed: "15 стр/мин (ч/б), 10 стр/мин (цвет)",
          max_resolution: "4800x1200 dpi",
          connectivity: ["USB", "Wi-Fi", "AirPrint"],
        },
        images: ["/images/products/colorprint360.jpg"],
        tags: ["inkjet", "home", "wifi"],
      },
      {
        id: 2002,
        sku: "PRN-LAS-01",
        name: "Лазерный принтер OfficeLaser M402",
        description:
          "Монохромный лазерный принтер для быстрого печатания документов.",
        price: 12990,
        currency: "RUB",
        stock: 18,
        brand: "OfficeLine",
        specs: {
          type: "Лазерный",
          print_speed: "40 стр/мин",
          duplex: true,
          connectivity: ["USB", "Ethernet"],
        },
        images: ["/images/products/officelaser_m402.jpg"],
        tags: ["laser", "office", "monochrome"],
      },
      {
        id: 2003,
        sku: "PRN-MFP-01",
        name: "МФУ Scan&Print S60",
        description:
          "Многофункциональное устройство: печать, сканирование, копирование.",
        price: 18990,
        currency: "RUB",
        stock: 9,
        brand: "Scan&Print",
        specs: {
          type: "Лазерное МФУ",
          print_speed: "30 стр/мин",
          scan_resolution: "1200x1200 dpi",
          duplex: true,
          connectivity: ["USB", "Wi-Fi", "Ethernet"],
        },
        images: ["/images/products/mfp_s60.jpg"],
        tags: ["mfp", "scan", "copy"],
      },
    ],
  },
  {
    id: 3,
    name: "Мониторы",
    slug: "monitors",
    products: [
      {
        id: 3001,
        sku: "MON-27Q-01",
        name: 'Монитор 27" QHD UltraView',
        description:
          '27" QHD, IPS-панель, идеален для дизайна и медиаконтента.',
        price: 24990,
        currency: "RUB",
        stock: 15,
        brand: "UltraView",
        specs: {
          size: '27"',
          resolution: "2560x1440",
          panel: "IPS",
          refresh_rate: "75Hz",
          ports: ["HDMI", "DisplayPort", "USB-C"],
        },
        images: ["/images/products/uv_27q.jpg"],
        tags: ["qhd", "ips", "designer"],
      },
      {
        id: 3002,
        sku: "MON-24F-01",
        name: "Игровой монитор RapidG 24F",
        description:
          '24" FHD, 165Hz, 1ms — для геймеров и киберспортивных задач.',
        price: 19990,
        currency: "RUB",
        stock: 22,
        brand: "RapidG",
        specs: {
          size: '24"',
          resolution: "1920x1080",
          panel: "TN",
          refresh_rate: "165Hz",
          adaptive_sync: "G-Sync Compatible",
        },
        images: ["/images/products/rapidg_24f.jpg"],
        tags: ["gaming", "high-refresh"],
      },
      {
        id: 3003,
        sku: "MON-32UHD-01",
        name: 'Профессиональный 32" 4K ProStudio',
        description: '32" 4K с расширенной цветовой гаммой для фото/видео.',
        price: 49990,
        currency: "RUB",
        stock: 6,
        brand: "ProStudio",
        specs: {
          size: '32"',
          resolution: "3840x2160",
          panel: "IPS",
          color_coverage: "99% sRGB, 95% DCI-P3",
          ports: ["DisplayPort", "HDMI", "USB-C"],
        },
        images: ["/images/products/prostudio_32_4k.jpg"],
        tags: ["4k", "professional", "color-accurate"],
      },
    ],
  },
  {
    id: 4,
    name: "Картриджи",
    slug: "cartridges",
    products: [
      {
        id: 4001,
        sku: "CRT-HP-305A",
        name: "Картридж HP 305A (черный)",
        description: "Оригинальный тонер-картридж для лазерных принтеров HP.",
        price: 3490,
        currency: "RUB",
        stock: 40,
        brand: "HP",
        specs: {
          type: "Тонер",
          color: "Черный",
          page_yield: 2500,
          compatible_models: ["HP LaserJet Pro M402", "HP M404"],
        },
        images: ["/images/products/toner_hp_305a.jpg"],
        tags: ["toner", "original"],
      },
      {
        id: 4002,
        sku: "CRT-CLI-526C",
        name: "Картридж Canon CLI-526 C (голубой)",
        description: "Струйный картридж для цветной печати высокого качества.",
        price: 1290,
        currency: "RUB",
        stock: 60,
        brand: "Canon",
        specs: {
          type: "Струйный картридж",
          color: "Cyan",
          page_yield: 400,
          compatible_models: ["Canon PIXMA MG6340", "Canon PIXMA MG7140"],
        },
        images: ["/images/products/cli_526c.jpg"],
        tags: ["ink", "canon"],
      },
      {
        id: 4003,
        sku: "CRT-REM-KIT1",
        name: "Совместимый комплект картриджей (4 цвета)",
        description:
          "Экономичный комплект совместимых картриджей CMYK для популярных моделей.",
        price: 2590,
        currency: "RUB",
        stock: 120,
        brand: "Generic",
        specs: {
          type: "Совместимые",
          colors: ["C", "M", "Y", "K"],
          approx_page_yield: 350,
        },
        images: ["/images/products/rem_kit4.jpg"],
        tags: ["refill", "economy"],
      },
    ],
  },
  {
    id: 5,
    name: "Кабели",
    slug: "cables",
    products: [
      {
        id: 5001,
        sku: "CBL-HDMI-2M",
        name: "HDMI кабель 2m v2.1",
        description:
          "Высокоскоростной HDMI 2.1 для 4K/120Hz и передачи аудио высокого качества.",
        price: 890,
        currency: "RUB",
        stock: 150,
        brand: "LinkMax",
        specs: {
          type: "HDMI",
          length_m: 2,
          version: "2.1",
          connectors: ["HDMI", "HDMI"],
        },
        images: ["/images/products/hdmi_2m.jpg"],
        tags: ["hdmi", "4k", "video"],
      },
      {
        id: 5002,
        sku: "CBL-USB-C-1M",
        name: "USB-C to USB-C 1m (PD 100W)",
        description:
          "Кабель для зарядки и передачи данных с поддержкой Power Delivery до 100W.",
        price: 690,
        currency: "RUB",
        stock: 200,
        brand: "ChargePro",
        specs: {
          type: "USB-C",
          length_m: 1,
          power_delivery_w: 100,
          data_rate: "10 Gbps",
        },
        images: ["/images/products/usb_c_1m.jpg"],
        tags: ["usb-c", "pd", "charging"],
      },
      {
        id: 5003,
        sku: "CBL-LAN-5M",
        name: "Ethernet кабель RJ45 Cat6 5m",
        description:
          "Качественный сетевой кабель для стабильной передачи данных до 1Gbps.",
        price: 250,
        currency: "RUB",
        stock: 300,
        brand: "NetSafe",
        specs: {
          type: "Ethernet",
          category: "Cat6",
          length_m: 5,
          connectors: ["RJ45", "RJ45"],
        },
        images: ["/images/products/lan_cat6_5m.jpg"],
        tags: ["lan", "cat6", "network"],
      },
    ],
  },
  {
    id: 6,
    name: "Клавиатуры",
    slug: "keyboards",
    products: [
      {
        id: 6001,
        sku: "KBD-MECH-01",
        name: "Механическая клавиатура Titan TKL (Brown)",
        description:
          "Tenkeyless механика с тактильными переключателями, RGB-подсветка.",
        price: 6990,
        currency: "RUB",
        stock: 40,
        brand: "Titan",
        specs: {
          layout: "TKL",
          switches: "Brown (tactile)",
          connection: "Wired USB-C",
          backlight: "RGB",
        },
        images: ["/images/products/titan_tkl.jpg"],
        tags: ["mechanical", "gaming", "tkl"],
      },
      {
        id: 6002,
        sku: "KBD-MEM-01",
        name: "Беспроводная мембранная клавиатура SoftType",
        description:
          "Удобная беспроводная клавиатура для офиса, тихие клавиши.",
        price: 1990,
        currency: "RUB",
        stock: 85,
        brand: "SoftType",
        specs: {
          layout: "Full",
          switches: "Membrane",
          connection: "2.4 GHz wireless + Bluetooth",
          battery_life: "до 6 месяцев",
        },
        images: ["/images/products/softtype_wireless.jpg"],
        tags: ["wireless", "office", "quiet"],
      },
      {
        id: 6003,
        sku: "KBD-ERGO-01",
        name: "Эргономичная клавиатура ErgoWave",
        description:
          "Эргономичный изгиб и разделённая раскладка для снижения нагрузки на запястья.",
        price: 11990,
        currency: "RUB",
        stock: 10,
        brand: "ErgoWave",
        specs: {
          layout: "Ergonomic Split",
          connection: "Wired USB",
          adjustable_tilt: true,
        },
        images: ["/images/products/ergowave.jpg"],
        tags: ["ergonomic", "health"],
      },
    ],
  },
];
