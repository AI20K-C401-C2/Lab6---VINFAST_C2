export interface Car {
  id: string;
  name: string;
  version: string;
  price: string;
  image: string;
  colors: CarColor[];
  specs: CarSpecs;
  category: "city" | "suv" | "premium" | "offroad";
}

export interface CarColor {
  name: string;
  hex: string;
  image: string;
}

export interface CarSpecs {
  range: string;
  acceleration: string;
  power: string;
  seats: number;
  features: string[];
}

export const CAR_DATA: Car[] = [
  {
    id: "vf9",
    name: "VF 9",
    version: "Plus",
    price: "1.491 tỷ VNĐ",
    image:
      "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-9-Plus_US-CA_21-inch_Brahminy-White_Mid.png",
    colors: [
      {
        name: "Trắng",
        hex: "#F4F4F4",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-9-Plus_US-CA_21-inch_Brahminy-White_Mid.png",
      },
      {
        name: "Đỏ",
        hex: "#990000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-9-Plus_US-CA_21inch_Crimson-Red_Mid-4.png",
      },
      {
        name: "Bạc",
        hex: "#C0C0C0",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-9-Plus_US-CA_21inch_Desat-Silver_Mid-3.png",
      },
      {
        name: "Đen",
        hex: "#000000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-9-Plus_US-CA_21inch_Jet-Black_Mid-2.png",
      },
      {
        name: "Xám",
        hex: "#808080",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-9-Plus_US-CA_21inch_Neptune-Grey_Mid-Light-on-3.png",
      },
      {
        name: "Cam",
        hex: "#FF8800",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-9-Plus_US-CA_21inch_Sunset-Orange_Mid-4.png",
      },
      {
        name: "Xanh dương",
        hex: "#0044CC",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-9-Plus_US-CA_21inch_VinFast-Blue_Mid-2-1.png",
      },
      {
        name: "Xanh lá đậm",
        hex: "#006400",
        image:
          "https://tse3.mm.bing.net/th/id/OIP.LlL95ZwlLjPcSLrFnnWAwgHaEK?pid=Api&P=0&h=220",
      },
    ],
    specs: {
      range: "626 km",
      acceleration: "6.5s (0-100km/h)",
      power: "402 mã lực",
      seats: 7,
      features: [
        "Hệ thống siêu lái tự động",
        "Ghế massage 3 chế độ",
        "Hệ thống âm thanh 14 loa",
        "Màn hình giải trí sau 11.6 inch",
      ],
    },
    category: "premium",
  },
  {
    id: "vf8",
    name: "VF 8",
    version: "Plus",
    price: "999 triệu VNĐ",
    image:
      "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-8-Plus_EU-VN_20inch_Deep-Ocean-4-scaled.png",
    colors: [
      {
        name: "Đỏ",
        hex: "#990000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-8-Plus_EU-VN_20inch_Crimson-Red-4-scaled.png",
      },
      {
        name: "Xám",
        hex: "#808080",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-8-Plus_EU-VN_20inch_Neptune-Grey-4-scaled.png",
      },
      {
        name: "Đen",
        hex: "#000000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-8-Plus_EU-VN_20inch_Jet-Black-4-scaled.png",
      },
      {
        name: "Bạc",
        hex: "#C0C0C0",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-8-Plus_EU-VN_20inch_Desat-Silver-16-scaled.png",
      },
      {
        name: "Xanh dương",
        hex: "#0044CC",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2013/08/VF-8-Plus_EU-VN_20inch_Deep-Ocean-4-scaled.png",
      },
    ],
    specs: {
      range: "471 km",
      acceleration: "5.9s (0-100km/h)",
      power: "402 mã lực",
      seats: 5,
      features: [
        "Hệ thống lái tự động cấp 2",
        "Sạc nhanh 70% trong 31 phút",
        "Hệ thống âm thanh 11 loa",
        "Cửa sổ trời toàn cảnh",
      ],
    },
    category: "suv",
  },
  {
    id: "vf7",
    name: "VF 7",
    version: "Plus",
    price: "850 triệu VNĐ",
    image:
      "https://vinfastdienchau.com/wp-content/uploads/2014/06/VF7_Neptune-Grey.png",
    colors: [
      {
        name: "Xám",
        hex: "#808080",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/06/VF7_Neptune-Grey.png",
      },
      {
        name: "Đen",
        hex: "#000000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/06/VF7_JetBlack.png",
      },
      {
        name: "Đỏ",
        hex: "#990000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/06/VF7_Crimson-Red.png",
      },
      {
        name: "Trắng",
        hex: "#F4F4F4",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/06/VF7_Brahminy-White.png",
      },
      {
        name: "Xanh lá nhạt",
        hex: "#98FF98",
        image:
          "https://up.yimg.com/ib/th/id/OIP.Sgf6_pJXJXLi6DOCVtqr6QHaEo?pid=Api&rs=1&c=1&qlt=95&w=177&h=111",
      },
    ],
    specs: {
      range: "431 km",
      acceleration: "5.8s (0-100km/h)",
      power: "349 mã lực",
      seats: 5,
      features: [
        "Thiết kế phi thuyền",
        "Màn hình 15.6 inch",
        "Trợ lý ảo thông minh",
      ],
    },
    category: "suv",
  },
  {
    id: "vf6",
    name: "VF 6",
    version: "Plus",
    price: "675 triệu VNĐ",
    image:
      "https://vinfastdienchau.com/wp-content/uploads/2014/07/VF-6-Plus_EU-VN_19inch_Deep-Ocean.png",
    colors: [
      {
        name: "Đỏ",
        hex: "#990000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/07/VF-6-Plus_EU-VN_19inch_Crimson-Red.png",
      },
      {
        name: "Xanh dương",
        hex: "#98FF98",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/07/VF-6-Plus_EU-VN_19inch_Deep-Ocean.png",
      },
      {
        name: "Bạc",
        hex: "#C0C0C0",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/07/VF-6-Plus_EU-VN_19inch_Desat-Silver.png",
      },
      {
        name: "Xám",
        hex: "#808080",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/07/VF-6-Plus_EU-VN_19inch_Neptune-Grey.png",
      },
    ],
    specs: {
      range: "399 km",
      acceleration: "8.5s (0-100km/h)",
      power: "201 mã lực",
      seats: 5,
      features: [
        "Thiết kế Pininfarina",
        "Màn hình 12.9 inch",
        "Cập nhật phần mềm từ xa",
      ],
    },
    category: "suv",
  },
  {
    id: "vf5",
    name: "VF 5",
    version: "Plus",
    price: "468 triệu VNĐ",
    image:
      "https://vinfastdienchau.com/wp-content/uploads/2014/08/vinfast-vf5-white.png",
    colors: [
      {
        name: "Đỏ",
        hex: "#990000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/vinfast-vf5-red.png",
      },
      {
        name: "Xám",
        hex: "#808080",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/vinfast-vf5-grey.png",
      },
      {
        name: "Đỏ bản phối nóc",
        hex: "#C0392B",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/vinfast-vf5-red-d.png",
      },
      {
        name: "Đỏ phối nóc khác",
        hex: "#E74C3C",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/vinfast-vf5-redgrs.png",
      },
      {
        name: "Trắng",
        hex: "#F4F4F4",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/vinfast-vf5-white.png",
      },
    ],
    specs: {
      range: "326 km",
      acceleration: "9.8s (0-100km/h)",
      power: "134 mã lực",
      seats: 5,
      features: ["Nhỏ gọn linh hoạt", "Màn hình 8 inch", "Giám sát hành trình"],
    },
    category: "city",
  },
  {
    id: "vf3",
    name: "VF 3",
    version: "Eco",
    price: "240 triệu VNĐ",
    image:
      "https://vinfastdienchau.com/wp-content/uploads/2014/08/VinFast-VF-3-Summer-Yellow.png",
    colors: [
      {
        name: "Vàng",
        hex: "#FFDD00",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/VinFast-VF-3-Summer-Yellow.png",
      },
      {
        name: "Xanh dương nhạt",
        hex: "#00BFFF",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/VinFast-VF-3-Aquatic-Azure.png",
      },
      {
        name: "Đỏ",
        hex: "#990000",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/VinFast-VF-3-Crimson-Red.png",
      },
      {
        name: "Xanh dương đậm",
        hex: "#00008B",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/VinFast-VF-3-Electric-Blue.png",
      },
      {
        name: "Trắng",
        hex: "#F4F4F4",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/VinFast-VF-3-Infinity-Blanc.png",
      },
      {
        name: "Hồng",
        hex: "#FFC0CB",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/VinFast-VF-3-Rose-Pink.png",
      },
      {
        name: "Xanh lá nhạt",
        hex: "#98FF98",
        image:
          "https://vinfastdienchau.com/wp-content/uploads/2014/08/VinFast-VF-3-Urban-Mint.png",
      },
    ],
    specs: {
      range: "210 km",
      acceleration: "15s (0-100km/h)",
      power: "43 mã lực",
      seats: 4,
      features: ["Thiết kế Mini", "Di chuyển nội đô", "Tiết kiệm chi phí"],
    },
    category: "city",
  },
  {
    id: "vfe34",
    name: "VF e34",
    version: "Tiêu chuẩn",
    price: "710 triệu VNĐ",
    image:
      "https://up.yimg.com/ib/th/id/OIP.WRqO6RCkamSsfgqBSZJFqwHaEK?pid=Api&rs=1&c=1&qlt=95&w=222&h=124",
    colors: [
      {
        name: "Mặc định",
        hex: "#C0C0C0",
        image:
          "https://up.yimg.com/ib/th/id/OIP.WRqO6RCkamSsfgqBSZJFqwHaEK?pid=Api&rs=1&c=1&qlt=95&w=222&h=124",
      },
    ],
    specs: {
      range: "318 km",
      acceleration: "N/A",
      power: "147 mã lực",
      seats: 5,
      features: ["SUV điện cỡ C", "Trợ lý ảo ViVi"],
    },
    category: "suv",
  },
];
