export const  dateFormat= 'yyyy/MM/dd';
export const  idTaixe = "636cf775974c56587047691e";
export const  idKhachhang = "632ebaf77e9ad9aeef4e3d27";

export const  Hinhthucthanhtoan = [
    {"1": "Thanh toán trực tiếp"},
    {"2": "Ghi nợ"},
    {"3": "Thanh toán khi nhận hàng"},
];

export const Lotrinh = [
    {"0": "Hàng đi"},
    {"1": "Hàng về"},
]

export const listTrangthaichuyen = [
    { "value": 0, "lable": "Lên kế hoạch bóc hàng"},
    { "value": 1, "lable": "Hoàn thành bóc hàng"},
    { "value": 2, "lable":"Hoàn thành trả hàng"},
    { "value": 3, "lable":"Tính chi phí"},
    { "value": 4, "lable":"Kết thúc chuyến hàng"},
    { "value": 5, "lable":"Hoàn thành chuyến hàng"},
]

export const lstchiphi = [
   {"idchuyen": "", "tenchiphi": "Tiền ăn", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Tiền bãi", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Tiền dầu", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Sữa chữa", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Cầu đường", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Công an", "sotien": 0, "ghichu": ""},
   {"idchuyen": "", "tenchiphi": "Chi phí khác", "sotien": 0, "ghichu": ""}
]

export const rootbase = '/default/';

//common
export const CommonAnt100Listtaichinh = "common/commonAnt100Listloinhanthang";

//role
export const Ant100SearchAllRole = "role/ant100SearchAllRole";
export const Ant100GetSearchAllRole = "role/ant100GetSearchAllRole";
export const Ant100GetDetailRole = "role/ant100GetDetailRole";
export const Ant100EditDetailRole = "role/ant100EditDetailRole";
export const Ant100AddDetailRole ="role/ant100AddDetailRole";
export const Ant100DelDetailRole ="role/ant100DelDetailRole";
export const Ant100GetPermissionRole ="role/ant100GetpermissionRole";
export const Ant100PutPermissionRole ="role/ant100PutpermissionRole";

//menu
export const Ant100SearchFatherMenu = "menu/ant100SearchFatherMenu";
export const Ant100AddMenu = "menu/ant100AddMenu";
export const Ant100EditMenu = "menu/ant100EditMenu";
export const Ant100DelMenu = "menu/ant100DelMenu"; 
export const Ant100PostDetailMenu = "menu/ant100PostDetailMenu";
export const Ant100ListMenu = "menu/ant100ListMenu";
export const Ant100ListMenuParams = "menu/ant100ListMenuParams";
export const Ant100PostUrlParams = "menu/ant100PostUrlParams";

//phong ban
export const Ant100addPhongban = "phongban/ant100addPhongban";
export const Ant100editPhongban = "phongban/ant100editPhongban";
export const Ant100delPhongban = "phongban/ant100delPhongban";
export const Ant100getAllPhongban = "phongban/Ant100getAllPhongban";
export const Ant100getIdPhongban = "phongban/ant100getIdPhongban";

//User account
export const Ant100findAllUser = "user/ant100SearchAllUser";
export const Ant100GetDetailUser = "user/ant100GetDetailUser";
export const Ant100EditDetailUser = "user/ant100EditDetailUser";
export const Ant100AddDetailUser ="user/ant100AddDetailUser";
export const Ant100CheckEmailUser = "user/ant100CheckEmailUser";
export const Ant100CheckNameUser = "user/ant100CheckNameUser";

// data SC
export const Ant100findAllDatasc = "screenpc/ant100SearchAllDatasc";
export const Ant100AddListDatasc = "screenpc/ant100AddListDatasc";
export const Ant100DelDatasc = "screenpc/ant100DelDatasc";
export const Ant100EditDatasc = "screenpc/ant100EditDatasc";

// quan ly xe
export const XeAnt100GetAll = 'xe/xeAnt100getAll';
export const XeAnt100Get = 'xe/xeAnt100get';
export const XeAnt100Update = 'xe/xeAnt100update';
export const XeAnt100Create = 'xe/xeAnt100create';
export const XeAnt100Delete = 'xe/xeAnt100delete';
export const XeAnt100DeleteAll = 'xe/xeAnt100deleteAll';
export const XeAnt100UpdateTrangthai = 'xe/xeAnt100updateTrangthai';
export const XeAnt100Getlistfree = 'xe/xeAnt100getlistfree';
export const XeAnt100Getlistrun = 'xe/xeAnt100getlistrun';

// quan ly chuyen
export const ChuyenAnt100GetAll = 'chuyen/chuyenAnt100getAll';
export const ChuyenAnt100Get = 'chuyen/chuyenAnt100get';
export const ChuyenAnt100Update = 'chuyen/chuyenAnt100update';
export const ChuyenAnt100Create = 'chuyen/chuyenAnt100create';
export const ChuyenAnt100Delete = 'chuyen/chuyenAnt100delete';
export const ChuyenAnt100DeleteAll = 'chuyen/chuyenAnt100deleteAll';
export const ChuyenAnt100UpdateTrangthai = 'chuyen/chuyenAnt100updateTrangthai';

// phieu nhap hang 
export const PhieunhaphangAnt100GetAll = 'phieunhaphang/phieunhaphangAnt100getAll';
export const PhieunhaphangAnt100Get = 'phieunhaphang/phieunhaphangAnt100get';
export const PhieunhaphangAnt100Update = 'phieunhaphang/phieunhaphangAnt100update';
export const PhieunhaphangAnt100Create = 'phieunhaphang/phieunhaphangAnt100create';
export const PhieunhaphangAnt100Delete = 'phieunhaphang/phieunhaphangAnt100delete';
export const PhieunhaphangAnt100DeleteAll = 'phieunhaphang/phieunhaphangAnt100deleteAll';

// chi phi chuyen 
export const ChiphichuyenAnt100GetAll = 'chiphichuyen/chiphichuyenAnt100getAll';
export const ChiphichuyenAnt100Get = 'chiphichuyen/chiphichuyenAnt100get';
export const ChiphichuyenAnt100Update = 'chiphichuyen/chiphichuyenAnt100update';
export const ChiphichuyenAnt100UpdateList = 'chiphichuyen/chiphichuyenAnt100updateList';
export const ChiphichuyenAnt100Create = 'chiphichuyen/chiphichuyenAnt100create';
export const ChiphichuyenAnt100Delete = 'chiphichuyen/chiphichuyenAnt100delete';
export const ChiphichuyenAnt100DeleteAll = 'chiphichuyen/chiphichuyenAnt100deleteAll';

// khach hàng
export const KhachhangAnt100GetAll = 'khachhang/khachhangAnt100getAll';
export const KhachhangAnt100SearchParams = 'khachhang/khachhangAnt100searchParams';
export const KhachhangAnt100Update = 'khachhang/khachhangAnt100update';
export const KhachhangAnt100GetDetail = 'khachhang/khachhangAnt100getDetail';

// nhatkykh
export const NhatkykhAnt100GetAll = 'nhatkykh/nhatkykhAnt100getAll';
export const NhatkykhAnt100PostTattoan = 'nhatkykh/nhatkykhAnt100postTattoan';
export const NhatkykhAnt100PostThanhtoanmotphan = 'nhatkykh/nhatkykhAnt100postThanhtoanmotphan';
export const NhatkykhAnt100PostThanhtoan = 'nhatkykh/nhatkykhAnt100postThanhtoan';














